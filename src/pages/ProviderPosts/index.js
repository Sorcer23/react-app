import ApiService from "services/api/ApiService";
import withProviderEntities from "HOC/withProviderEntities";
import ProviderPosts from "./ProviderPosts";

export default withProviderEntities({
  apiGetList: ApiService.getProviderPosts,
  apiDeleteItem: ApiService.deleteProviderPost
})(ProviderPosts);
