import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  compose,
  withHandlers,
  branch,
  renderNothing,
  defaultProps
} from "recompose";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import withField from "HOC/withField";
import AppDataModule from "modules/appData";
import NotificationsModule from "modules/notifications";
import ApiService from "services/api/ApiService";
import FileUpload from "./FileUpload";

function withMultipleUpload(Component) {
  return function MultipleFileUpload(props) {
    const {
      config = { formats: [] },
      error,
      field,
      form,
      onDelete,
      colMd,
      ...restProps
    } = props;

    const entity = props.entity || field.name;

    if (!config.multiple)
      return (
        <Component
          {...restProps}
          config={config}
          name={entity}
          value={field.value}
          error={error}
          onTouch={() => form.setFieldTouched(field.name, true)}
          onLoad={file => form.setFieldValue(field.name, file)}
          onDelete={file =>
            onDelete().then(() => {
              form.setFieldValue(field.name, "");
            })
          }
          setError={error => form.setFieldError(field.name, error)}
        />
      );

    return (
      <Fragment>
        {field.value.map(value => (
          <div key={value} className={`col-md-${colMd}`}>
            <Component
              {...restProps}
              config={config}
              name={entity}
              value={value}
              onDelete={file =>
                onDelete().then(() => {
                  form.setFieldValue(
                    field.name,
                    field.value.filter(fileValue => fileValue !== file)
                  );
                })
              }
            />
          </div>
        ))}
        {field.value.length < config.limit && (
          <div className={`col-md-${colMd}`}>
            <Component
              key={field.value.join("")}
              {...restProps}
              config={config}
              name={entity}
              error={error}
              onTouch={() => form.setFieldTouched(field.name, true)}
              onLoad={file => {
                form.setFieldValue(field.name, [...field.value, file]);
              }}
              setError={error => form.setFieldError(field.name, error)}
            />
          </div>
        )}
      </Fragment>
    );
  };
}

FileUpload.propTypes = {
  type: PropTypes.oneOf(["feedback"]),
  colMd: PropTypes.number
};

export default compose(
  defaultProps({
    colMd: 3
  }),
  injectIntl,
  connect(
    (state, props) => {
      const key = props.entity || props.field.name;
      const { attachments } = AppDataModule.listSelector(state)("attachments");

      return {
        config: attachments[key]
      };
    },
    {
      notify: NotificationsModule.notify
    }
  ),
  branch(props => {
    return (
      props.field.value == null ||
      (props.config == null && props.mode !== "dev")
    );
  }, renderNothing),
  withHandlers({
    onDelete: props => () => {
      return new Promise((resolve, reject) => {
        props.notify({
          type: "confirmation",
          view: "window",
          message: props.intl.formatMessage({
            id: "ui.notifications.confirmation.delete_image"
          }),
          onConfirm: async () => {
            // await ApiService.uploadFile(props.field.name, {});
            resolve();
          },
          onCancel: reject
        });
      });
    }
  }),
  withField,
  withMultipleUpload
)(FileUpload);
