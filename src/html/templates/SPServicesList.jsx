import React from "react";
import { Field, withFormik } from "formik";

import Icon, { ICON_NAMES } from "components/Icon";
import Input from "components/form/Input";
import Select from "components/form/Select";

function SPServicesListHtml(props) {
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
                      <div className="col-8">
                        <div className="row">
                          <div className="col-auto">Filter by</div>
                          <div className="col-md-4 col-lg-3">
                            <Field
                              name="caregory"
                              placeholder="Caregory"
                              component={Select}
                              options={[{ value: 0, label: "Option 1" }]}
                            />
                          </div>
                          <div className="col-md-4 col-lg-5">
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
                      <div className="col-lg-3">
                        <div className="row">
                          <div className="col-lg-4">Sort by</div>
                          <div className="col-lg-8">
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
                      <div className="col-auto">
                        <div
                          className="data-image"
                          style={{
                            backgroundImage: "url('/img/img-upload.jpg')"
                          }}
                        ></div>
                      </div>
                      <div className="data-column col-md-2">
                        <div>Title</div>
                        <div>Category</div>
                        <div>Price</div>
                      </div>
                      <div className="data-column col-md-2">
                        <div>Subcategory</div>
                        <div>Offer Price</div>
                      </div>
                      <div className="data-column col-md-2">
                        <div>Quantity</div>
                      </div>
                      <div className="data-column col-md-2">
                        <div>In Stock</div>
                        <div>Published</div>
                        <button className="button-option" type="button">
                          Options
                        </button>
                      </div>
                    </div>
                    <div className="row data-row">
                      <div className="col-auto id-column">Id</div>
                      <div className="col-auto">
                        <div
                          className="data-image"
                          style={{
                            backgroundImage: "url('/img/img-upload.jpg')"
                          }}
                        ></div>
                      </div>
                      <div className="data-column col-md-2">
                        <div>Title</div>
                        <div>Category</div>
                        <div>Price</div>
                      </div>
                      <div className="data-column col-md-2">
                        <div>Subcategory</div>
                        <div>Offer Price</div>
                      </div>
                      <div className="data-column col-md-2">
                        <div>Quantity</div>
                      </div>
                      <div className="data-column col-md-2">
                        <div>In Stock</div>
                        <div>Published</div>
                        <button className="button-option" type="button">
                          Options
                        </button>
                      </div>
                    </div>
                    <div className="row data-row">
                      <div className="col-auto id-column">Id</div>
                      <div className="col-auto">
                        <div
                          className="data-image"
                          style={{
                            backgroundImage: "url('/img/img-upload.jpg')"
                          }}
                        ></div>
                      </div>
                      <div className="data-column col-md-2">
                        <div>Title</div>
                        <div>Category</div>
                        <div>Price</div>
                      </div>
                      <div className="data-column col-md-2">
                        <div>Subcategory</div>
                        <div>Offer Price</div>
                      </div>
                      <div className="data-column col-md-2">
                        <div>Quantity</div>
                      </div>
                      <div className="data-column col-md-2">
                        <div>In Stock</div>
                        <div>Published</div>
                        <button className="button-option" type="button">
                          Options
                        </button>
                      </div>
                    </div>
                    <div className="row data-row">
                      <div className="col-auto id-column">Id</div>
                      <div className="col-auto">
                        <div
                          className="data-image"
                          style={{
                            backgroundImage: "url('/img/img-upload.jpg')"
                          }}
                        ></div>
                      </div>
                      <div className="data-column col-md-2">
                        <div>Title</div>
                        <div>Category</div>
                        <div>Price</div>
                      </div>
                      <div className="data-column col-md-2">
                        <div>Subcategory</div>
                        <div>Offer Price</div>
                      </div>
                      <div className="data-column col-md-2">
                        <div>Quantity</div>
                      </div>
                      <div className="data-column col-md-2">
                        <div>In Stock</div>
                        <div>Published</div>
                        <button className="button-option" type="button">
                          Options
                        </button>
                      </div>
                    </div>
                  </div>
                  <nav className="pagination">
                    <ul className="pagination__list">
                      <li className="pagination__item active">
                        <button type="button" className="pagination__link">
                          1
                        </button>
                      </li>
                      <li className="pagination__item">
                        <button type="button" className="pagination__link">
                          2
                        </button>
                      </li>
                      <li className="pagination__item">
                        <button type="button" className="pagination__link">
                          3
                        </button>
                      </li>
                      <li className="pagination__item ">
                        <button type="button" className="pagination__link">
                          ...
                        </button>
                      </li>
                      <li className="pagination__item">
                        <button type="button" className="pagination__link">
                          N-1
                        </button>
                      </li>
                      <li className="pagination__item">
                        <button type="button" className="pagination__link">
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
  name: "SPServicesList"
})(SPServicesListHtml);
