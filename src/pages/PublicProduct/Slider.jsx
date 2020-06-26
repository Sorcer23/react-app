import React, { Component, createRef } from "react";
import Swiper from "swiper";

import getServerFileUrl from "utils/getServerFileUrl";
import Icon, { ICON_NAMES } from "components/Icon";

class Slider extends Component {
  constructor() {
    super();
    this.sliderMainRef = createRef();
    this.sliderPreviewsRef = createRef();
    this.swiperMain = null;
    this.swiperPreviews = null;
  }

  handleToggleZoom = () => {
    this.swiperMain.zoom.toggle();
  };

  initSliders() {
    this.swiperPreviews = new Swiper(this.sliderPreviewsRef.current, {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      clickable: true,

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 3
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 4,
          freeMode: false
        }
      }
    });
    this.swiperMain = new Swiper(this.sliderMainRef.current, {
      spaceBetween: 15,
      zoom: {
        maxRatio: 5
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      },
      thumbs: {
        swiper: this.swiperPreviews
      }
    });
  }

  componentDidMount() {
    this.initSliders();
  }

  render() {
    const { images } = this.props;

    return (
      <div className="product-slider">
        <button
          type="button"
          className="btn-zoom"
          onClick={this.handleToggleZoom}
        >
          <Icon className="product-zoom" name={ICON_NAMES.zoom} />
        </button>

        <div ref={this.sliderMainRef} className="swiper-container gallery-top">
          <div className="swiper-wrapper">
            {images.map(image => (
              <div key={image} className="swiper-slide">
                <div className="swiper-zoom-container" data-swiper-zoom="5">
                  <img src={getServerFileUrl(image)} alt="" />
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>

        <div
          ref={this.sliderPreviewsRef}
          className="swiper-container gallery-thumbs"
        >
          <div className="swiper-wrapper">
            {images.map(image => (
              <div key={image} className="swiper-slide">
                <img src={getServerFileUrl(image)} alt="" />
              </div>
            ))}
          </div>
          <div className="swiper-button-next swiper-button"></div>
          <div className="swiper-button-prev swiper-button"></div>
        </div>
      </div>
    );
  }
}

export default Slider;
