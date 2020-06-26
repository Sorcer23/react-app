import React from "react";

import DropdownLang from "html/chunks/DropdownLang/";
import Icon, { ICON_NAMES } from "components/Icon";
import Input from "components/form/Input";

function NewPassword(props) {
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
                <h2 className="title title--light">New User?</h2>
                <h5 className="authorization__subtitle ">
                  Building your next project with Sinan, click below
                </h5>
              </div>
            </div>
            <div className="authorization__right-col column-smaller">
              {/*@@include('../chunks/btn-back.html')*/}
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
              <h2 className="title title--dark">New Password</h2>
              <Input
                name="name"
                placeholder="Password"
                className=""
                icon={ICON_NAMES.lock}
              />
              <div className="btn">Continue</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NewPassword;
