import React from "react";

import Icon, { ICON_NAMES } from "components/Icon";
import Button from "components/Button";
import Input from "components/form/Input";
import Textarea from "components/form/Textarea";
import { Field } from "formik";

const ContactUs = props => {
  const { intl, isSubmitting, handleSubmit } = props;

  return (
    <main className="main">
      <section className="contact-us">
        <form className="container" onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="row contact-us__inner">
                <div className="col-md-5 d-flex">
                  <div className="contact-us__info">
                    <div className="contact-us__title">
                      {intl.formatMessage({ id: "ui.navigation.contact_us" })}
                    </div>
                    <div className="contact-us__info-list">
                      <div className="contact-list">
                        <div className="contact-link">
                          <Icon
                            className="contact-link__icon"
                            name={ICON_NAMES.pin}
                          />
                          <span className="contact-link__title">
                            abc Park Avenue Street, US-232323
                          </span>
                        </div>
                        <a
                          href="mailto:abcd@gmail.com"
                          className="contact-link"
                        >
                          <Icon
                            className="contact-link__icon"
                            name={ICON_NAMES.mail}
                          />
                          <span className="contact-link__title">
                            abcd@gmail.com
                          </span>
                        </a>
                        <a href="tel:+9181781761634" className="contact-link">
                          <Icon
                            className="contact-link__icon"
                            name={ICON_NAMES.phone}
                          />
                          <span className="contact-link__title">
                            +918 1781761634
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 d-flex">
                  <div className="contact-us__form">
                    <div className="contact-us__title">
                      {intl.formatMessage({ id: "ui.feedback.title" })}
                    </div>
                    <Field
                      name="name"
                      icon={ICON_NAMES.userDark}
                      placeholder={intl.formatMessage({
                        id: "ui.fields.name"
                      })}
                      component={Input}
                    />
                    <Field
                      name="email"
                      type="email"
                      icon={ICON_NAMES.mail}
                      placeholder={intl.formatMessage({
                        id: "ui.fields.email"
                      })}
                      component={Input}
                    />
                    <Field
                      name="message"
                      placeholder={intl.formatMessage({
                        id: "ui.fields.message"
                      })}
                      component={Textarea}
                    />
                    <div className="row  justify-content-center justify-content-md-end">
                      <div className="col-auto"></div>
                    </div>
                    <Button
                      type="submit"
                      className="btn--width-100"
                      showLoader={isSubmitting}
                    >
                      {intl.formatMessage({ id: "ui.actions.submit" })}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ContactUs;
