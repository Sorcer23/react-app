import React, { Fragment } from "react";
import { Field } from "formik";
import { injectIntl } from "react-intl";

import Select from "components/form/Select";
import Input from "components/form/Input";
import FileUpload from "components/form/FileUpload";
import Textarea from "components/form/Textarea";
import AddressInput from "components/form/AddressInput/AddressInput";
import Icon, { ICON_NAMES } from "components/Icon";

function ProviderAccountForm(props) {
  const { intl, commonData } = props;

  return (
    <Fragment>
      <div className="section">
        <div className="section__head">
          <div className="section__title">
            {intl.formatMessage({ id: "ui.profile.business_information" })}
          </div>
        </div>
        <div className="section__body">
          <div className="row">
            <div className="col-md-4">
              <Field
                name="profilePic"
                placeholder={intl.formatMessage({
                  id: "ui.fields.profile_pic"
                })}
                upperPlaceholder
                component={FileUpload}
              />
            </div>
            <div className="col-md-4">
              <Field
                name="companyPic"
                placeholder={intl.formatMessage({
                  id: "ui.fields.company_profile"
                })}
                upperPlaceholder
                component={FileUpload}
              />
            </div>
            <div className="col-md-4">
              <Field
                name="cr"
                placeholder={intl.formatMessage({ id: "ui.fields.copy_of_cr" })}
                upperPlaceholder
                component={FileUpload}
              />
            </div>
            <div className="col-md-4">
              <Field
                name="workPermit"
                placeholder={intl.formatMessage({
                  id: "ui.fields.copy_of_work_permit"
                })}
                upperPlaceholder
                component={FileUpload}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Field
                name="businessName.en"
                placeholder={intl.formatMessage({
                  id: "ui.fields.business_name"
                })}
                component={Input}
              />
              <Field
                name="businessName.ar"
                placeholder={`${intl.formatMessage({
                  id: "ui.fields.business_name"
                })}  ${intl.formatMessage({
                  id: "ui.fields.ar_tip"
                })}`}
                component={Input}
              />
              <Field
                name="businessEmail"
                type="email"
                placeholder={intl.formatMessage({
                  id: "ui.fields.business_email"
                })}
                component={Input}
              />
              <Field
                name="contactNumber"
                placeholder={intl.formatMessage({
                  id: "ui.fields.contact_number"
                })}
                component={Input}
              />
              <Field
                name="altNumber"
                placeholder={intl.formatMessage({
                  id: "ui.fields.alternate_number"
                })}
                component={Input}
              />
              <Field
                name="faxNumber"
                placeholder={intl.formatMessage({ id: "ui.fields.fax_number" })}
                component={Input}
              />
            </div>
            <div className="col-md-4">
              <Field
                name="companyWebsite"
                placeholder={intl.formatMessage({
                  id: "ui.fields.company_website"
                })}
                component={Input}
              />
              <Field
                name="professionType"
                placeholder={intl.formatMessage({
                  id: "ui.fields.type_of_profession"
                })}
                component={Select}
                options={commonData.proffesionTypes}
              />
              <Field
                name="professionalExperience"
                placeholder={intl.formatMessage({
                  id: "ui.fields.professional_experience"
                })}
                component={Input}
              />
              <Field
                name="categoryId"
                placeholder={intl.formatMessage({ id: "ui.fields.category" })}
                component={Select}
                options={commonData.categories}
              />
              <Field
                name="services"
                placeholder={intl.formatMessage({
                  id: "ui.fields.select_services"
                })}
                component={Select}
                isMulti
                options={commonData.services}
              />
              <Field
                name="locations"
                placeholder={intl.formatMessage({
                  id: "ui.fields.locations"
                })}
                component={AddressInput}
              />
            </div>
            <div className="col-md-4">
              <Field
                name="businessIntro.en"
                placeholder={intl.formatMessage({
                  id: "ui.fields.business_introduction"
                })}
                component={Textarea}
              />
              <Field
                name="businessIntro.ar"
                placeholder={`${intl.formatMessage({
                  id: "ui.fields.business_introduction"
                })}  ${intl.formatMessage({
                  id: "ui.fields.ar_tip"
                })}`}
                component={Textarea}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section__head">
          <div className="section__title">
            {intl.formatMessage({ id: "ui.profile.social_information" })}
          </div>
        </div>
        <div className="section__body">
          <div className="row">
            <div className="col-md-4">
              <Field
                name="fbLink"
                placeholder={intl.formatMessage({
                  id: "ui.fields.facebook_link"
                })}
                component={Input}
              />
            </div>
            <div className="col-md-4">
              <Field
                name="scLink"
                placeholder={intl.formatMessage({
                  id: "ui.fields.snapchat_link"
                })}
                component={Input}
              />
            </div>
            <div className="col-md-4">
              <Field
                name="instLink"
                placeholder={intl.formatMessage({
                  id: "ui.fields.instagram_link"
                })}
                component={Input}
              />
            </div>
            <div className="col-md-4">
              <Field
                name="twLink"
                placeholder={intl.formatMessage({
                  id: "ui.fields.twitter_link"
                })}
                component={Input}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section__head">
          <div className="section__title">
            {intl.formatMessage({ id: "ui.profile.feature_work_samples" })}
          </div>
        </div>
        <div className="section__body">
          <div className="row">
            <Field
              name="workSamples"
              placeholder={intl.formatMessage({ id: "ui.fields.add" })}
              component={FileUpload}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default injectIntl(ProviderAccountForm);
