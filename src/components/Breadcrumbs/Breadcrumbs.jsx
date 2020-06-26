import React from "react";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

const BreadcrumbItem = ({
  children,
  item,
  isLast,
  isFirst,
  lang,
  currentTitle
}) => {
  const className = "breadcrumb__link";
  const { key } = item;

  if (isLast)
    return (
      <span className={className}>
        {currentTitle == null ? children : currentTitle}
      </span>
    );

  return (
    <Link to={key} className={className}>
      {children}
    </Link>
  );
};

const Breadcrumbs = props => {
  const { breadcrumbs, currentTitle, lang } = props;

  return (
    <ul className="breadcrumbs">
      {breadcrumbs.map((item, index) => {
        const { key } = item;

        const isLast = index === breadcrumbs.length - 1;
        const isFirst = index === 0;

        return (
          <li key={key} className="breadcrumb">
            <BreadcrumbItem
              item={item}
              isLast={isLast}
              isFirst={isFirst}
              currentTitle={currentTitle}
              className="breadcrumb__link"
              lang={lang}
            >
              {item.title != null ? (
                <FormattedMessage id={item.title} />
              ) : (
                item.breadcrumb
              )}
            </BreadcrumbItem>
            {!isLast && <span className="breadcrumb__separator">&rarr;</span>}
          </li>
        );
      })}
    </ul>
  );
};

export default connect(state => {
  return {
    lang: state.lang.active
  };
})(Breadcrumbs);
