import React from "react";

import Icon, { ICON_NAMES } from "components/Icon";
import Input from "components/form/Input";

function SPAddPostHtml(props) {
  return (
    <div className="wrapper">
      <main className="main">
        <div className="popup popup--xs">
          <button className="popup__close">
            <Icon name={ICON_NAMES.close} />
          </button>
          <div className="popup__head">
            <div className="popup__title">Select Product</div>
          </div>
          <div className="popup__body ">
            <div className="select-list">
              <button type="button" className="select-item">
                <span className="select-item__image">
                  <img src="/img/example.png" alt="" />
                </span>
                <span className="select-item__title">Product title</span>
              </button>
              <button type="button" className="select-item">
                <span className="select-item__image">
                  <img src="/img/example.png" alt="" />
                </span>
                <span className="select-item__title">Product title</span>
              </button>
              <button type="button" className="select-item active">
                <span className="select-item__image">
                  <img src="/img/example.png" alt="" />
                </span>
                <span className="select-item__title">Product title</span>
              </button>
              <button type="button" className="select-item">
                <span className="select-item__image">
                  <img src="/img/example.png" alt="" />
                </span>
                <span className="select-item__title">Product title</span>
              </button>
              <button type="button" className="select-item">
                <span className="select-item__image">
                  <img src="/img/example.png" alt="" />
                </span>
                <span className="select-item__title">Product title</span>
              </button>
              <button type="button" className="select-item">
                <span className="select-item__image">
                  <img src="/img/example.png" alt="" />
                </span>
                <span className="select-item__title">Product title</span>
              </button>
            </div>
          </div>
        </div>
        <section className="data">
          <div className="container data__inner">
            <form action="">
              <div className="data__head">
                <h1 className="section-title">(SP) App Post</h1>
              </div>
              <div className="data__body">
                <div className="section">
                  <div className="section__body">
                    <div className="row">
                      <div className="col-md-4">
                        <Input name="name" placeholder="input" className="" />
                        <div className="field-wrap">
                          <textarea className="textarea"></textarea>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="field-wrap">
                          <select className="select">
                            <option value="apple">Apple</option>
                            <option value="banana">Banana</option>
                            <option value="orange">Orange</option>
                          </select>
                        </div>
                        <div className="field-wrap">
                          <select className="select">
                            <option value="apple">Apple</option>
                            <option value="banana">Banana</option>
                            <option value="orange">Orange</option>
                          </select>
                        </div>
                        <div className="field-wrap">
                          <select className="select">
                            <option value="apple">Apple</option>
                            <option value="banana">Banana</option>
                            <option value="orange">Orange</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="field-wrap">
                          <select className="select">
                            <option value="apple">Apple</option>
                            <option value="banana">Banana</option>
                            <option value="orange">Orange</option>
                          </select>
                        </div>
                        <div className="field-wrap">
                          <select className="select">
                            <option value="apple">Apple</option>
                            <option value="banana">Banana</option>
                            <option value="orange">Orange</option>
                          </select>
                        </div>
                        <div className="field-wrap">
                          <select className="select">
                            <option value="apple">Apple</option>
                            <option value="banana">Banana</option>
                            <option value="orange">Orange</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="upload ">
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">App image</div>
                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="upload">
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">App image</div>
                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="upload ">
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">App image</div>
                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="upload ">
                          <div className="upload__preview"></div>
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">App image</div>
                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <h3 className="section-subtitle">Add Products</h3>
                      </div>
                      <div className="col-md-3">
                        <div
                          className="upload loaded"
                          style={{
                            backgroundImage: "url('/img/img-upload.jpg')"
                          }}
                        >
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.trash} />
                              </div>

                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                          <div className="upload__text">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Adipisci
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="upload">
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">App image</div>
                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="upload ">
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">App image</div>
                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="upload ">
                          <div className="upload__preview"></div>
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">App image</div>
                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <h3 className="section-subtitle">Add Services</h3>
                      </div>
                      <div className="col-md-3">
                        <div className="upload ">
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">App image</div>
                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="upload">
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">App image</div>
                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="upload ">
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">App image</div>
                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="upload ">
                          <div className="upload__preview"></div>
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">App image</div>
                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="data__bottom">
                <div className="buttons-wrap">
                  <button className="btn btn--light">Cancel</button>
                  <button className="btn btn--light">Preview</button>
                  <button className="btn btn--light">Save Draft</button>
                  <button className="btn btn--light">
                    Request For Publish
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SPAddPostHtml;
