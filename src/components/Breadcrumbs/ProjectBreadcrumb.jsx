import React from "react";
import { connect } from "react-redux";

const ProjectBreadcrumb = props => {
  if (props.project == null) return null;
  return <span>{props.project.title}</span>;
};

export default connect((state, props) => {
  return {
    project: null
  };
})(ProjectBreadcrumb);
