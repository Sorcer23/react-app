import React from "react";
import Collapse, { Panel } from "rc-collapse";
import { Field, FieldArray } from "formik";

import Icon, { ICON_NAMES } from "components/Icon";
import Checkbox from "components/form/Checkbox";

function Filter(props) {
  const {
    intl,
    appData,
    values,
    isDropdownVisible,
    handleSubmit,
    setDropdownVisible,
    applyFilter,
    resetFilter,
    resetForm
  } = props;

  return (
    <div className="filter-overlay">
      <div className="container">
        <div className="filter-overlay__inner">
          <div className="filter-overlay-dropdown-wrap">
            {isDropdownVisible && (
              <form onSubmit={handleSubmit} className="filter-overlay-dropdown">
                <div className="filter-overlay-dropdown__head">
                  <button
                    className="filter-overlay-dropdown__reset"
                    type="button"
                    onClick={() => {
                      resetForm();
                      resetFilter();
                    }}
                  >
                    {intl.formatMessage({ id: "ui.actions.reset" })}
                  </button>
                  <button
                    className="filter-overlay-dropdown__apply"
                    type="button"
                    onClick={() => applyFilter(values)}
                  >
                    {intl.formatMessage({ id: "ui.actions.applyFilter" })}
                  </button>
                </div>
                <div className="filter-overlay-dropdown__body">
                  <Collapse
                    accordion
                    className="filter-overlay-dropdown__collapse"
                  >
                    <Panel
                      header={intl.formatMessage({ id: "ui.fields.colors" })}
                    >
                      {appData.colors.map(color => (
                        <Field
                          key={color.value}
                          name="colors"
                          data={color}
                          isGroup
                          isMarkerRight
                          component={Checkbox}
                        />
                      ))}
                    </Panel>
                  </Collapse>
                </div>
              </form>
            )}

            <button
              type="button"
              className="filter-overlay__btn"
              onClick={() => setDropdownVisible(!isDropdownVisible)}
            >
              <Icon name={ICON_NAMES.filter} />
            </button>

            {/* <div className="filter-overlay-list">
            <div className="select-tags__list">
              <div className="select-tag select-tag--blue">
                <div className="select-tag__title">option</div>
                <button type="button" className="select-tag__delete">
                  <Icon className="filter-overlay__btn-ppp" name={ICON_NAMES.close} />
                </button>
              </div>
            </div>
            <button className="filter-overlay__reset" type="button">Reset Filters</button>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
