import React, { Fragment } from "react";
import { compose } from "recompose";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Field } from "formik";

import ROUTES from "config/routes";
import withModal from "HOC/withModal";
import Icon, { ICON_NAMES } from "components/Icon";
import Button from "components/Button";
import Input from "components/form/Input";
import Select from "components/form/Select";
import Checkbox from "components/form/Checkbox";
import ChangePasswordForm from "./ChangePasswordForm";

function UserAccountForm(props) {
  const { intl, commonData, modals, openModal, closeModal } = props;

  return (
    <Fragment>
      <div className="data__body">
        <div className="section">
          <div className="section__head">
            <div className="row justify-content-between">
              <div className="col-md-6">
                <div className="section__title">
                  {intl.formatMessage({
                    id: "ui.profile.personal_information"
                  })}
                </div>
              </div>
              <div className="col-auto">
                <Link to={ROUTES.accountAdresses} className="link-popup">
                  <Icon
                    className="link-popup__icon icon"
                    name={ICON_NAMES.pin}
                  />
                  <span className="link-popup__title">
                    {intl.formatMessage({
                      id: "ui.navigation.manage_addresses"
                    })}
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="section__body">
            <div className="row">
              <div className="col-md-4">
                <Field
                  name="firstName.en"
                  placeholder={intl.formatMessage({
                    id: "ui.fields.first_name"
                  })}
                  component={Input}
                />
                {/* <Field
                  name="firstName.ar"
                  placeholder={`${intl.formatMessage({
                    id: "ui.fields.first_name"
                  })} ${intl.formatMessage({
                    id: "ui.fields.ar_tip"
                  })}`}
                  component={Input}
                /> */}
                <Field
                  name="phone"
                  type="tel"
                  disabled
                  placeholder={intl.formatMessage({ id: "ui.fields.phone" })}
                  component={Input}
                />
              </div>
              <div className="col-md-4">
                <Field
                  name="lastName.en"
                  placeholder={intl.formatMessage({
                    id: "ui.fields.last_name"
                  })}
                  component={Input}
                />
                {/* <Field
                  name="lastName.ar"
                  placeholder={`${intl.formatMessage({
                    id: "ui.fields.last_name"
                  })} ${intl.formatMessage({
                    id: "ui.fields.ar_tip"
                  })}`}
                  component={Input}
                /> */}
                <Field
                  name="email"
                  type="email"
                  disabled
                  placeholder={intl.formatMessage({ id: "ui.fields.email" })}
                  maxLength="32"
                  component={Input}
                />
              </div>
              <div className="col-md-4">
                <Field
                  name="gender"
                  placeholder={intl.formatMessage({ id: "ui.fields.gender" })}
                  component={Select}
                  options={commonData.gender}
                />
                <Field
                  name="occupation"
                  placeholder={intl.formatMessage({
                    id: "ui.fields.occupation"
                  })}
                  component={Select}
                  options={commonData.occupation}
                />
                <Field
                  name="aboutSinan"
                  placeholder={intl.formatMessage({
                    id: "ui.fields.about_sinan"
                  })}
                  component={Select}
                  options={commonData.aboutSinan}
                />
                <Field
                  name="whySinan"
                  placeholder={intl.formatMessage({
                    id: "ui.fields.why_sinan"
                  })}
                  component={Select}
                  options={commonData.whySinan}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <Field
                  name="subsriptionEmail"
                  component={Checkbox}
                  placeholder={intl.formatMessage({
                    id: "ui.fields.newsletter_subscription"
                  })}
                />
              </div>
              <div className="col-md-4">
                <Field
                  name="subsriptionSms"
                  component={Checkbox}
                  placeholder={intl.formatMessage({
                    id: "ui.fields.sms_subscription"
                  })}
                />
              </div>
              <div className="col-md-4">
                <Button
                  type="button"
                  width="100"
                  className="btn--light"
                  onClick={() => openModal("changePassword")}
                >
                  {intl.formatMessage({ id: "ui.actions.change_password" })}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChangePasswordForm
        isOpen={modals["changePassword"]}
        onRequestClose={() => closeModal("changePassword")}
      />
    </Fragment>
  );
}

export default compose(
  injectIntl,
  withModal("changePassword")
)(UserAccountForm);
