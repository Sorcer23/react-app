import React from "react";
import { injectIntl } from "react-intl";
import { compose, withState, mapProps, defaultProps } from "recompose";
import { getIn } from "formik";

const withField = Component => {
  function ComponentWithField(props) {
    return <Component {...props} />;
  }

  return compose(
    injectIntl,
    withState("isFocused", "setFocus", false),
    // props for html templates
    defaultProps({
      form: {
        errors: {},
        touched: {}
      },
      field: {
        onBlur: () => {}
      }
    }),
    mapProps(props => {
      const { errors, touched } = props.form;
      const { name, value } = props.field;
      const errorMsg = getIn(errors, name);
      const error =
        errorMsg == null || typeof errorMsg !== "string"
          ? errorMsg
          : props.intl.formatMessage({ id: errorMsg });

      return {
        ...props,
        error: getIn(touched, name) ? error : null,
        hasValue:
          value != null &&
          value !== "" &&
          (Array.isArray(value) ? value.length > 0 : true)
      };
    })
  )(ComponentWithField);
};

export default withField;
