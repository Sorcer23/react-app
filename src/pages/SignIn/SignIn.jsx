import React, { useState } from "react";
import { compose } from "recompose";
import { injectIntl } from "react-intl";

import routes from "config/routes";
import passNotAuthUser from "HOC/passNotAuthUser";
import LangSelect from "components/LangSelect";
import Button from "components/Button";

import SignInForm from "./SignInForm";

function SignIn(props) {
  const { intl } = props;

  const [authMethod, setMethod] = useState("phone");

  function handleChangeAuthMethod() {
    if (authMethod === "phone") {
      setMethod("email");
    } else {
      setMethod("phone");
    }
  }

  return (
    <div className="wrapper">
      <main className="main main--authorization">
        <section className="authorization">
          <div className="authorization__background"></div>
          <div className=" authorization__inner">
            <div className="authorization__left-col">
              <div className="column-head">
                <LangSelect />
              </div>
              <div className="column-body">
                <h2 className="title title--light">
                  {intl.formatMessage({ id: "ui.auth.sign_in_left_title" })}
                </h2>
                <h5 className="authorization__subtitle">
                  {intl.formatMessage({ id: "ui.auth.sign_in_left_text" })}
                </h5>
                <Button to={routes.signup} className="btn" withBorder>
                  {intl.formatMessage({ id: "ui.actions.sign_up" })}
                </Button>
              </div>
            </div>
            <div className="authorization__right-col">
              <div className="authorization__logo">
                <img src="/img/logo.svg" alt="" />
              </div>
              <div className="quote">
                {intl.formatMessage({ id: "ui.auth.quote5_text" })}
                <span className="quote__author">
                  {intl.formatMessage({ id: "ui.auth.quote5_author" })}
                </span>
              </div>
              <h2 className="title title--dark">
                {intl.formatMessage({ id: "ui.auth.sign_in_title" })}
              </h2>

              <SignInForm
                authMethod={authMethod}
                onAuthMethodChange={handleChangeAuthMethod}
              />

              <p className="text-light">
                {intl.formatMessage({ id: "ui.common.or" })}
              </p>
              <div className="social social--large">
                <ul className="social__list">
                  <li className="social__item">
                    <a href="#" className="social__link">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                      >
                        <g>
                          <path
                            fill="#475993"
                            d="M0 1.6A1.6 1.6 0 0 1 1.6 0h32.8A1.6 1.6 0 0 1 36 1.6v32.8a1.6 1.6 0 0 1-1.6 1.6H1.6A1.6 1.6 0 0 1 0 34.4z"
                          />
                          <path
                            fill="#fff"
                            d="M23.556 36V20.98h5.309l.839-4.978h-6.148v-2.495c0-1.3.456-2.539 2.453-2.539H30V6h-5.666c-4.765 0-6.065 2.929-6.065 6.988V16H15v4.98h3.27V36h5.286z"
                          />
                        </g>
                      </svg>
                    </a>
                  </li>
                  <li className="social__item">
                    <a href="#" className="social__link">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="37"
                        height="36"
                        viewBox="0 0 37 36"
                      >
                        <g>
                          <path
                            fill="#db4545"
                            d="M.22 1.6A1.6 1.6 0 0 1 1.82 0h32.8a1.6 1.6 0 0 1 1.6 1.6v32.8a1.6 1.6 0 0 1-1.6 1.6H1.82a1.6 1.6 0 0 1-1.6-1.6z"
                          />
                          <path
                            fill="#fff"
                            d="M7.007 18.015c-.229-6.187 5.047-11.904 11.077-11.978 3.073-.27 6.062.956 8.388 2.956-.954 1.077-1.925 2.142-2.962 3.139-2.047-1.278-4.512-2.251-6.905-1.387-3.859 1.13-6.196 5.81-4.768 9.688 1.183 4.05 5.979 6.273 9.738 4.571 1.946-.716 3.23-2.56 3.792-4.542-2.23-.046-4.461-.017-6.692-.08-.006-1.364-.011-2.722-.006-4.085 3.72-.006 7.446-.017 11.171.017.23 3.34-.25 6.915-2.365 9.595-2.894 3.827-8.242 4.95-12.593 3.449-4.617-1.558-7.975-6.336-7.875-11.343z"
                          />
                        </g>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default compose(passNotAuthUser, injectIntl)(SignIn);
