import React from "react";
import Select from "react-select";

import styles from "./style";

function DropdownLang(props) {
  return (
    <div className="dropdown-wrap">
      <Select
        styles={styles}
        options={[
          { value: "en", label: "English" },
          { value: "en", label: "عربى" }
        ]}
      />
    </div>
  );
}

export default DropdownLang;
