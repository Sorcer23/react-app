import React from "react";

import ApiService from "services/api/ApiService";
import SelectProviderEntity from "components/form/SelectProviderEntity";

function SelectProviderProducts(props) {
  return (
    <SelectProviderEntity
      {...props}
      apiGetList={ApiService.getProviderProducts}
      previewImagesName="images"
    />
  );
}

export default SelectProviderProducts;
