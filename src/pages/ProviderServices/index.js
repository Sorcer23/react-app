import ApiService from "services/api/ApiService";
import withProviderEntities from "HOC/withProviderEntities";
import ProviderServices from "./ProviderServices";

export default withProviderEntities({
  apiGetList: ApiService.getProviderServices,
  apiDeleteItem: ApiService.deleteProviderService
})(ProviderServices);
