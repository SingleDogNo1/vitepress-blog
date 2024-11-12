import showMessage from './message.js'
import randomSelection from './utils.js'

class Model {
  constructor(config) {
    let { cdnPath } = config
    let useCDN = false
    if (typeof cdnPath === 'string') {
      useCDN = true
      if (!cdnPath.endsWith('/')) cdnPath += '/'
    } else {
      throw new Error('Invalid initWidget argument!')
    }
    this.useCDN = useCDN
    this.cdnPath = cdnPath
  }

  async loadModelList() {
    const response = await fetch(`${this.cdnPath}model_list.json`)
    this.modelList = await response.json()
  }

  async loadModel(modelId, message) {
    localStorage.setItem('modelId', modelId)
    showMessage(message, 4000, 10)
    if (this.useCDN) {
      if (!this.modelList) await this.loadModelList()
      const target = randomSelection(this.modelList.models[modelId])
      loadlive2d('live2d', `${this.cdnPath}model/${target}/index.json`)
    } else {
      throw new Error('Live2D 模型加载失败')
    }
  }

  async loadRandModel() {
    const modelId = localStorage.getItem('modelId')
    if (this.useCDN) {
      if (!this.modelList) await this.loadModelList()
      const target = randomSelection(this.modelList.models[modelId])
      loadlive2d('live2d', `${this.cdnPath}model/${target}/index.json`)
      showMessage('我的新衣服好看嘛？', 4000, 10)
    } else {
      throw new Error('Live2D 模型加载失败')
    }
  }

  async loadOtherModel() {
    let modelId = localStorage.getItem('modelId')
    if (this.useCDN) {
      if (!this.modelList) await this.loadModelList()
      // eslint-disable-next-line no-plusplus
      const index = ++modelId >= this.modelList.models.length ? 0 : modelId
      this.loadModel(index, this.modelList.messages[index])
    } else {
      throw new Error('Live2D 模型加载失败')
    }
  }
}

export default Model
