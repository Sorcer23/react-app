import React, { useEffect } from "react";
import { Field } from "formik";

import Button from "components/Button";
import Input from "components/form/Input";
import Select from "components/form/Select";
import FileUpload from "components/form/FileUpload";
import Textarea from "components/form/Textarea";
import ROUTES from "config/routes";

function AddService(props) {
  const {
    intl,
    isSubmitting: isDraftSaving,
    isRequestPublishLoading,
    isPreparingPreview,
    values,
    commonData,
    serviceId,
    isEdit,
    handleSubmit,
    handleReset,
    getServiceToEdit,
    resetEditingService
  } = props;

  useEffect(() => {
    if (isEdit && serviceId != null) {
      resetEditingService();
      getServiceToEdit(serviceId);
    }

    return () => resetEditingService();
  }, [serviceId]);

  return (
    <main className="main">
      <section className="data">
        <div className="container data__inner">
          <form onSubmit={handleSubmit}>
            <div className="data__head">
              <h1 className="section-title">
                {isEdit
                  ? intl.formatMessage({ id: "ui.navigation.edit_service" })
                  : intl.formatMessage({ id: "ui.navigation.add_service" })}
              </h1>
            </div>

            <div className="data__body">
              <div className="section">
                <div className="section__body">
                  <div className="row">
                    <div className="col-md-4">
                      <Field
                        name="title.en"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.title"
                        })}
                        component={Input}
                      />
                      <Field
                        name="title.ar"
                        placeholder={`${intl.formatMessage({
                          id: "ui.fields.title"
                        })} ${intl.formatMessage({
                          id: "ui.fields.ar_tip"
                        })}`}
                        component={Input}
                      />
                      <Field
                        name="serviceCategoryId"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.category"
                        })}
                        options={commonData.categories}
                        component={Select}
                        onChange={value => {
                          if (values.serviceCategoryId !== value)
                            props.setFieldValue("serviceTypeId", "");
                        }}
                      />
                      <Field
                        name="serviceTypeId"
                        disabled={!values.serviceCategoryId}
                        placeholder={
                          values.categoryId
                            ? intl.formatMessage({
                                id: "ui.fields.service_type"
                              })
                            : `${intl.formatMessage({
                                id: "ui.fields.service_type"
                              })} (${intl.formatMessage({
                                id: "ui.fields.select_category"
                              })})`
                        }
                        options={commonData.services.filter(
                          service =>
                            service.categoryId === values.serviceCategoryId
                        )}
                        component={Select}
                      />
                    </div>
                    <div className="col-md-4">
                      <Field
                        name="description.en"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.description"
                        })}
                        component={Textarea}
                      />
                      <Field
                        name="description.ar"
                        placeholder={`${intl.formatMessage({
                          id: "ui.fields.description"
                        })} ${intl.formatMessage({
                          id: "ui.fields.ar_tip"
                        })}`}
                        component={Textarea}
                      />
                    </div>
                    <div className="col-md-4">
                      <Field
                        name="priceUnit"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.price_unit"
                        })}
                        options={commonData.priceUnit}
                        component={Select}
                      />
                      <Field
                        name="price"
                        type="tel"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.price"
                        })}
                        component={Input}
                      />
                      <Field
                        name="colors"
                        isMulti
                        placeholder={intl.formatMessage({
                          id: "ui.fields.colors"
                        })}
                        options={commonData.colors}
                        component={Select}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <Field
                      name="images"
                      entity="serviceImages"
                      placeholder={intl.formatMessage({
                        id: "ui.fields.add_image"
                      })}
                      component={FileUpload}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="data__bottom">
              <div className="buttons-wrap">
                <Button
                  className="btn--light"
                  to={ROUTES.providerServices}
                  disabled={
                    isDraftSaving ||
                    isRequestPublishLoading ||
                    isPreparingPreview
                  }
                >
                  {intl.formatMessage({ id: "ui.actions.cancel" })}
                </Button>

                <Button
                  disabled={isRequestPublishLoading || isPreparingPreview}
                  showLoader={
                    isDraftSaving &&
                    !isRequestPublishLoading &&
                    !isPreparingPreview
                  }
                  onClick={async () => {
                    await props.setFieldValue("submitType", "save");
                    props.handleSubmit();
                  }}
                >
                  {intl.formatMessage({ id: "ui.actions.save_draft" })}
                </Button>

                <Button
                  disabled={isDraftSaving || isPreparingPreview}
                  showLoader={isRequestPublishLoading}
                  onClick={async () => {
                    await props.setFieldValue("submitType", "publish");
                    props.handleSubmit();
                  }}
                >
                  {intl.formatMessage({ id: "ui.actions.request_for_publish" })}
                </Button>

                <Button
                  disabled={isDraftSaving || isRequestPublishLoading}
                  showLoader={isPreparingPreview}
                  onClick={async () => {
                    await props.setFieldValue("submitType", "preview");
                    props.handleSubmit();
                  }}
                >
                  {intl.formatMessage({ id: "ui.actions.preview" })}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AddService;
