import React from "react";

import normalizeExternalLink from "utils/normalizeExternalLink";

function SocialLink(props) {
  const { name, url } = props;

  if (!url) return null;

  return (
    <a
      href={normalizeExternalLink(url)}
      target="_blank"
      className="social__link"
    >
      <img src={`/img/${getSocialNetwork(name)}.svg`} alt="" />
    </a>
  );
}

function getSocialNetwork(name) {
  switch (name) {
    case "facebook":
      return "icon-fb";
    case "snapchat":
      return "icon-snapchat";
    case "twitter":
      return "icon-twitter";
    case "instagram":
      return "icon-inst";
    default:
      return "";
  }
}

export default SocialLink;
