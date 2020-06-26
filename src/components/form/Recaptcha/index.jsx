import React, { Component, createRef } from "react";
import GoogleRecaptcha from "react-google-recaptcha";
import classNames from "classnames";

import "./style.scss";

class Recaptcha extends Component {
  constructor() {
    super();
    this.recaptcha = createRef();
  }

  handleChange = value => {
    const { input } = this.props;
    input.onChange(value);
  };

  componentWillReceiveProps(nextProps) {
    const { value } = this.props.input;
    const { value: nextValue } = nextProps.input;

    if (
      value !== "" &&
      value != null &&
      (nextValue === "" || nextValue == null)
    ) {
      this.recaptcha.current.reset();
    }
  }

  render() {
    const {
      meta: { touched, error }
    } = this.props;

    const isError = touched && error;
    const isValid = touched && !error;

    return (
      <div
        className={classNames("field field--recaptcha", {
          "field--error": isError
        })}
      >
        <div className="field__body">
          <GoogleRecaptcha
            ref={this.recaptcha}
            className="recaptcha"
            sitekey={"6LfI5r0UAAAAAGj01rOhSnVcC9SQ4ij8bgBvuN7_"}
            // sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
            onChange={this.handleChange}
          />
        </div>
        {isError && <span className="field__error-msg">{error}</span>}
      </div>
    );
  }
}

export default Recaptcha;
