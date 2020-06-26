import React from "react";

import Icon, { ICON_NAMES } from "components/Icon";
import Input from "components/form/Input";
function CustomerAddress(props) {
  return (
    <div className="wrapper">
      <main className="main">
        <div className="popup popup-map">
          <button className="popup__close">
            <Icon name={ICON_NAMES.close} />
          </button>
          <div className="popup__head">
            <div className="popup__title">Add New Address</div>
          </div>
          <div className="popup__body popup-map__inner">
            <div
              className="map-image"
              style={{
                minHeight: 350,
                backgroundImage: "url('/img/temp/bg-map.jpg')"
              }}
            >
              <div className="search-address">
                <div className="search-address__inner">
                  <button type="submit" className="search-address__button">
                    <Icon name={ICON_NAMES.search} />
                  </button>
                  <input
                    type="text"
                    className="search-address__input"
                    placeholder="Search"
                  />
                </div>
                <button className="search-address__button-save">Save</button>
              </div>
            </div>
          </div>
        </div>
        <div className="popup popup-map">
          <button className="popup__close">
            <Icon name={ICON_NAMES.close} />
          </button>
          <div className="popup__head">
            <div className="popup__title">Add New Address</div>
          </div>
          <div className="popup__body popup-map__inner">
            <div className="popup-map__content row">
              <div className="col-md-5 popup-map__map-wrap">
                <div className="popup-map__map">
                  <div
                    className="map-image"
                    style={{ backgroundImage: "url('/img/temp/bg-map.jpg')" }}
                  ></div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="popup-map__form">
                  <Input name="name" placeholder="Name" className="" />
                  <Input
                    name="name"
                    placeholder="Mobile Number"
                    className=""
                    type="number"
                  />
                  <Input
                    name="name"
                    placeholder="Address Line 1"
                    className=""
                  />
                  <Input
                    name="name"
                    placeholder="Address Line 2"
                    className=""
                  />
                  <Input name="name" placeholder="City" className="" />
                  <Input name="name" placeholder="Country" className="" />
                  <Input name="name" placeholder="Pincode" className="" />
                  <Input name="name" placeholder="Landmark" className="" />

                  <div className="row">
                    <div className="col-6">
                      <button className="btn btn--width-100">Save</button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn--light btn--width-100">
                        Save and New
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="data">
          <div className="container data__inner">
            <div className="data__head">
              <h1 className="section-title">Manage Addresses</h1>
            </div>
            <div className="data__body">
              <div className="row">
                <div className="col-sm-6 col-lg-4">
                  <div className="address-item">
                    <div className="address-item__content">
                      <label className="radio-btn">
                        <input type="radio" name="address" />
                        <span className="radio-btn__icon"></span>
                        <span className="radio-btn__title">
                          Newsletter Subscription
                        </span>
                      </label>
                      <h4 className="address-item__title">
                        House Number 23, Sector 31, Gurgaon Lorem Ipsum
                        Harayana-218919
                      </h4>
                      <ul className="address-item__list">
                        <li className="address-item__item">
                          <b>Landmark:&nbsp;</b>XYZ
                        </li>
                        <li className="address-item__item">
                          <b>Mobile:&nbsp</b>9876543212
                        </li>
                      </ul>
                    </div>
                    <div className="address-item__actions">
                      <div className="address-item__buttons-wrap">
                        <button className="address-button">
                          <Icon
                            className="address-button__icon"
                            name={ICON_NAMES.trash}
                          />
                          <span className="address-button__title">Delete</span>
                        </button>
                        <button className="address-button">
                          <Icon
                            className="address-button__icon"
                            name={ICON_NAMES.edit}
                          />
                          <span className="address-button__title">Edit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 ">
                  <button type="button" className="upload upload--large ">
                    <span className="upload__inner">
                      <span className="upload__info">
                        <span className="upload__icon">
                          <Icon name={ICON_NAMES.add} />
                        </span>
                        <span className="upload__title">Add Address</span>
                        <input className="upload__input" type="file" />
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CustomerAddress;
