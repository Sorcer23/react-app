import React from "react";

import { Field, withFormik } from "formik";
import Select from "components/form/Select";
import Icon, { ICON_NAMES } from "components/Icon";

function SPProductListHtml(props) {
  return (
    <div className="wrapper">
      <main className="main">
        <section className="data">
          <div className="container data__inner">
            <form action="">
              <div className="data__head">
                <h1 className="section-text">(SP) Product List</h1>
              </div>
              <div className="data__body">
                <div className="section">
                  <div className="section__body">
                    <div className="row filter-bar justify-content-between">
                      <div className="col-md-7 ">
                        <div className="row justify-content-between">
                          <div className="col-auto">Filter by</div>
                          <div className="col-sm-6 col-md-4 col-lg-5">
                            <Field
                              name="caregory"
                              placeholder="Caregory"
                              component={Select}
                              options={[{ value: 0, label: "Option 1" }]}
                            />
                          </div>
                          <div className="col-sm-6  col-md-4 col-lg-5">
                            <Field
                              name="filter"
                              placeholder="Subcaregory"
                              component={Select}
                              options={[
                                { value: 0, label: "Option 1" },
                                { value: 1, label: "Option 2" }
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 col-lg-4">
                        <div className="row">
                          <div className="col-md-auto">Sort by</div>
                          <div className="col-md-9">
                            <Field
                              name="sort"
                              placeholder="Price, Date, Name"
                              component={Select}
                              options={[
                                { value: 0, label: "Price" },
                                { value: 1, label: "Date" },
                                { value: 2, label: "Name" }
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row data-row">
                      <div className="col-auto id-column">Id</div>

                      <div className="col  visible-mobile">
                        <div className="data-title data-title--mobile">
                          Title
                        </div>
                      </div>
                      <div className="data-column data-column--large col-12 col-md">
                        <div className="row">
                          <div className="col-sm-2 col-md-2">
                            <div className="data-image">
                              <img src="/img/example.png" alt="" />
                            </div>
                          </div>
                          <div className="data-column col-6 col-sm-3 col-md-2">
                            <div className="data-title">Title</div>
                            <div className="data-subtitle">Category</div>
                            <div className="data-subtitle">Price</div>
                          </div>
                          <div className="data-column col-6 col-sm-2">
                            <div className="data-subtitle">Subcategory</div>
                            <div className="data-subtitle">Was Price</div>
                          </div>
                          <div className="data-column col-6 col-sm-2">
                            <div className="data-subtitle">Quantity</div>
                            <div className="data-subtitle">Offer Price</div>
                          </div>
                          <div className="data-column col-6 col-sm-2">
                            <div className="data-subtitle">In Stock</div>
                            <div className="data-subtitle">Published</div>
                          </div>
                        </div>
                      </div>
                      <div className="column-menu col-auto  col-md-auto">
                        <button className="button-option" type="button">
                          <Icon name={ICON_NAMES.dots} />
                        </button>
                      </div>
                    </div>
                    <div className="row data-row">
                      <div className="col-auto id-column">Id</div>

                      <div className="col  visible-mobile">
                        <div className="data-title data-title--mobile">
                          Title
                        </div>
                      </div>
                      <div className="data-column data-column--large col-12 col-md">
                        <div className="row">
                          <div className="col-sm-2 col-md-2">
                            <div className="data-image">
                              <img src="/img/example.png" alt="" />
                            </div>
                          </div>
                          <div className="data-column col-6 col-sm-3 col-md-2">
                            <div className="data-title">Title</div>
                            <div className="data-subtitle">Category</div>
                            <div className="data-subtitle">Price</div>
                          </div>
                          <div className="data-column col-6 col-sm-2">
                            <div className="data-subtitle">Subcategory</div>
                            <div className="data-subtitle">Was Price</div>
                          </div>
                          <div className="data-column col-6 col-sm-2">
                            <div className="data-subtitle">Quantity</div>
                            <div className="data-subtitle">Offer Price</div>
                          </div>
                          <div className="data-column col-6 col-sm-2">
                            <div className="data-subtitle">In Stock</div>
                            <div className="data-subtitle">Published</div>
                          </div>
                        </div>
                      </div>
                      <div className="column-menu col-auto  col-md-auto">
                        <button className="button-option" type="button">
                          <Icon name={ICON_NAMES.dots} />
                        </button>
                      </div>
                    </div>
                    <div className="row data-row">
                      <div className="col-auto id-column">Id</div>

                      <div className="col  visible-mobile">
                        <div className="data-title data-title--mobile">
                          Title
                        </div>
                      </div>
                      <div className="data-column data-column--large col-12 col-md">
                        <div className="row">
                          <div className="col-sm-2 col-md-2">
                            <div className="data-image">
                              <img src="/img/example.png" alt="" />
                            </div>
                          </div>
                          <div className="data-column col-6 col-sm-3 col-md-2">
                            <div className="data-title">Title</div>
                            <div className="data-subtitle">Category</div>
                            <div className="data-subtitle">Price</div>
                          </div>
                          <div className="data-column col-6 col-sm-2">
                            <div className="data-subtitle">Subcategory</div>
                            <div className="data-subtitle">Was Price</div>
                          </div>
                          <div className="data-column col-6 col-sm-2">
                            <div className="data-subtitle">Quantity</div>
                            <div className="data-subtitle">Offer Price</div>
                          </div>
                          <div className="data-column col-6 col-sm-2">
                            <div className="data-subtitle">In Stock</div>
                            <div className="data-subtitle">Published</div>
                          </div>
                        </div>
                      </div>
                      <div className="column-menu col-auto  col-md-auto">
                        <button className="button-option" type="button">
                          <Icon name={ICON_NAMES.dots} />
                        </button>
                      </div>
                    </div>
                    <div className="row data-row">
                      <div className="col-auto id-column">Id</div>

                      <div className="col  visible-mobile">
                        <div className="data-title data-title--mobile">
                          Title
                        </div>
                      </div>
                      <div className="data-column data-column--large col-12 col-md">
                        <div className="row">
                          <div className="col-sm-2 col-md-2">
                            <div className="data-image">
                              <img src="/img/example.png" alt="" />
                            </div>
                          </div>
                          <div className="data-column col-6 col-sm-3 col-md-2">
                            <div className="data-title">Title</div>
                            <div className="data-subtitle">Category</div>
                            <div className="data-subtitle">Price</div>
                          </div>
                          <div className="data-column col-6 col-sm-2">
                            <div className="data-subtitle">Subcategory</div>
                            <div className="data-subtitle">Was Price</div>
                          </div>
                          <div className="data-column col-6 col-sm-2">
                            <div className="data-subtitle">Quantity</div>
                            <div className="data-subtitle">Offer Price</div>
                          </div>
                          <div className="data-column col-6 col-sm-2">
                            <div className="data-subtitle">In Stock</div>
                            <div className="data-subtitle">Published</div>
                          </div>
                        </div>
                      </div>
                      <div className="column-menu col-auto  col-md-auto">
                        <button className="button-option" type="button">
                          <Icon name={ICON_NAMES.dots} />
                        </button>
                      </div>
                    </div>
                    <div className="row data-row">
                      <div className="col-auto id-column">Id</div>

                      <div className="col  visible-mobile">
                        <div className="data-title data-title--mobile">
                          Title
                        </div>
                      </div>
                      <div className="data-column data-column--large col-12 col-md">
                        <div className="row">
                          <div className="col-sm-2 col-md-2">
                            <div className="data-image">
                              <img src="/img/example.png" alt="" />
                            </div>
                          </div>
                          <div className="data-column col-6 col-sm-3 col-md-2">
                            <div className="data-title">Title</div>
                            <div className="data-subtitle">Category</div>
                            <div className="data-subtitle">Price</div>
                          </div>
                          <div className="data-column col-6 col-sm-2">
                            <div className="data-subtitle">Subcategory</div>
                            <div className="data-subtitle">Was Price</div>
                          </div>
                          <div className="data-column col-6 col-sm-2">
                            <div className="data-subtitle">Quantity</div>
                            <div className="data-subtitle">Offer Price</div>
                          </div>
                          <div className="data-column col-6 col-sm-2">
                            <div className="data-subtitle">In Stock</div>
                            <div className="data-subtitle">Published</div>
                          </div>
                        </div>
                      </div>
                      <div className="column-menu col-auto  col-md-auto">
                        <button className="button-option" type="button">
                          <Icon name={ICON_NAMES.dots} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <nav className="pagination">
                    <ul className="pagination__list">
                      <li className="page-item active">
                        <button type="button" className="page-link">
                          1
                        </button>
                      </li>
                      <li className="page-item">
                        <button type="button" className="page-link">
                          2
                        </button>
                      </li>
                      <li className="page-item">
                        <button type="button" className="page-link">
                          3
                        </button>
                      </li>
                      <li className="page-item ">
                        <button type="button" className="page-link">
                          ...
                        </button>
                      </li>
                      <li className="page-item">
                        <button type="button" className="page-link">
                          N-1
                        </button>
                      </li>
                      <li className="page-item">
                        <button type="button" className="page-link">
                          N
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default withFormik({
  name: "SPProductList"
})(SPProductListHtml);
