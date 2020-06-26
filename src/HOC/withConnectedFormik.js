import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withFormik } from "formik";
import { connect } from "react-redux";

const withConnectedFormik = params => Component => {
  const { displayName } = params;

  if (typeof displayName !== "string")
    throw new TypeError("displayName is required and should be a string");

  function ConnectedForm(props) {
    const { formErrors, formSubmitting, ...restProps } = props;

    useEffect(() => {
      props.setErrors(formErrors);
    }, [formErrors]);

    useEffect(() => {
      props.setSubmitting(formSubmitting);
    }, [formSubmitting]);

    return <Component {...restProps} />;
  }

  return compose(
    connect((state, props) => {
      const form = state.form.list[displayName];

      if (typeof form === "undefined")
        throw new Error(`The form with name ${displayName} is not declared`);

      return {
        formErrors: form.errors,
        formSubmitting: form.isSubmitting,
        formFetching: form.isFetching
      };
    }),
    withFormik(params)
  )(ConnectedForm);
};

export default withConnectedFormik;
