import React from "react";

function PageAlert(props) {
  const { title, content, htmlContent } = props;

  return (
    <div className="page-alert">
      <div className="page-alert__title">{title}</div>
      <div
        className="page-alert__text"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      >
        {content}
      </div>
    </div>
  );
}

export default PageAlert;
