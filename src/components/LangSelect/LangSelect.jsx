import React from "react";
import Select from "react-select";

import styles from "./style";

function LangSelect(props) {
  return (
    <div className="dropdown-wrap">
      <Select {...props} isSearchable={false} styles={styles} />
    </div>
  );
}

export default LangSelect;
