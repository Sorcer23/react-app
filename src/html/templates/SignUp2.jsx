import React from "react";

import Icon, { ICON_NAMES } from "components/Icon";
import Input from "components/form/Input";

function SignUp2Html(props) {
  return (
    <div className="wrapper">
      <main className="main main--authorization">
        <section className="authorization">
          <div className="authorization__background"></div>

          <div className="popup otp" id="verification">
            <button className="popup__close">
              <Icon name={ICON_NAMES.close} />
            </button>{" "}
            <div className="popup__head">
              <div className="popup__title">Verification</div>
            </div>
            <div className="popup__body">
              <form>
                <div className="otp__content">
                  <div className="otp__text text-center">
                    <p>
                      {" "}
                      Verify your mobile number by entering the OTP you have
                      recieved on your registered mobile number
                    </p>
                    <p>
                      +9747782298122{" "}
                      <a href="#" className="link link--width-100">
                        Edit number
                      </a>
                    </p>
                  </div>
                  <div className="otp__inputs">
                    <input className="otp__input" type="number" maxLength="1" />
                    <input className="otp__input" type="number" maxLength="1" />
                    <input className="otp__input" type="number" maxLength="1" />
                    <input className="otp__input" type="number" maxLength="1" />
                  </div>
                  <button className="btn" type="submit">
                    Submit
                  </button>
                  <div className="otp__timer-wrap">
                    <div className="otp__timer">
                      <span>30</span>
                      <span>sec remaining</span>
                    </div>
                    <button className="otp__reset">Resend</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className=" authorization__inner">
            <div className="authorization__left-col">
              <div className="column-head"></div>
              <div className="column-body">
                <h5 className="authorization__subtitle vertical-center">
                  Enter your mobile number for better experience
                </h5>
              </div>
            </div>
            <div className="authorization__right-col column-smaller">
              <div className="authorization-steps">
                <span className="active">2</span>/ <sup>4</sup>
              </div>
              <div className="authorization__logo">
                <img src="/img/logo.svg" alt="" />
              </div>
              <div className="quote">
                “Imagination is everything. It is the preview of life’s coming
                attractions”
                <span className="quote__author">-Albert Einstein</span>
              </div>
              <h2 className="title title--dark">Enter your Email Id</h2>
              <Input
                name="name"
                placeholder="e-mail"
                className=""
                icon={ICON_NAMES.mail}
              />
              <Input
                name="name"
                placeholder="Name"
                className=""
                icon={ICON_NAMES.userDark}
              />

              <div className="btn authorization__btn">Continue</div>
              <div className="btn btn--light">Skip</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignUp2Html;
