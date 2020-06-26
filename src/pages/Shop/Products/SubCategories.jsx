import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import {
  compose,
  withHandlers,
  getContext,
  branch,
  renderNothing
} from "recompose";
import { connect } from "react-redux";
import classNames from "classnames";
import Swiper from "swiper";

import getServerFileUrl from "utils/getServerFileUrl";
import Icon, { ICON_NAMES } from "components/Icon";

class SubCategories extends Component {
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
    this.props.handleChangeCategory(id);
  };

  componentDidMount() {
    this.initSlides();
  }

  render() {
    const { subCategories, filter } = this.props;

    const axtiveSubCategoryId = filter.subCategoryId;

    return (
      <div className="slider slider--grey">
        <div className="container">
          <div
            ref={this.sliderPreviewsRef}
            className="swiper-container gallery"
          >
            <div className="swiper-wrapper">
              {subCategories.map(subCategory => (
                <button
                  key={subCategory.value}
                  type="button"
                  className={classNames("swiper-slide card card--fix-width", {
                    "card--active": axtiveSubCategoryId === subCategory.value
                  })}
                  onClick={this.handleSelect(subCategory.value)}
                >
                  <span
                    className="card__inner"
                    style={{
                      backgroundImage: `url(${getServerFileUrl(
                        subCategory.image,
                        {
                          width: 124,
                          method: "resize"
                        }
                      )})`
                    }}
                  >
                    <span className="card__title">{subCategory.label}</span>
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
  connect((state, props) => {
    return {
      subCategories: state.appData.list.productSubCategories.filter(
        subCategory => subCategory.categoryId === props.filter.categoryId
      )
    };
  }),
  branch(
    props =>
      props.filter.categoryId == null || props.subCategories.length === 0,
    renderNothing
  ),
  withHandlers({
    handleChangeCategory: props => value => {
      props.changeFilter("subCategoryId", value);
    }
  })
)(SubCategories);
