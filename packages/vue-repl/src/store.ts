/* eslint-disable */
import { reactive, version, watchEffect } from 'vue'
import * as defaultCompiler from 'vue/compiler-sfc'
import type {
  SFCAsyncStyleCompileOptions,
  SFCScriptCompileOptions,
  SFCTemplateCompileOptions
} from 'vue/compiler-sfc'
import { compileFile } from './transform'
import { atou, utoa } from './utils'
import type { OutputModes } from './output/types'
export const defaultMainFile = 'App.vue'
export const importMapFile = 'import-map.json'

const welcomeCode = `
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg">
</template>
`.trim()

export class File {
  filename: string
  code: string
  hidden: boolean
  compiled = {
    js: '',
    css: '',
    ssr: '',
  }

  constructor(filename: string, code = '', hidden = false) {
    this.filename = filename
    this.code = code
    this.hidden = hidden
  }
}

export interface StoreState {
  mainFile: string
  files: Record<string, File>
  activeFile: File
  errors: (string | Error)[]
  vueRuntimeURL: string
  vueServerRendererURL: string
  // used to force reset the sandbox
  resetFlip: boolean
}

export interface SFCOptions {
  script?: Partial<SFCScriptCompileOptions>
  style?: Partial<SFCAsyncStyleCompileOptions>
  template?: Partial<SFCTemplateCompileOptions>
}

export interface Store {
  state: StoreState
  options?: SFCOptions
  compiler: typeof defaultCompiler
  vueVersion?: string
  init: () => void
  setActive: (filename: string) => void
  addFile: (filename: string | File) => void
  deleteFile: (filename: string) => void
  renameFile: (oldFilename: string, newFilename: string) => void
  serialize: () => string
  getFiles: () => Record<string, string>
  setFiles: (newFiles: Record<string, string>, mainFile?: string) => Promise<void>
  getImportMap: () => any
  setImportMap: (map: {
    imports: Record<string, string>
    scopes?: Record<string, Record<string, string>>
  }) => void
  setVueVersion: (version: string) => Promise<void>
  resetVueVersion: () => void
  initialShowOutput: boolean
  initialOutputMode: OutputModes
}

export interface StoreOptions {
  serializedState?: string
  showOutput?: boolean
  // loose type to allow getting from the URL without inducing a typing error
  outputMode?: OutputModes | string
  defaultVueRuntimeURL?: string
  defaultVueServerRendererURL?: string
}

export class ReplStore implements Store {
  state: StoreState
  compiler = defaultCompiler
  vueVersion?: string
  options?: SFCOptions
  initialShowOutput: boolean
  initialOutputMode: OutputModes

  private defaultVueRuntimeURL: string
  private defaultVueServerRendererURL: string
  private pendingCompiler: Promise<any> | null = null

  constructor({
    serializedState = '',
    defaultVueRuntimeURL = `https://unpkg.com/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.js`,
    defaultVueServerRendererURL = `https://unpkg.com/@vue/server-renderer@${version}/dist/server-renderer.esm-browser.js`,
    showOutput = false,
    outputMode = 'preview',
  }: StoreOptions = {}) {
    let files: StoreState['files'] = {}

    if (serializedState) {
      const saved = JSON.parse(atou(serializedState))
      for (const filename in saved)
        files[filename] = new File(filename, saved[filename])
    } else {
      files = {
        [defaultMainFile]: new File(defaultMainFile, welcomeCode),
      }
    }

    this.defaultVueRuntimeURL = defaultVueRuntimeURL
    this.defaultVueServerRendererURL = defaultVueServerRendererURL
    this.initialShowOutput = showOutput
    this.initialOutputMode = outputMode as OutputModes

    let mainFile = defaultMainFile
    if (!files[mainFile]) mainFile = Object.keys(files)[0]

    this.state = reactive({
      mainFile,
      files,
      activeFile: files[mainFile],
      errors: [],
      vueRuntimeURL: this.defaultVueRuntimeURL,
      vueServerRendererURL: this.defaultVueServerRendererURL,
      resetFlip: true,
    })

    this.initImportMap()
  }

  // don't start compiling until the options are set
  init() {
    watchEffect(() => compileFile(this, this.state.activeFile))
    for (const file in this.state.files) {
      if (file !== defaultMainFile) compileFile(this, this.state.files[file])
    }
  }

  setActive(filename: string) {
    this.state.activeFile = this.state.files[filename]
  }

  addFile(fileOrFilename: string | File): void {
    const file
      = typeof fileOrFilename === 'string'
        ? new File(fileOrFilename)
        : fileOrFilename
    this.state.files[file.filename] = file
    if (!file.hidden) this.setActive(file.filename)
  }

  deleteFile(filename: string) {
    if (confirm(`Are you sure you want to delete ${filename}?`)) {
      if (this.state.activeFile.filename === filename)
        this.state.activeFile = this.state.files[this.state.mainFile]

      delete this.state.files[filename]
    }
  }

  renameFile(oldFilename: string, newFilename: string) {
    const { files } = this.state
    const file = files[oldFilename]

    if (!file) {
      this.state.errors = [`Could not rename "${oldFilename}", file not found`]
      return
    }

    if (!newFilename || oldFilename === newFilename) {
      this.state.errors = [`Cannot rename "${oldFilename}" to "${newFilename}"`]
      return
    }

    file.filename = newFilename

    const newFiles: Record<string, File> = {}

    // Preserve iteration order for files
    for (const name in files) {
      if (name === oldFilename) newFiles[newFilename] = file
      else newFiles[name] = files[name]
    }

    this.state.files = newFiles

    if (this.state.mainFile === oldFilename) this.state.mainFile = newFilename

    compileFile(this, file)
  }

  serialize() {
    const files = this.getFiles()
    const importMap = files[importMapFile]
    if (importMap) {
      const { imports } = JSON.parse(importMap)
      if (imports.vue === this.defaultVueRuntimeURL) delete imports.vue

      if (imports['vue/server-renderer'] === this.defaultVueServerRendererURL)
        delete imports['vue/server-renderer']

      if (!Object.keys(imports).length) delete files[importMapFile]
      else files[importMapFile] = JSON.stringify({ imports }, null, 2)
    }
    return `#${utoa(JSON.stringify(files))}`
  }

  getFiles() {
    const exported: Record<string, string> = {}
    for (const filename in this.state.files) exported[filename] = this.state.files[filename].code

    return exported
  }

  async setFiles(newFiles: Record<string, string>, mainFile = defaultMainFile) {
    const files: Record<string, File> = {}
    if (mainFile === defaultMainFile && !newFiles[mainFile])
      files[mainFile] = new File(mainFile, welcomeCode)

    for (const filename in newFiles) files[filename] = new File(filename, newFiles[filename])

    for (const file in files) await compileFile(this, files[file])

    this.state.mainFile = mainFile
    this.state.files = files
    this.initImportMap()
    this.setActive(mainFile)
    this.forceSandboxReset()
  }

  private forceSandboxReset() {
    this.state.resetFlip = !this.state.resetFlip
  }

  private initImportMap() {
    const map = this.state.files[importMapFile]

    if (!map) {
      this.state.files[importMapFile] = new File(
        importMapFile,
        JSON.stringify(
          {
            imports: {
              vue: this.defaultVueRuntimeURL,
              'vue/server-renderer': this.defaultVueServerRendererURL
            },
          },
          null,
          2,
        ),
      )
    } else {
      try {
        const json = JSON.parse(map.code)
        if (!json.imports.vue) json.imports.vue = this.defaultVueRuntimeURL

        if (!json.imports['vue/server-renderer'])
          json.imports['vue/server-renderer'] = this.defaultVueServerRendererURL

        map.code = JSON.stringify(json, null, 2)
      } catch (e) { }
    }
  }

  getImportMap() {
    try {
      return JSON.parse(this.state.files[importMapFile].code)
    } catch (e) {
      this.state.errors = [`Syntax error in import-map.json: ${(e as Error).message}`]
      return {}
    }
  }

  setImportMap(map: {
    imports: Record<string, string>
    scopes?: Record<string, Record<string, string>>
  }) {
    this.state.files[importMapFile]!.code = JSON.stringify(map, null, 2)
  }

  async setVueVersion(version: string) {
    this.vueVersion = version
    const compilerUrl = `https://unpkg.com/@vue/compiler-sfc@${version}/dist/compiler-sfc.esm-browser.js`
    const runtimeUrl = `https://unpkg.com/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.js`
    const ssrUrl = `https://unpkg.com/@vue/server-renderer@${version}/dist/server-renderer.esm-browser.js`
    this.pendingCompiler = import(/* @vite-ignore */ compilerUrl)
    this.compiler = await this.pendingCompiler
    this.pendingCompiler = null
    this.state.vueRuntimeURL = runtimeUrl
    this.state.vueServerRendererURL = ssrUrl
    const importMap = this.getImportMap()
    const imports = importMap.imports || (importMap.imports = {})
    imports.vue = runtimeUrl
    imports['vue/server-renderer'] = ssrUrl
    this.setImportMap(importMap)
    this.forceSandboxReset()
  }

  resetVueVersion() {
    this.vueVersion = undefined
    this.compiler = defaultCompiler
    this.state.vueRuntimeURL = this.defaultVueRuntimeURL
    this.state.vueServerRendererURL = this.defaultVueServerRendererURL
    const importMap = this.getImportMap()
    const imports = importMap.imports || (importMap.imports = {})
    imports.vue = this.defaultVueRuntimeURL
    imports['vue/server-renderer'] = this.defaultVueServerRendererURL
    this.setImportMap(importMap)
    this.forceSandboxReset()
  }
}
