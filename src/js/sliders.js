import Swiper from 'swiper'
import {Autoplay, Navigation, Pagination} from "swiper/modules";

class InitSlider {
  classSlider = ''
  settingsSlider = {}
  slider = null

  constructor(props) {
    this.classSlider = props.classSlider
    this.settingsSlider = props.settingsSlider

    this.checkSlider()

    if (this.settingsSlider.destroySize) {
      this.checkResizeSlider()
    }
  }

  checkSlider() {
    if (window.matchMedia(this.settingsSlider.destroySize).matches && this.settingsSlider.destroySize) {
      if (this.slider) {
        try {
          this.destroySlider()
        } catch (e) {
          console.log(e)
        }
      }
      return 1
    } else {
      if (!this.slider) {
        this.initSlider()
      }
    }
  }

  checkResizeSlider() {
    window.addEventListener('resize', () => {
      this.checkSlider()
    })
  }

  initSlider() {
    this.slider = new Swiper(this.classSlider, this.settingsSlider) || null
  }

  destroySlider() {
    this.slider.destroy()
    this.slider = null
    document.querySelectorAll(`${this.classSlider}__slider`)?.forEach((i) => {
      i.removeAttribute('style')
    })
    document.querySelector(`${this.classSlider}__wrapper`)?.removeAttribute('style')
  }
}

const listSliders = [
  {
    classSlider: '.tmpl-hh-header__slider',
    settingsSlider: {
      modules: [Autoplay, Navigation, Pagination],
      autoplay: {
        delay: 4000,
      },
      loop: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      initialSlide: 0,
      navigation: {
        prevEl: '.slider-button_prev',
        nextEl: '.slider-button_next',
      },
      pagination: {
        el: '.tmpl-hh-header__slider-pagination',
        bulletClass: 'tmpl-hh-header__slider-bullet',
        bulletActiveClass: 'tmpl-hh-header__slider-bullet_active',
      }
    },
  },
]

export const initSliders = () => {
  listSliders.map((i) => {
    new InitSlider(i)
  })
}
