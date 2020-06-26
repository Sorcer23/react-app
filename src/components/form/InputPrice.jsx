import React from "react";

import Input from "components/form/Input";

function InputPrice(props) {
  return <Input {...props} type="tel" maxLength="9" />;
}

export default InputPrice;
