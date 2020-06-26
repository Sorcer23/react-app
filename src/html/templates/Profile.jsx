import React from "react";

import Icon, { ICON_NAMES } from "components/Icon";
import Input from "components/form/Input";

function ProfileHtml(props) {
  return (
    <div className="wrapper">
      <main className="main">
        <section className="data">
          <div className="container data__inner">
            <form action="">
              <div className="data__head">
                <h1 className="section-title">Profile Details</h1>
                <div className="buttons-wrap">
                  <button className="btn btn--light">Cancel</button>
                  <button className="btn">Save</button>
                </div>
              </div>
              <div className="data__body">
                <div className="section">
                  <div className="section__head">
                    <div className="section__title">Personal Information</div>
                    <a href="#" className="link">
                      <span className="icon">
                        <Icon name={ICON_NAMES.map} />
                      </span>
                      <span className="link__title">Manage Addresses</span>
                    </a>
                  </div>
                  <div className="section__body">
                    <div className="row">
                      <div className="col-md-4">
                        <Input name="name" placeholder="input" className="" />
                        <Input name="name" placeholder="input" className="" />
                        <div className="field-wrap">
                          <span className="field-label">Mobile Number</span>
                          <select className="select">
                            <option value="apple">Apple</option>
                            <option value="banana">Banana</option>
                            <option value="orange">Orange</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <Input name="name" placeholder="input" className="" />
                        <Input name="name" placeholder="input" className="" />
                        <div className="field-wrap">
                          <span className="field-label">
                            How you heard about Sinan?
                          </span>
                          <select className="select">
                            <option value="apple">Apple</option>
                            <option value="banana">Banana</option>
                            <option value="orange">Orange</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <Input name="name" placeholder="input" className="" />
                        <Input name="name" placeholder="input" className="" />
                        <div className="field-wrap">
                          <span className="field-label">Why Sinan?</span>
                          <select className="select">
                            <option value="apple">Apple</option>
                            <option value="banana">Banana</option>
                            <option value="orange">Orange</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <label className="checkbox">
                          <input type="checkbox" />
                          <span className="icon"></span>
                          <span className="checkbox__title">
                            Newsletter Subscription
                          </span>
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label className="checkbox">
                          <input type="checkbox" />
                          <span className="icon"></span>
                          <span className="checkbox__title">
                            SMS Subscription
                          </span>
                        </label>
                      </div>
                      <div className="col-md-4">
                        <button
                          type="button"
                          className="btn btn--light btn--large"
                        >
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section">
                  <div className="section__head">
                    <div className="section__title">Business Information</div>
                  </div>
                  <div className="section__body">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="upload ">
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">Profile Pic</div>
                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="upload active ">
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">Details.pdf</div>
                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="upload ">
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">
                                Copy of CR (png, jpg, pdf)
                              </div>
                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="upload ">
                          <div className="upload__preview"></div>
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">
                                Copy of Work Permit (png, jpg, pdf)
                              </div>
                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <Input name="name" placeholder="input" className="" />{" "}
                        <Input name="name" placeholder="input" className="" />
                        <div className="field-wrap">
                          <span className="field-label">Category**</span>
                          <select className="select">
                            <option value="apple">Apple</option>
                            <option value="banana">Banana</option>
                            <option value="orange">Orange</option>
                          </select>
                        </div>
                        <div className="field-wrap">
                          <span className="field-label">Category**</span>
                          <select className="select">
                            <option value="apple">Apple</option>
                            <option value="banana">Banana</option>
                            <option value="orange">Orange</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="field-wrap">
                          <span className="field-label">
                            Type of Profession**
                          </span>
                          <select className="select">
                            <option value="apple">Apple</option>
                            <option value="banana">Banana</option>
                            <option value="orange">Orange</option>
                          </select>
                        </div>
                        <Input name="name" placeholder="input" className="" />

                        <Input name="name" placeholder="input" className="" />
                        <div className="field-wrap">
                          <span className="field-label">Select location</span>
                          <select className="select">
                            <option value="apple">Apple</option>
                            <option value="banana">Banana</option>
                            <option value="orange">Orange</option>
                          </select>
                        </div>
                        <div className="tags">
                          <div className="tags__list">
                            <div className="tags__item tags-item">
                              <div className="tags-item__title">
                                D-20, Qatar
                              </div>
                              <div className="tags-item__icon">
                                <Icon name={ICON_NAMES.close} />
                              </div>
                            </div>
                            <div className="tags__item tags-item">
                              <div className="tags-item__title">
                                D-20, Qatar
                              </div>
                              <div className="tags-item__icon">
                                <Icon name={ICON_NAMES.close} />
                              </div>
                            </div>
                            <div className="tags__item tags-item">
                              <div className="tags-item__title">
                                D-20, Qatar
                              </div>
                              <div className="tags-item__icon">
                                <Icon name={ICON_NAMES.close} />
                              </div>
                            </div>
                          </div>
                          <div className="tags__info">+3 more</div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <Input name="name" placeholder="input" className="" />
                        <Input name="name" placeholder="input" className="" />

                        <div className="field-wrap">
                          <span className="field-label">
                            Business introduction
                          </span>
                          <textarea className="textarea"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section">
                  <div className="section__head">
                    <div className="section__title">Social Information</div>
                  </div>
                  <div className="section__body">
                    <div className="row">
                      <div className="col-md-4">
                        <Input name="name" placeholder="input" className="" />
                        <Input name="name" placeholder="input" className="" />
                      </div>
                      <div className="col-md-4">
                        <Input name="name" placeholder="input" className="" />
                      </div>
                      <div className="col-md-4">
                        <Input name="name" placeholder="input" className="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section">
                  <div className="section__head">
                    <div className="section__title">
                      Feature your profile with your work samples**
                    </div>
                  </div>
                  <div className="section__body">
                    <div className="row">
                      <div className="col-md-4">
                        <div
                          className="upload loaded"
                          style={{
                            backgroundImage: "url('/img/img-upload.jpg')"
                          }}
                        >
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">Profile Pic</div>
                              <input className="upload__input" type="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="upload active ">
                          <div className="upload__inner">
                            <div className="upload__info">
                              <div className="upload__icon">
                                <Icon name={ICON_NAMES.add} />
                              </div>
                              <div className="upload__title">Add Photo</div>
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
                  <button className="btn">Save</button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProfileHtml;
