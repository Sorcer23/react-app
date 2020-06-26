import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { compose, withHandlers, getContext } from "recompose";
import { connect } from "react-redux";
import classNames from "classnames";
import Swiper from "swiper";

import getServerFileUrl from "utils/getServerFileUrl";
import Icon, { ICON_NAMES } from "components/Icon";

class SpaceTypes extends Component {
  constructor() {
    super();
    this.sliderPreviewsRef = createRef();
    // this.swiperSlider = null;
  }

  initSlides() {
    this.swiperSlider = new Swiper(this.sliderPreviewsRef.current, {
      // spaceBetween: 14,
      centerInsufficientSlides: true,
      slidesPerView: "auto",
      freeMode: true,
      // watchSlidesVisibility: true,
      // watchSlidesProgress: true,
      clickable: true,
      loop: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          // slidesPerView: 1,
        },
        // when window width is >= 480px
        768: {
          // slidesPerView: 2,
          // freeMode: false,
        },
        1024: {
          // slidesPerView: 3,
          // freeMode: false,
        }
      }
    });
  }

  handleSelect = id => () => {
    this.props.handleChangeSpaceType(id);
  };

  componentDidMount() {
    this.initSlides();
  }

  render() {
    const { spaceTypes, filter } = this.props;

    const activeSpaceType = filter.spaceTypeId;

    return (
      <div className="slider slider--grey">
        <div className="container">
          <div
            ref={this.sliderPreviewsRef}
            className="swiper-container gallery"
          >
            <div className="swiper-wrapper">
              {spaceTypes.map(spaceType => (
                <button
                  key={spaceType.value}
                  type="button"
                  className={classNames("swiper-slide card card--fix-width", {
                    "card--active":
                      activeSpaceType &&
                      activeSpaceType.toString() === spaceType.value.toString()
                  })}
                  onClick={this.handleSelect(spaceType.value)}
                >
                  <span
                    className="card__inner"
                    style={{
                      backgroundImage: `url(${getServerFileUrl(
                        spaceType.image,
                        { width: 124, method: "resize" }
                      )})`
                    }}
                  >
                    <span className="card__title">{spaceType.label}</span>
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="swiper-button-next swiper-button swiper-button--rounded"
            ></button>
            <button
              type="button"
              className="swiper-button-prev swiper-button swiper-button--rounded"
            ></button>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  getContext({
    filter: PropTypes.object.isRequired,
    changeFilter: PropTypes.func.isRequired
  }),
  connect(state => {
    return {
      spaceTypes: state.appData.list.spaceTypes
    };
  }),
  withHandlers({
    handleChangeSpaceType: props => value => {
      props.changeFilter("spaceTypeId", value);
    }
  })
)(SpaceTypes);
