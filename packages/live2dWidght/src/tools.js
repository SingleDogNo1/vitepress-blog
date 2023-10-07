/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-restricted-globals */
import fa_paper_plane from '@fortawesome/fontawesome-free/svgs/solid/paper-plane.svg'
import fa_user_circle from '@fortawesome/fontawesome-free/svgs/solid/circle-user.svg'
import fa_street_view from '@fortawesome/fontawesome-free/svgs/solid/street-view.svg'
import fa_camera_retro from '@fortawesome/fontawesome-free/svgs/solid/camera-retro.svg'
import fa_xmark from '@fortawesome/fontawesome-free/svgs/solid/xmark.svg'

import showMessage from './message.js'

const tools = {
  asteroids: {
    icon: fa_paper_plane,
    callback: () => {
      if (window.Asteroids) {
        if (!window.ASTEROIDSPLAYERS) window.ASTEROIDSPLAYERS = []
        window.ASTEROIDSPLAYERS.push(new Asteroids())
      } else {
        const script = document.createElement('script')
        script.src = 'https://fastly.jsdelivr.net/gh/stevenjoezhang/asteroids/asteroids.js'
        document.head.appendChild(script)
      }
    }
  },
  'switch-model': {
    icon: fa_user_circle,
    callback: () => {}
  },
  'switch-texture': {
    icon: fa_street_view,
    callback: () => {}
  },
  photo: {
    icon: fa_camera_retro,
    callback: () => {
      showMessage('照好了嘛，是不是很可爱呢？', 6000, 9)
      Live2D.captureName = 'photo.png'
      Live2D.captureFrame = true
    }
  },
  quit: {
    icon: fa_xmark,
    callback: () => {
      localStorage.setItem('waifu-display', Date.now())
      showMessage('愿你有一天能与重要的人重逢。', 2000, 11)
      document.getElementById('waifu').style.bottom = '-500px'
      setTimeout(() => {
        document.getElementById('waifu').style.display = 'none'
        document.getElementById('waifu-toggle').classList.add('waifu-toggle-active')
      }, 3000)
    }
  }
}

export default tools
