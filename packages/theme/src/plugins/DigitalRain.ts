/**
 * @description 生成代码雨背景
 * @author singleDogNo.1
 * @param {options.el} string 渲染画布的选择器
 * @param {options.fontSize} number 下落的字体的大小
 * @param {options.str} string 下落的文字（默认 10 - 15 位随机字母）
 * @param {options.color} string 文字的颜色（默认随机颜色）
 */
export class DigitalPaRain {
  private canvas: HTMLCanvasElement

  private fontSize: number

  private str: string

  private color: string | undefined

  private ctx: CanvasRenderingContext2D

  private W: number

  private H: number

  private columns: number

  private lines: number

  private drops: number[]

  constructor(options: { el: HTMLCanvasElement; fontSize?: number; str?: string; color?: string }) {
    this.canvas = options.el
    this.fontSize = options.fontSize || 20
    this.str = options.str || this.getRandomStr(10, 20)
    this.color = options.color

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.W = window.screen.width
    this.H = window.screen.height
    this.canvas.width = this.W
    this.canvas.height = this.H
    this.canvas.style.position = 'fixed'
    this.canvas.style.top = '0'
    this.canvas.style.left = '0'
    this.canvas.style.zIndex = '-1'
    this.columns = Math.floor(this.W / this.fontSize)
    this.lines = Math.floor(this.H / this.fontSize)
    this.drops = []
    this.run()
  }

  getRandomStr(minLength: number, maxLength: number) {
    const result = []
    for (let i = minLength; i < maxLength; i += 1) {
      const ranNum = Math.ceil(Math.random() * 25)
      result.push(String.fromCharCode(65 + ranNum))
    }
    return result.join('')
  }

  randColor() {
    return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256
    )},${(Math.random() * (0.8 - 0.2) + 0.2).toFixed(2)})`
  }

  draw(str: string) {
    this.ctx.fillStyle = 'rgba(238,238,238,.06)'
    this.ctx.fillRect(0, 0, this.W, this.H)
    this.ctx.font = `600  ${this.fontSize}px  Georgia`
    this.ctx.fillStyle = this.color ? this.color : this.randColor()
    for (let i = 0; i < this.columns; i += 1) {
      const index = Math.floor(Math.random() * str.length)
      const x = i * this.fontSize
      const y = this.drops[i] * this.fontSize
      this.ctx.fillText(str[index], x, y)
      y >= this.canvas.height && Math.random() > 0.99 ? (this.drops[i] = 0) : (this.drops[i] += 1)
    }
  }

  run() {
    for (let i = 0; i < this.columns; i += 1) {
      this.drops.push(Math.floor(Math.random() * this.lines))
    }
    setInterval(() => {
      this.draw(this.str)
    }, 60)

    // TODO: requestAnimationFrame运动过快，视觉效果不好，如何使用requestAnimationFrame优化
    // this.draw(this.str)
    // requestAnimationFrame(this.run.bind(this))
  }
}
