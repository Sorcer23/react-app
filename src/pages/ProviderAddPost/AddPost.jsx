import React, { useEffect } from "react";
import { Field } from "formik";
import { Link } from "react-router-dom";

import ROUTES from "config/routes";
import Button from "components/Button";
import Input from "components/form/Input";
import Select from "components/form/Select";
import Textarea from "components/form/Textarea";
import FileUpload from "components/form/FileUpload";
import SelectProviderServices from "pages/ProviderAddService/SelectProviderServices";
import SelectProviderProducts from "pages/ProviderAddProduct/SelectProviderProducts";

function AddPost(props) {
  const {
    isEdit,
    intl,
    postId,
    productEntities,
    serviceEntities,
    isPreparingPreview,
    commonData,
    isSubmitting: isDraftSaving,
    isRequestPublishLoading,
    handleSubmit,
    handleReset,
    getPostToEdit,
    resetEditingPost
  } = props;

  useEffect(() => {
    if (isEdit && postId != null) {
      resetEditingPost();
      getPostToEdit(postId);
    }

    return () => resetEditingPost();
  }, [postId]);

  return (
    <main className="main">
      <section className="data">
        <div className="container data__inner">
          <form onSubmit={handleSubmit}>
            <div className="data__head">
              <h1 className="section-title">
                {isEdit
                  ? intl.formatMessage({ id: "ui.navigation.edit_post" })
                  : intl.formatMessage({ id: "ui.navigation.add_post" })}
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
                        name="description.en"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.short_description"
                        })}
                        component={Textarea}
                      />
                      <Field
                        name="description.ar"
                        placeholder={`${intl.formatMessage({
                          id: "ui.fields.short_description"
                        })} ${intl.formatMessage({
                          id: "ui.fields.ar_tip"
                        })}`}
                        component={Textarea}
                      />
                    </div>

                    <div className="col-md-4">
                      <Field
                        name="fullDescription.en"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.full_description"
                        })}
                        component={Textarea}
                        size="lg"
                      />
                      <Field
                        name="fullDescription.ar"
                        placeholder={`${intl.formatMessage({
                          id: "ui.fields.full_description"
                        })} ${intl.formatMessage({
                          id: "ui.fields.ar_tip"
                        })}`}
                        component={Textarea}
                        size="lg"
                      />
                    </div>

                    <div className="col-md-4">
                      <Field
                        name="spaceTypeId"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.space_type"
                        })}
                        options={commonData.spaceTypes}
                        component={Select}
                      />
                      <Field
                        name="styleId"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.style"
                        })}
                        options={commonData.style}
                        component={Select}
                      />
                      <Field
                        name="budgetId"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.budget"
                        })}
                        options={commonData.budget}
                        component={Select}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <Field
                      name="images"
                      entity="postImages"
                      placeholder={intl.formatMessage({
                        id: "ui.fields.add_image"
                      })}
                      component={FileUpload}
                    />
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="section-subtitle">
                        {intl.formatMessage({ id: "ui.actions.add_products" })}
                      </div>
                    </div>
                    <Field
                      name="products"
                      placeholder={intl.formatMessage({ id: "ui.fields.add" })}
                      listPlaceholder={intl.formatMessage({
                        id: "ui.actions.select"
                      })}
                      component={SelectProviderProducts}
                      maxSize={10}
                      initialEntities={productEntities}
                    />
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="section-subtitle">
                        {intl.formatMessage({ id: "ui.actions.add_services" })}
                      </div>
                    </div>
                    <Field
                      name="services"
                      placeholder={intl.formatMessage({ id: "ui.fields.add" })}
                      listPlaceholder={intl.formatMessage({
                        id: "ui.actions.select"
                      })}
                      component={SelectProviderServices}
                      maxSize={10}
                      initialEntities={serviceEntities}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="data__bottom">
              <div className="buttons-wrap">
                <Button
                  to={ROUTES.providerPosts}
                  className="btn--light"
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

export default AddPost;
