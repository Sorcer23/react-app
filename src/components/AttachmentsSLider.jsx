import React, { Component, createRef } from "react";
import {
  renderNothing,
  branch,
  renderComponent,
  compose,
  withState
} from "recompose";
import Swiper from "swiper";
import { Link } from "react-router-dom";

import getServerFileUrl from "utils/getServerFileUrl";
import history from "services/history";
import ROUTES from "config/routes";
import Icon, { ICON_NAMES } from "components/Icon";
import ModalImage from "components/modals/ModalImage";
import withModal from "HOC/withModal";
import AttachmentsSlide from "components/AttachmentsSlide";

class Slider extends Component {
  constructor() {
    super();
    this.sliderPreviewsRef = createRef();
  }

  initSliders() {
    this.swiperSlider = new Swiper(this.sliderPreviewsRef.current, {
      spaceBetween: 30,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      clickable: true,
      zoom: {
        maxRatio: 3
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 3,
          freeMode: false,
          spaceBetween: 10
        },
        1144: {
          slidesPerView: 4,
          freeMode: false,
          spaceBetween: 30
        }
      }
    });
  }

  componentDidMount() {
    this.initSliders();
  }

  handleSlideClick(entity) {
    const { setModalOpen, setSelectedImageSrc } = this.props;
    setSelectedImageSrc(getServerFileUrl(entity));
    setModalOpen(true);
  }

  render() {
    const {
      images,
      selectedImageSrc,
      isModalOpen,
      setModalOpen,
      setSelectedImageSrc
    } = this.props;

    return (
      <div className="slider">
        <div ref={this.sliderPreviewsRef} className="swiper-container gallery">
          <div className="swiper-wrapper">
            {images.map(image => (
              <AttachmentsSlide
                key={image}
                onClick={() => this.handleSlideClick(image)}
                image={image}
              />
            ))}
          </div>
          <button
            type="button"
            className="swiper-button-next swiper-button"
          ></button>
          <button
            type="button"
            className="swiper-button-prev swiper-button"
          ></button>
        </div>

        <ModalImage
          isOpen={isModalOpen}
          src={selectedImageSrc}
          onRequestClose={() => {
            setModalOpen(false);
            setSelectedImageSrc("");
          }}
        />
      </div>
    );
  }
}

export default compose(
  branch(props => props.images && props.images.length === 0, renderNothing),
  withState("selectedImageSrc", "setSelectedImageSrc", ""),
  withModal()
)(Slider);
