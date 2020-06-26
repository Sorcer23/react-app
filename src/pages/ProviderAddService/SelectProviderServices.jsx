import React from "react";

import ApiService from "services/api/ApiService";
import SelectProviderEntity from "components/form/SelectProviderEntity";

function SelectProviderServices(props) {
  return (
    <SelectProviderEntity
      {...props}
      apiGetList={ApiService.getProviderServices}
      previewImagesName="images"
    />
  );
}

export default SelectProviderServices;
