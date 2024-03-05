import Swiper from 'swiper'
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import ResolutionChecker from "@/js/ResolutionChecker.js";

class InitSlider {
  isVideo = false
  classSlider = ''
  settingsSlider = {}
  slider = null

  constructor(props) {
    this.classSlider = props.classSlider
    this.settingsSlider = props.settingsSlider
    this.isVideo = props.isVideo;

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
    this.sliderElem = document.querySelector(this.classSlider);
    this.playVideo();
  }

  destroySlider() {
    this.slider.destroy()
    this.slider = null
    document.querySelectorAll(`${this.classSlider}__slider`)?.forEach((i) => {
      i.removeAttribute('style')
    })
    document.querySelector(`${this.classSlider}__wrapper`)?.removeAttribute('style')
  }

  playVideo() {
    if (!this.isVideo) {
      return;
    }

    const videoInSlides = this.sliderElem.querySelectorAll('[data-with-video] video');
    this.slider.on('slideChange', () => {
      videoInSlides.forEach((video) => {
        video.currentTime = 0;
        video.play();
      })
    })
  }
}

const resolutionChecker = new ResolutionChecker();

const listSliders = [
  {
    classSlider: '.tmpl-hh-header__slider',
    isVideo: true,
    settingsSlider: {
      modules: [Autoplay, Navigation, Pagination],
      autoplay: {
        delay: 15000,
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
  {
    classSlider: '.tmpl-hh-footer__slider',
    settingsSlider: {
      modules: [Autoplay, Navigation, Pagination],
      autoplay: {
        delay: 4000,
      },
      centeredSlides: true,
      slidesPerView: 'auto',
      initialSlide: 0,
      navigation: {
        prevEl: '.slider-button_prev',
        nextEl: '.slider-button_next',
      },
      pagination: {
        el: '.tmpl-hh-footer__slider-pagination',
        bulletClass: 'tmpl-hh-footer__slider-bullet',
        bulletActiveClass: 'tmpl-hh-footer__slider-bullet_active',
      }
    },
  },
]

export const initSliders = () => {
  listSliders.map((i) => {
    new InitSlider(i)
  })
}
