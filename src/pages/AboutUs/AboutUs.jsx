import React from "react";

import { compose } from "recompose";
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import Icon, { ICON_NAMES } from "components/Icon";

const AboutUs = () => {
  return (
    <main className="main">
      <section className="about-us">
        <div className="container">
          <div className="data__head">
            <h1 className="section-title">About Us</h1>
          </div>
          <div className="data__body">
            <div className="row flex-column flex-md-row">
              <div className="col-md-6 order-2 order-md-0">
                <div className="data__text">
                  <p className="about-us__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur
                    adipiscing{" "}
                  </p>

                  <p className="about-us__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat{" "}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="about-us__image-wrap">
                  <img
                    className="about-us__image"
                    src="/img/about-us.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default compose(passAuthUser, pageLayout())(AboutUs);
