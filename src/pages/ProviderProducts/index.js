import ApiService from "services/api/ApiService";
import withProviderEntities from "HOC/withProviderEntities";
import ProviderProducts from "./ProviderProducts";

export default withProviderEntities({
  apiGetList: ApiService.getProviderProducts,
  apiDeleteItem: ApiService.deleteProviderProduct
})(ProviderProducts);
