import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { compose, withHandlers, getContext } from "recompose";
import { connect } from "react-redux";
import classNames from "classnames";
import Swiper from "swiper";

import getServerFileUrl from "utils/getServerFileUrl";
import Icon, { ICON_NAMES } from "components/Icon";

class Categories extends Component {
  constructor() {
    super();
    this.sliderPreviewsRef = createRef();
    // this.swiperSlider = null;
  }

  initSlides() {
    this.swiperSlider = new Swiper(this.sliderPreviewsRef.current, {
      // spaceBetween: 14,
      slidesPerView: "auto",
      centerInsufficientSlides: true,
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
    this.props.handleChangeCategory(id);
  };

  componentDidMount() {
    this.initSlides();
  }

  render() {
    const { categories, filter } = this.props;

    const axtiveCategoryId = filter.categoryId;

    return (
      <div
        className={classNames("slider slider--grey", {
          "slider--short": axtiveCategoryId != null
        })}
      >
        <div className="container">
          <div
            ref={this.sliderPreviewsRef}
            className="swiper-container gallery"
          >
            <div className="swiper-wrapper">
              {categories.map(category => (
                <button
                  key={category.value}
                  type="button"
                  className={classNames("swiper-slide card card--fix-width", {
                    "card--active": axtiveCategoryId === category.value
                  })}
                  onClick={this.handleSelect(category.value)}
                >
                  <span
                    className="card__inner"
                    style={{
                      backgroundImage: `url(${getServerFileUrl(category.image, {
                        width: 124,
                        method: "resize"
                      })})`
                    }}
                  >
                    <span className="card__title">{category.label}</span>
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
      categories: state.appData.list.categories
    };
  }),
  withHandlers({
    handleChangeCategory: props => value => {
      props.changeFilter("categoryId", value);
    }
  })
)(Categories);
