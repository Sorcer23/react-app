import React from "react";

import Icon, { ICON_NAMES } from "components/Icon";
import Input from "components/form/Input";

function SPAddServiceHtml(props) {
  return (
    <div className="wrapper">
      <main className="main">
        <section className="data">
          <div className="container data__inner">
            <form action="">
              <div className="data__head">
                <h1 className="section-title">(SP) App Service</h1>
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
                        <div className="row field-wrap ">
                          <div className="col-7">
                            <select className="select">
                              <option value="apple">Apple</option>
                              <option value="banana">Banana</option>
                              <option value="orange">Orange</option>
                            </select>
                          </div>
                          <div className="col-5">
                            <Input
                              name="name"
                              placeholder="input"
                              className=""
                            />
                          </div>
                        </div>
                        <div className="field-wrap">
                          <select className="select">
                            <option value="apple">Apple</option>
                            <option value="banana">Banana</option>
                            <option value="orange">Orange</option>
                          </select>
                        </div>
                        <div className="tags">
                          <div className="tags__list">
                            <div className="tags__item tags-item">
                              <div className="tags-item__title">White</div>
                              <div className="tags-item__icon">
                                <Icon name={ICON_NAMES.close} />
                              </div>
                            </div>
                            <div className="tags__item tags-item">
                              <div className="tags-item__title">Black</div>
                              <div className="tags-item__icon">
                                <Icon name={ICON_NAMES.close} />
                              </div>
                            </div>
                            <div className="tags__item tags-item">
                              <div className="tags-item__title">Yellow</div>
                              <div className="tags-item__icon">
                                <Icon name={ICON_NAMES.close} />
                              </div>
                            </div>
                            <div className="tags__item tags-item">
                              <div className="tags-item__title">Yellow</div>
                              <div className="tags-item__icon">
                                <Icon name={ICON_NAMES.close} />
                              </div>
                            </div>
                          </div>
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

export default SPAddServiceHtml;
