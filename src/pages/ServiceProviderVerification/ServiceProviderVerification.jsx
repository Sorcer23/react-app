import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "recompose";
import { connect } from "react-redux";

import ProviderAccountModule from "modules/providerAccount";
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import ROUTES from "config/routes";
import Button from "components/Button";

const ServiceProviderVerification = props => {
  const { intl } = props;

  return (
    <main className="main">
      <section>
        <div className="container">
          <div className="verification-screen">
            <div className="row justify-content-center">
              <div className="col-md-10 verification-screen__inner">
                <div className="row">
                  <div className="col-md-6 offset-md-1">
                    <h1 className="verification-screen__title">
                      Request to become Service Provider
                    </h1>
                    <div className="verification-screen__text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor. Lorem ipsum dolor sit amet,
                      consectetur adipiscing Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit, sed do eiusmod tempor. Lorem
                      ipsum dolor sit amet, consectetur adipiscing Lorem ipsum
                      dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor. Lorem t amet, consectetur adipiscing elit,
                      sed do eiusmod tempor. Lorem Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit, sed do eiusmod tempor. Lorem
                      ipsum dolor sit amet, consectetur adipiscing Lorem ipsum
                      dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor. Lorem ipsum dolor sit amet, consectetur
                      adipiscing Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor. Lorem t amet,
                      consectetur adipiscing elit, sed do eiusmod tempor. Lorem
                      ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor. Lorem t amet, consectetur adipiscing elit,
                      sed do eiusmod tempor. Lorem Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit, sed do eiusmod tempor. Lorem
                      ipsum dolor sit amet, consectetur adipiscing Lorem ipsum
                      dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor. Lorem ipsum dolor sit amet, consectetur
                      adipiscing Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor. Lorem t amet,
                      consectetur adipiscing elit, sed do eiusmod tempor. Lorem
                    </div>
                    <Button
                      type="button"
                      size="md"
                      onClick={props.requestToBeProvider}
                    >
                      {intl.formatMessage({ id: "ui.actions.request" })}
                    </Button>
                    <p className="verification-screen__notification">
                      By requesting, you agree to our
                      <a
                        href={ROUTES.termsConditions}
                        target="_blank"
                        className="verification-screen__term-link"
                      >
                        {intl.formatMessage({
                          id: "ui.navigation.terms_conditions"
                        })}
                      </a>
                    </p>
                  </div>
                  <div className="col-md-5 verification-screen__image-wrap">
                    <img src="/img/verification-screen-image.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default compose(
  passAuthUser,
  pageLayout(),
  injectIntl,
  connect(null, {
    requestToBeProvider: ProviderAccountModule.requestToBeProvider
  })
)(ServiceProviderVerification);
