import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import {
  getCountries,
  getCountryCallingCode,
  formatPhoneNumber,
  formatPhoneNumberIntl
} from "react-phone-number-input";
import countryLocaleEN from "react-phone-number-input/locale/en.json";
import flags from "react-phone-number-input/flags";
import PhoneInput from "react-phone-number-input/input";
import Select, { components as selectComponents } from "react-select";
import classNames from "classnames";

import withField from "HOC/withField";
import Icon, { ICON_NAMES } from "components/Icon";
import countrySelectStyle from "./countrySelectStyle";

const COUNTRIES = getCountries();
const HIGHLIGHTED_COUNTRIES = ["QA", "US", "UA"];
const DEFAULT_COUNTRY = "UA";

function CountrySelectValue(props) {
  return (
    <selectComponents.SingleValue {...props}>
      {`${props.data.value}+${getCountryCallingCode(props.data.value)}`}
    </selectComponents.SingleValue>
  );
}

function Option(props) {
  return;
}

function InputPhone(props) {
  const {
    field,
    form,
    error,
    placeholder,
    hasValue,
    isFocused,
    setFocus
  } = props;

  const [selectedCountry, setCountry] = useState(DEFAULT_COUNTRY);

  useEffect(() => {
    form.setFieldValue(field.name, "");
  }, [selectedCountry]);

  const options = [
    {
      options: HIGHLIGHTED_COUNTRIES.map(country => ({
        value: country,
        label: `${
          countryLocaleEN[country]
        } - ${country}+${getCountryCallingCode(country)}`,
        isHighlighted: true
      }))
    },
    {
      options: COUNTRIES.map(country => ({
        value: country,
        label: `${
          countryLocaleEN[country]
        } - ${country}+${getCountryCallingCode(country)}`
      }))
    }
  ];

  const handleChange = (value = "") => {
    form.setFieldValue(field.name, value);
  };

  const FlagIcon = flags[selectedCountry];

  return (
    <div
      className={classNames("field field-phone", {
        "field--focused": isFocused,
        "field--filled": hasValue,
        "field--error": error != null
      })}
    >
      <FlagIcon style={{ width: 30 }} />
      <Select
        styles={countrySelectStyle}
        value={options[0].options.find(
          country => country.value === selectedCountry
        )}
        options={options}
        isSearchable={false}
        components={{ SingleValue: CountrySelectValue }}
        onChange={country => setCountry(country.value)}
      />
      <div className="field__icon">
        <Icon name={ICON_NAMES.phone} />
      </div>
      <div className="field__data">
        {(isFocused || hasValue) && (
          <span className="field-input__label field-label">{placeholder}</span>
        )}
        <PhoneInput
          name={field.name}
          className="field__input"
          international
          value={field.value}
          country={selectedCountry}
          maxLength="12"
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onBlur={event => {
            field.onBlur(event);
            setFocus(false);
          }}
        />
        {error != null && <span className="field-error">{error}</span>}
      </div>
    </div>
  );
}

export default withField(InputPhone);
