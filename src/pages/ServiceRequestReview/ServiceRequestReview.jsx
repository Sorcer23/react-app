import React from "react";
import { Field } from "formik";

import Icon, { ICON_NAMES } from "components/Icon";
import Button from "components/Button";
import Rating from "components/form/Rating";
import Textarea from "components/form/Textarea";
import ModalAction from "components/modals/ModalAction";

const ServiceRequestReview = props => {
  const {
    serviceRequest,
    modals,
    intl,
    handleSubmit,
    onModalSuccessSendCLose
  } = props;

  return (
    <main className="main">
      <section className="dashboard">
        <div className="container">
          <div className="data__head">
            <h1 className="section-title">
              {intl.formatMessage({
                id: "ui.navigation.service_request_review"
              })}
            </h1>
          </div>
          <div className="data__body">
            <form className="feedback" onSubmit={handleSubmit}>
              <div className="feedback__row">
                <div className="feedback__title">
                  {intl.formatMessage({
                    id: "ui.requests.rate_provider_title"
                  })}
                </div>
                <div className="feedback__text">
                  {intl.formatMessage({
                    id: "ui.requests.rate_provider_desc"
                  })}
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-6">
                  <Field
                    name="review"
                    component={Textarea}
                    placeholder={intl.formatMessage({
                      id: "ui.fields.leave_review"
                    })}
                  />
                </div>
              </div>

              <Field name="rating" component={Rating} />

              {/* <div className="feedback__row">
                <div className="feedback__title">Bill Attachment</div>
                <div className="feedback__text">
                  Get Sinan HQ Points, on sharing picture of Purchase Bill.
                </div>
              </div> */}
              <div className="row justify-content-center">
                <div className="col-sm-10 col-md-4 col-lg-3">
                  {/* <Field
                    name="feedbackFile"
                    component={FileUpload}
                    mode="dev"
                    type="feedback"
                    placeholder="Attach Bill"
                    iconAdd={ICON_NAMES.camera}
                  /> */}
                  <Button
                    type="submit"
                    className="btn--width-100"
                    showLoader={serviceRequest.isSending}
                  >
                    {intl.formatMessage({ id: "ui.actions.submit" })}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <ModalAction
        isOpen={modals["successSend"]}
        params={{
          type: "success",
          message: intl.formatMessage({
            id: "ui.notifications.success.service_request_review"
          }),
          onAfterClose: onModalSuccessSendCLose
        }}
      ></ModalAction>
    </main>
  );
};

export default ServiceRequestReview;
