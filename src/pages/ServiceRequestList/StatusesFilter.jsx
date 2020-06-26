import React from "react";
import { injectIntl } from "react-intl";

function StatusesFilter(props) {
  const { intl, activeStatus, onChange } = props;

  return (
    <div className="switch-field switch-field--lg">
      <label className="switch-field__item">
        <input
          className="switch-field__input"
          type="radio"
          checked={activeStatus === "new"}
          onChange={() => {
            onChange("new");
          }}
        />
        <span className="switch-field__label">
          {intl.formatMessage({ id: "ui.requests.status_new" })}
        </span>
      </label>
      <label className="switch-field__item">
        <input
          className="switch-field__input"
          type="radio"
          checked={activeStatus === "ongoing"}
          onChange={() => {
            onChange("ongoing");
          }}
        />
        <span className="switch-field__label">
          {intl.formatMessage({ id: "ui.requests.status_ongoing" })}
        </span>
      </label>
      <label className="switch-field__item">
        <input
          className="switch-field__input"
          type="radio"
          checked={activeStatus === "history"}
          onChange={() => {
            onChange("history");
          }}
        />
        <span className="switch-field__label">
          {intl.formatMessage({ id: "ui.requests.status_history" })}
        </span>
      </label>
      {/* <input
        className="switch-field__input"
        type="radio"
        id="radio-3-3"
        name="switch-three"
        defaultValue="3"
        defaultChecked
      />
      <label className="switch-field__label" htmlFor="radio-3-3">
        History
      </label> */}
    </div>
  );
}

export default injectIntl(StatusesFilter);
