const live2d_path = '/live2d-widget/'

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag

    if (type === 'css') {
      tag = document.createElement('link')
      tag.rel = 'stylesheet'
      tag.href = url
    } else if (type === 'js') {
      tag = document.createElement('script')
      tag.src = url
    }
    if (tag) {
      tag.onload = () => resolve(url)
      tag.onerror = () => reject(url)
      document.head.appendChild(tag)
    }
  })
}

if (window.screen.width >= 768) {
  Promise.all([
    loadExternalResource(`${live2d_path}waifu.css`, 'css'),
    loadExternalResource(`${live2d_path}live2d.min.js`, 'js'),
    loadExternalResource(`${live2d_path}waifu-tips.js`, 'js')
  ]).then(() => {
    initWidget({
      waifuPath: `${live2d_path}waifu-tips.json`,
      cdnPath: 'https://cdn.jsdelivr.net/gh/SingleDogNo1/live2d_api@1.4/',
      tools: ['switch-model', 'switch-texture', 'photo', 'quit']
    })
  })
}

console.log('enjoy live2d model!!')
