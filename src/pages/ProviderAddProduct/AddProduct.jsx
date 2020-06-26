import React, { useEffect } from "react";
import { Field } from "formik";

import Button from "components/Button";
import Input from "components/form/Input";
import Textarea from "components/form/Textarea";
import DateInput from "components/form/DateInput";
import Select from "components/form/Select";
import FileUpload from "components/form/FileUpload";
import Checkbox from "components/form/Checkbox";
import SelectProviderProducts from "./SelectProviderProducts";
import ROUTES from "config/routes";

function AddProduct(props) {
  const {
    intl,
    isSubmitting: isDraftSaving,
    isRequestPublishLoading,
    isPreparingPreview,
    commonData,
    values,
    productEntities,
    productId,
    isEdit,
    handleSubmit,
    handleReset,
    getProductToEdit,
    resetEditingProduct
  } = props;

  useEffect(() => {
    if (isEdit && productId != null) {
      resetEditingProduct();
      getProductToEdit(productId);
    }

    return () => resetEditingProduct();
  }, [productId]);

  return (
    <main className="main">
      <section className="data">
        <div className="container data__inner">
          <form onSubmit={handleSubmit}>
            <div className="data__head">
              <h1 className="section-title">
                {isEdit
                  ? intl.formatMessage({ id: "ui.navigation.edit_product" })
                  : intl.formatMessage({ id: "ui.navigation.add_product" })}
              </h1>
            </div>

            <div className="data__body">
              <div className="section">
                <div className="section__body">
                  <div className="row">
                    <div className="col-md-4">
                      <Field
                        name="title.en"
                        component={Input}
                        placeholder={intl.formatMessage({
                          id: "ui.fields.title"
                        })}
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
                        name="categoryId"
                        options={commonData.productCategories}
                        placeholder={intl.formatMessage({
                          id: "ui.fields.category"
                        })}
                        component={Select}
                        onChange={value => {
                          if (values.categoryId !== value)
                            props.setFieldValue("subCategoryId", "");
                        }}
                      />
                      <Field
                        name="subCategoryId"
                        disabled={!values.categoryId}
                        options={commonData.productSubCategories.filter(
                          subCat => subCat.categoryId === values.categoryId
                        )}
                        placeholder={
                          values.categoryId
                            ? intl.formatMessage({
                                id: "ui.fields.sub_category"
                              })
                            : `${intl.formatMessage({
                                id: "ui.fields.sub_category"
                              })} (${intl.formatMessage({
                                id: "ui.fields.select_category"
                              })})`
                        }
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
                        name="brand"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.brand"
                        })}
                        component={Input}
                      />
                      <Field
                        name="madeIn"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.made_in"
                        })}
                        component={Input}
                      />
                      <Field
                        name="material"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.material"
                        })}
                        component={Input}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <Field
                      name="images"
                      entity="productImages"
                      placeholder={intl.formatMessage({ id: "ui.fields.add" })}
                      component={FileUpload}
                    />
                  </div>

                  <div className="row">
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
                        placeholder={intl.formatMessage({
                          id: "ui.fields.price"
                        })}
                        type="tel"
                        maxLength="12"
                        component={Input}
                      />
                      <Field
                        name="wasPrice"
                        type="tel"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.old_price"
                        })}
                        maxLength="12"
                        component={Input}
                      />
                      <Field
                        name="offerPrice"
                        type="tel"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.offer_price"
                        })}
                        maxLength="12"
                        component={Input}
                      />
                      <Field
                        name="offerToDate"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.offer_to_date"
                        })}
                        component={DateInput}
                      />
                    </div>

                    <div className="col-md-4">
                      <Field
                        name="colors"
                        isMulti
                        placeholder={intl.formatMessage({
                          id: "ui.fields.colors"
                        })}
                        options={commonData.colors}
                        component={Select}
                      />
                      <Field
                        name="dimensions"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.dimensions"
                        })}
                        component={Input}
                      />
                      <Field
                        name="recommendedSize"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.recommended_size"
                        })}
                        component={Input}
                      />
                      <Field
                        name="unitSet"
                        type="tel"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.unit_set"
                        })}
                        component={Input}
                      />
                      {/* <Field
                        name="availability"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.availability"
                        })}
                        component={Checkbox}
                      /> */}
                      <Field
                        name="delivery"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.delivery"
                        })}
                        component={Checkbox}
                      />
                    </div>

                    <div className="col-md-4">
                      <Field
                        name="deliveryOption"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.delivery_options"
                        })}
                        options={commonData.deliveryOptions}
                        component={Select}
                      />
                      <Field
                        name="deliveryDays"
                        type="tel"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.delivery_days"
                        })}
                        component={Input}
                      />
                      <Field
                        name="deliveryPrice"
                        type="tel"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.delivery_price"
                        })}
                        maxLength="12"
                        component={Input}
                      />
                      <Field
                        name="deliveryDescription.en"
                        placeholder={intl.formatMessage({
                          id: "ui.fields.delivery_description"
                        })}
                        component={Textarea}
                      />
                      <Field
                        name="deliveryDescription.ar"
                        placeholder={`${intl.formatMessage({
                          id: "ui.fields.delivery_description"
                        })} ${intl.formatMessage({
                          id: "ui.fields.ar_tip"
                        })}`}
                        component={Textarea}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="section-subtitle">
                        {intl.formatMessage({ id: "ui.products.also_buy" })}
                      </div>
                    </div>
                    <Field
                      name="products"
                      placeholder={intl.formatMessage({ id: "ui.fields.add" })}
                      listPlaceholder={intl.formatMessage({
                        id: "ui.actions.select"
                      })}
                      component={SelectProviderProducts}
                      initialEntities={productEntities}
                      exceptValue={parseInt(productId)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="data__bottom">
              <div className="buttons-wrap">
                <Button
                  className="btn--light"
                  to={ROUTES.providerProducts}
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
                  onClick={async () => {
                    await props.setFieldValue("submitType", "publish");
                    props.handleSubmit();
                  }}
                  showLoader={isRequestPublishLoading}
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

export default AddProduct;
