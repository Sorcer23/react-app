import React from "react";

import DropdownLang from "html/chunks/DropdownLang/";
import Icon, { ICON_NAMES } from "components/Icon";
import Input from "components/form/Input";

function SignUp4Html(props) {
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
                  Your Name will help us to remember you.
                </h5>
              </div>
            </div>
            <div className="authorization__right-col column-smaller">
              {/*@@include('../chunks/btn-back.html')*/}
              <div className="authorization-steps">
                <span className="active">4</span> / <sup>4</sup>
              </div>
              <div className="authorization__logo">
                <img src="/img/logo.svg" alt="" />
              </div>
              <div className="quote">
                “Great things are done by a series of small things brought
                together”
                <span className="quote__author">-Vincent van Gogh</span>
              </div>
              <h2 className="title title--dark">What’s Your Name?</h2>
              <Input
                name="name"
                placeholder="First Name"
                className=""
                icon={ICON_NAMES.userDark}
              />
              <Input
                name="name"
                placeholder="Last Name"
                className=""
                icon={ICON_NAMES.userDark}
              />

              <p className="text">
                By signing up you agree to our &npbs;
                <a className="link" href="#">
                  terms and conditions
                </a>
              </p>
              <button type="button" className="btn">
                Submit
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignUp4Html;
