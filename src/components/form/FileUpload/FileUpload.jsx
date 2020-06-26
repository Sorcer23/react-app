import React, { Fragment, useCallback, useState } from "react";
import classNames from "classnames";

import { useDropzone } from "react-dropzone";

import NotificationsModule from "modules/notifications";
import Icon, { ICON_NAMES } from "components/Icon";
import Preloader from "components/Preloader";
import ApiService from "services/api/ApiService";
import getServerFileUrl from "utils/getServerFileUrl";

function FileUpload(props) {
  const {
    intl,
    name,
    value,
    config,
    error,
    placeholder,
    onLoad,
    iconAdd,
    type,
    upperPlaceholder
  } = props;

  const [isLoading, setLoading] = useState(false);

  const dropzoneConfig = {
    accept: config.formats.map(format => `.${format}`),
    maxSize: parseInt(config.sizeLimit),
    multiple: false
  };

  const onDropAccepted = useCallback((files, event) => {
    setLoading(true);

    ApiService.uploadFile(name, files[0])
      .then(response => {
        const { file } = response;

        onLoad(file);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onDropRejected = useCallback((files, event) => {
    if (typeof props.onTouch === "function") props.onTouch();

    setTimeout(() => {
      if (files[0].size > dropzoneConfig.maxSize) {
        props.setError(
          props.intl.formatMessage(
            { id: "ui.validation.file_max_size" },
            { size: dropzoneConfig.maxSize }
          )
        );
      }
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    ...dropzoneConfig,
    onFileDialogCancel: () => {
      if (typeof props.onTouch === "function") props.onTouch();
    },
    onDropAccepted,
    onDropRejected
  });

  const inputProps = getInputProps();
  const rootProps = getRootProps({
    className: classNames("upload", {
      loaded: value,
      [`upload--${type}`]: type != null
    })
  });

  return (
    <Fragment>
      {upperPlaceholder && (
        <div className="upload-upper-label field-label">
          {value ? placeholder : ""}
        </div>
      )}
      <div
        {...rootProps}
        style={{
          backgroundImage: `url(${getServerFileUrl(value)})`
        }}
        onClick={event => {
          if (value) props.onDelete(value);
          else rootProps.onClick(event);
        }}
      >
        <div className="upload__inner">
          <div className="upload__info">
            {!isLoading && (
              <div className="upload__icon">
                {value ? (
                  <Icon name={ICON_NAMES.trash} />
                ) : iconAdd != null ? (
                  <Icon name={iconAdd} />
                ) : (
                  <Icon name={ICON_NAMES.add} />
                )}
              </div>
            )}
            {!value && !isLoading ? (
              <Fragment>
                <div className="upload__title">{placeholder}</div>
                <input
                  {...inputProps}
                  className="upload__input"
                  onClick={event => {
                    inputProps.onClick(event);
                  }}
                />
              </Fragment>
            ) : (
              <Fragment></Fragment>
            )}
            {isLoading && <Preloader />}
          </div>
        </div>

        {error != null && <span className="field-error">{error}</span>}
      </div>
    </Fragment>
  );
}

export default FileUpload;
