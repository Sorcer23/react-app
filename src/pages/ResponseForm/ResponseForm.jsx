import React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Field, withFormik } from "formik";
import { compose } from "recompose";

import AppDataModule from "modules/appData";
import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import Icon, { ICON_NAMES } from "components/Icon";
import FileUpload from "components/form/FileUpload";
import Button from "components/Button";
import Input from "components/form/Input";
import Textarea from "components/form/Textarea";
import Select from "components/form/Select";

const ResponseForm = props => {
  const { intl, commonData } = props;

  return (
    <main className="main">
      <section>
        <div className="container">
          <div className="data__head">
            <h1 className="section-title">
              {intl.formatMessage({ id: "ui.actions.submit_response" })}}
            </h1>
          </div>
          <div className="data__body">
            <div className="response-form">
              <div className="response-form__inner">
                <div className="row">
                  <div className="col-md-4">
                    <div className="response-form__description">
                      <div className="response-form__text">
                        <b>{intl.formatMessage({ id: "ui.fields.query" })}</b>:
                        Luxury Appartment, fit for palm island At vero eos et
                        accusamus et iusto odio dignissimos ducimus qui
                        blanditiis praesentium voluptatum deleniti atque
                        corrupti quos dolores et quas molestias excepturi sint
                        occaec
                      </div>
                      <Field
                        name="description"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.description"
                        })}
                        component={Textarea}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="col-12 response-form__form">
                      <div className="row">
                        <div className="col-md-6">
                          <Field
                            name="priceUnit"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.price_unit"
                            })}
                            options={commonData.priceUnit}
                            component={Select}
                          />
                          <Field
                            name="some2"
                            placeholder="Bid (QRS)"
                            component={Input}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="some"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.validity_date"
                            })}
                            component={Input}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <h3 className="section-subtitle">
                            {intl.formatMessage({
                              id: "ui.actions.upload_capture_pictures"
                            })}
                          </h3>
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="companyPic"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.add_photo"
                            })}
                            component={FileUpload}
                          />
                        </div>
                        <div className="col-md-6">
                          <Field
                            name="companyPic"
                            placeholder={intl.formatMessage({
                              id: "ui.fields.add_photo"
                            })}
                            component={FileUpload}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-end">
                <div className="col-auto">
                  <Button type="submit" className="response-form__btn">
                    {intl.formatMessage({
                      id: "ui.actions.request_for_update"
                    })}
                  </Button>
                </div>
                <div className="col-auto">
                  <Button type="submit" className="response-form__btn">
                    {intl.formatMessage({ id: "ui.actions.submit_details" })}
                  </Button>
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
  withFormik({
    name: "ResponseForm"
  }),
  passAuthUser,
  pageLayout(),
  injectIntl,
  connect(state => {
    return {
      commonData: AppDataModule.listSelector(state)("priceUnit")
    };
  })
)(ResponseForm);
