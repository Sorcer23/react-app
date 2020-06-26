import React from "react";

import DropdownLang from "html/chunks/DropdownLang/";
import Input from "components/form/Input";
import { ICON_NAMES } from "components/Icon";

function SignUp3Html(props) {
  return (
    <div className="wrapper">
      <main className="main main--authorization">
        <section className="authorization">
          <div className="authorization__background"></div>
          <div className=" authorization__inner">
            <div className="authorization__left-col">
              <div className="column-head">
                <DropdownLang />
              </div>
              <div className="column-body">
                <h5 className="authorization__subtitle vertical-center">
                  Use atleast 8 characters to create a password. Try to make it
                  a little difficult.
                </h5>
              </div>
            </div>
            <div className="authorization__right-col column-smaller">
              <a href="#" className="btn-back">
                <svg
                  className="e-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <g>
                    <g>
                      <g>
                        <g>
                          <path d="M9.747 5.464a.513.513 0 0 1 .732 0 .517.517 0 0 1 0 .725S6.883 9.61 6.622 9.929a.78.78 0 0 0 0 1.034c.261.314 3.857 3.68 3.857 3.68a.526.526 0 0 1 0 .733.513.513 0 0 1-.732 0l-4.593-4.594a.504.504 0 0 1 0-.725z" />
                          <path
                            fill="none"
                            stroke="#34375a"
                            stroke-miterlimit="50"
                            stroke-width=".5"
                            d="M9.747 5.464a.513.513 0 0 1 .732 0 .517.517 0 0 1 0 .725S6.883 9.61 6.622 9.929a.78.78 0 0 0 0 1.034c.261.314 3.857 3.68 3.857 3.68a.526.526 0 0 1 0 .733.513.513 0 0 1-.732 0l-4.593-4.594a.504.504 0 0 1 0-.725z"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                Back
              </a>
              <div className="authorization-steps">
                <span className="active">3</span>/ <sup>4</sup>
              </div>
              <div className="authorization__logo">
                <img src="/img/logo.svg" alt="" />
              </div>
              <div className="quote">
                “Simplicity is the ultimate sophistication”
                <span className="quote__author">-Leonardo da Vinci</span>
              </div>
              <h2 className="title title--dark">Create a Password</h2>
              <Input
                name="name"
                placeholder="Password"
                className="field--error"
                type="password"
                icon={ICON_NAMES.lock}
              />
              <div className="btn authorization__btn">Continue</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignUp3Html;
