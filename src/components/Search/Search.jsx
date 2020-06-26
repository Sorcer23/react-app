import React from "react";
import onClickOutside from "react-onclickoutside";

import Icon, { ICON_NAMES } from "components/Icon";

function Search(props) {
  const {
    intl,
    query,
    matches,
    inputRef,
    isLocal,
    handleInputChange,
    handleSelectMatch,
    handleSelectQuery,
    handleInputFocus,
    handleInputBlur,
    reset
  } = props;

  Search.handleClickOutside = () => reset();

  return (
    <div className="search">
      <form
        className="search__input-container"
        onSubmit={event => {
          event.preventDefault();
          handleSelectQuery();
        }}
      >
        <Icon className="search__icon" name={ICON_NAMES.search} />
        <input
          ref={inputRef}
          className="search__input"
          type="text"
          value={query}
          placeholder={intl.formatMessage({ id: "ui.fields.search" })}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </form>
      {/* {matches.isLoading && <div>Loading...</div>} */}
      {matches.isLoading && (
        <div className="search__results">
          <div className="search__results-record">
            {intl.formatMessage({ id: "ui.common.loading" })}...
          </div>
        </div>
      )}
      <ul className="search__results">
        {matches.list.map(match =>
          isLocal ? (
            <li
              key={match.value}
              className="search__results-record"
              onClick={handleSelectMatch(match)}
              role="button"
              tabIndex="0"
            >
              {match.label}
            </li>
          ) : (
            <li
              key={match.id}
              className="search__results-record"
              onClick={handleSelectMatch(match)}
              role="button"
              tabIndex="0"
            >
              {match.title}
            </li>
          )
        )}
        {matches.isLoaded && matches.list.length === 0 && (
          <li className="search__results-record">
            {intl.formatMessage({ id: "ui.common.not_found" })}
          </li>
        )}
      </ul>
    </div>
  );
}

export default onClickOutside(Search, {
  handleClickOutside: () => Search.handleClickOutside
});
