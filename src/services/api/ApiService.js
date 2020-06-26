import axios from "axios";
import snakecaseKeys from "snakecase-keys";
import toSnakeCase from "to-snake-case";

import { isDevMode } from "config";
import config, {
  handleRequest,
  handleResponse,
  handleResponseError
} from "./config";
import { objectToFormData } from "./utils";

const api = axios.create(config);

api.interceptors.request.use(handleRequest);

api.interceptors.response.use(handleResponse, handleResponseError);

class ApiService {
  //common
  getAppData() {
    return api.get("/common");
  }

  uploadFile(entity, attachment) {
    return api.post(
      `/attachments/${toSnakeCase(entity)}`,
      objectToFormData({ attachment })
    );
  }

  // dictionary
  setDictionaryLang(lang) {
    api.defaults.headers.common["Content-Language"] = lang;
  }
  getDictionaryVersion() {
    return api.get("/dictionary/version");
  }
  getDictionaryData(lang) {
    return api.get("/dictionary", {
      transformResponse: axios.defaults.transformResponse
    });
  }

  // auth
  setAuthToken(token) {
    api.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }
  signin(values) {
    return api.post("/auth/signin", values);
  }
  registerPhone(phone) {
    if (isDevMode) {
      return api.post("/auth/signup/phone-register", { phone, test: "1" });
    }

    return api.post("/auth/signup/phone-register", { phone });
  }
  verifyPhone(phone, pin) {
    if (isDevMode) {
      return api.post("/auth/signup/phone-verify", { phone, pin: "123qqq" });
    }

    return api.post("/auth/signup/phone-verify", { phone, pin });
  }
  resendVerifyCode(phone) {
    if (isDevMode) {
      return api.post("/auth/resend-verification", { phone, test: "1" });
    }
    return api.post("/auth/resend-verification", { phone });
  }

  // restore
  restorePasswordRequest(phone) {
    if (isDevMode) {
      return api.post("/auth/restore-by-phone", { phone, test: "1" });
    }

    return api.post("/auth/restore-by-phone", { phone });
  }
  restorePasswordVerify(phone, pin) {
    if (isDevMode) {
      return api.post("/auth/restore-by-phone-verify", {
        phone,
        pin: "123qqq"
      });
    }

    return api.post("/auth/restore-by-phone-verify", { phone, pin });
  }
  restorePasswordProcess({ phone, pin, password, passwordRepeat }) {
    if (isDevMode) {
      return api.post("/auth/set-password", {
        phone,
        pin: "123qqq",
        password,
        passwordRepeat
      });
    }

    return api.post("/auth/set-password", {
      phone,
      pin,
      password,
      passwordRepeat
    });
  }

  // common user
  getUserAccount() {
    return api.get("/account/profile");
  }
  patchUserAccount(values, token) {
    const params =
      token == null
        ? null
        : {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };

    return api.patch("/account/profile", values, params);
  }
  postUserAccount(values) {
    return api.post("/account/profile", values);
  }
  changePassword({ oldPassword, password, passwordRepeat }) {
    return api.post("/account/password", {
      oldPassword,
      password,
      passwordRepeat
    });
  }

  getUserAddresses() {
    return api.get("/account/addresses");
  }
  addUserAddress(address) {
    return api.post("/account/addresses", address);
  }
  editUserAddress(address) {
    return api.post(`/account/addresses/${address.id}`, address);
  }
  deleteUserAddress(id) {
    return api.delete(`/account/addresses/${id}`);
  }
  setActiveAddress(id) {
    return api.post(`/account/addresses/${id}/active`);
  }

  getNotifications(limit = 10, offset = 0) {
    return api.get("/notifications", {
      params: { limit, offset }
    });
  }

  makeNotificationsSeen(ids) {
    return api.post("/notifications/seen", { ids });
  }

  // service provider
  getProviderAccount() {
    return api.get("/service-provider/profile");
  }
  patchProviderAccount(values) {
    return api.patch("/service-provider/profile", values);
  }
  postProviderAccount(values) {
    return api.post("/service-provider/profile", values);
  }

  // provider products
  getProviderProduct(id) {
    return api.get(`/service-provider/products/${id}`);
  }
  getProviderProducts(params = {}) {
    const { perPage, offset } = params;

    return api.get("/service-provider/products", {
      params: {
        limit: perPage,
        offset
      }
    });
  }
  addProviderProduct(values) {
    return api.post(`/service-provider/products`, values);
  }
  updateProviderProduct(values) {
    return api.post(`/service-provider/products/${values.id}`, values);
  }
  deleteProviderProduct(id) {
    return api.delete(`/service-provider/products/${id}`);
  }
  requestProductPublish(id) {
    return api.post(`/service-provider/products/${id}/publish-request`);
  }

  // provider services
  getProviderService(id) {
    return api.get(`/service-provider/services/${id}`);
  }
  getProviderServices(params = {}) {
    const { perPage, offset } = params;

    return api.get("/service-provider/services", {
      params: {
        limit: perPage,
        offset
      }
    });
  }
  addProviderService(values) {
    return api.post(`/service-provider/services`, values);
  }
  updateProviderService(values) {
    return api.post(`/service-provider/services/${values.id}`, values);
  }
  deleteProviderService(id) {
    return api.delete(`/service-provider/services/${id}`);
  }
  requestServicePublish(id) {
    return api.post(`/service-provider/services/${id}/publish-request`);
  }

  // provider posts
  getProviderPost(id) {
    return api.get(`/service-provider/posts/${id}`);
  }
  getProviderPosts(params = {}) {
    const { perPage, offset } = params;

    return api.get("/service-provider/posts", {
      params: {
        limit: perPage,
        offset
      }
    });
  }
  addProviderPost(values) {
    return api.post(`/service-provider/posts`, values);
  }
  updateProviderPost(values) {
    return api.post(`/service-provider/posts/${values.id}`, values);
  }
  deleteProviderPost(id) {
    return api.delete(`/service-provider/posts/${id}`);
  }
  requestPostPublish(id) {
    return api.post(`/service-provider/posts/${id}/publish-request`);
  }

  // public entities
  getProducts(params = {}) {
    const { perPage, offset, ...filter } = params;

    return api.get("/products", {
      params: {
        limit: perPage,
        offset,
        ...filter
      }
    });
  }
  getProduct(id) {
    return api.get(`/products/${id}`);
  }
  getProductsSearchMatches(q) {
    return api.get("/products/search", {
      params: { q }
    });
  }

  getServices(params = {}) {
    const { perPage, offset, ...filter } = params;

    return api.get("/services", {
      params: {
        limit: perPage,
        offset,
        ...filter
      }
    });
  }
  getService(id) {
    return api.get(`/services/${id}`);
  }
  getServicesSearchMatches(q) {
    return api.get("/services/search", {
      params: { q }
    });
  }

  getPosts(params = {}) {
    const { perPage, offset, ...filter } = params;

    return api.get("/posts", {
      params: {
        limit: perPage,
        offset,
        ...filter
      }
    });
  }
  getPost(id) {
    return api.get(`/posts/${id}`);
  }
  getPostsSearchMatches(q) {
    return api.get("/posts/search", {
      params: { q }
    });
  }

  getServiceProviders(params = {}) {
    const { perPage = 999, offset, ...filter } = params;

    return api.get("/service-providers", {
      params: {
        limit: perPage,
        offset,
        ...filter
      }
    });
  }
  getServiceProvider(id) {
    return api.get(`/service-providers/${id}`);
  }
  getServiceProvidersSearchMatches(q) {
    return api.get("/service-providers/search", {
      params: { q }
    });
  }

  // service request
  addServiceRequest(values) {
    return api.post(`/requests`, values);
  }
  updateServiceRequest(values) {
    return api.post(`/requests/${values.id}`, values);
  }
  getServiceRequest(id) {
    return api.get(`/requests/${id}`);
  }
  getServiceRequestList(params = {}) {
    const { perPage, offset, status = [] } = params;

    return api.get("/requests", {
      params: {
        limit: perPage,
        offset,
        status
      }
    });
  }
  getServiceRequestBids(id, params = {}) {
    const { perPage, offset } = params;

    return api.get(`/requests/${id}/responses`, {
      params: {
        limit: perPage,
        offset
      }
    });
  }
  acceptServiceRequestBid(id) {
    return api.post(`/responses/${id}/accept`);
  }
  closeServiceRequest(id) {
    return api.post(`/requests/${id}/close`);
  }
  completeServiceRequest(id) {
    return api.post(`/requests/${id}/complete`);
  }
  sendReviewServiceRequest(id, review, rating) {
    return api.post(`/requests/${id}/review`, {
      review,
      rating
    });
  }

  getServiceRequestForProvider(id) {
    return api.get(`/service-provider/requests/${id}`);
  }
  getProviderServiceRequestList(params = {}) {
    const { perPage, offset } = params;

    return api.get("/service-provider/requests", {
      params: {
        limit: perPage,
        offset
      }
    });
  }
  sendServiceRequestResponse(values) {
    return api.post(`/service-provider/responses`, values);
  }
  getServiceRequestResponses(params) {
    const { perPage, offset, status = [] } = params;

    return api.get(`/service-provider/responses`, {
      params: {
        limit: perPage,
        offset,
        status
      }
    });
  }
  getServiceRequestResponse(id) {
    return api.get(`/service-provider/responses/${id}`);
  }

  serviceRequestGetMessages(requestId, params = {}) {
    const { limit, offset } = params;

    return api.get(`/responses/${requestId}/chat`, {
      params: {
        limit,
        offset
      }
    });
  }
  serviceRequestSendMessage(requestId, message) {
    return api.post(`/responses/${requestId}/chat`, {
      message
    });
  }

  // other
  sendFeedback({ email, name, message }) {
    return api.post("/feedbacks", { email, name, message });
  }
}

export default new ApiService();
