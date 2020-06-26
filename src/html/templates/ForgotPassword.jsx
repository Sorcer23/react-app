import React from "react";

import DropdownLang from "html/chunks/DropdownLang/";
import { ICON_NAMES } from "components/Icon";
import Input from "components/form/Input";

function ForgotPassword(props) {
  return (
    <div className="wrapper">
      <main class="main main--authorization">
        <section class="authorization">
          <div className="authorization__background"></div>
          <div className=" authorization__inner">
            <div className="authorization__left-col">
              <div className="column-head">
                <DropdownLang />
              </div>
              <div className="column-body">
                <h2 class="title title--light">Welcome Back!</h2>
                <h5 class="authorization__subtitle ">
                  Click here to see your favourite project saved with us.
                </h5>
              </div>
            </div>
            <div className="authorization__right-col">
              {/*@@include('../chunks/btn-back.html')*/}

              <div className="authorization__logo">
                <img src="/img/logo.svg" alt="" />
              </div>
              <div className="quote">
                “Every artist was first an amateur”
                <span class="quote__author">-Ralph Waldo Emerson</span>
              </div>
              <h2 class="title title--dark">Forgot Password?</h2>
              <div className="row">
                <Input name="name" placeholder="Code" className="col-3" />
                <Input
                  name="name"
                  placeholder="Phone Number"
                  className="col-9"
                  icon={ICON_NAMES.phone}
                />
              </div>
              <div className="btn">Continue</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ForgotPassword;
