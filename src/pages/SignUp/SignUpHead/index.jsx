import React, { Fragment } from "react";

import LangSelect from "components/LangSelect";
import SwitchStep from "./SwitchStep";

function SignUpHead(props) {
  return (
    <div className="authorization__left-col">
      <div className="column-head">
        <LangSelect />
      </div>
      <div className="column-body">
        <SwitchStep />
      </div>
    </div>
  );
}

export default SignUpHead;
