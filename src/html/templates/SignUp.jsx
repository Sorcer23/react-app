import React from "react";

import DropdownLang from "html/chunks/DropdownLang/";
import Input from "components/form/Input";
import Icon, { ICON_NAMES } from "components/Icon";

function SignUpHtml(props) {
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
                <h2 className="title title--light">Welcome Back!</h2>
                <h5 className="authorization__subtitle">
                  Click here to see your favourite project saved with us.
                </h5>
                <div className="btn">Sign In</div>
              </div>
            </div>
            <div className="authorization__right-col">
              <div className="authorization-steps">
                <span className="active">1</span>/ <sup>4</sup>
              </div>
              <div className="authorization__logo">
                <img src="/img/logo.svg" alt="" />
              </div>
              <div className="quote">
                “Every artist was first an amateur”
                <span className="quote__author">-Ralph Waldo Emerson</span>
              </div>
              <h2 className="title title--dark">New Here?</h2>
              <div className="row">
                <Input name="name" placeholder="Code" className="col-3" />
                <Input
                  name="name"
                  placeholder="Phone Number"
                  className="col-9"
                  icon={ICON_NAMES.phone}
                />
              </div>

              <div className="btn authorization__btn">Continue</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignUpHtml;
