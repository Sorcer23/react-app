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
import EntitySLide from "./EntitySLide";

class Slider extends Component {
  constructor() {
    super();
    this.sliderPreviewsRef = createRef();
    // this.swiperSlider = null;
  }

  initSliders() {
    this.swiperSlider = new Swiper(this.sliderPreviewsRef.current, {
      centerInsufficientSlides: true,
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
        // when window width is >= 320px
        320: {
          slidesPerView: 1
        },
        // when window width is >= 480px
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
    const { entityName, setModalOpen, setSelectedImageSrc } = this.props;

    switch (entityName) {
      case "product": {
        history.push(`${ROUTES.product}/${entity.id}`);
        break;
      }
      case "service": {
        history.push(`${ROUTES.service}/${entity.id}`);
        break;
      }
      case "post": {
        history.push(`${ROUTES.post}/${entity.id}`);
        break;
      }
      case "sample": {
        setSelectedImageSrc(getServerFileUrl(entity));
        setModalOpen(true);
        break;
      }
      default: {
      }
    }
  }

  render() {
    const {
      entities,
      selectedImageSrc,
      isModalOpen,
      setModalOpen,
      setSelectedImageSrc
    } = this.props;

    return (
      <div className="slider">
        <div ref={this.sliderPreviewsRef} className="swiper-container gallery">
          <div className="swiper-wrapper">
            {entities &&
              entities.map(entity => (
                <EntitySLide
                  key={typeof entity === "string" ? entity : entity.id}
                  onClick={() => this.handleSlideClick(entity)}
                  entity={entity}
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
  branch(props => props.entities && props.entities.length === 0, renderNothing),
  withState("selectedImageSrc", "setSelectedImageSrc", ""),
  withModal()
)(Slider);
