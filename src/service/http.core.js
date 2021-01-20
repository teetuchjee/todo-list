import axios from "axios";
import { SERVER_CONFIG } from "../config";
const { API_URL } =
  SERVER_CONFIG[process.env.NODE_ENV] || SERVER_CONFIG.development;

console.log(API_URL);

export default class HttpCoreService {
  get(url, req, options = {}) {
    return axios
      .get(this.mapURL(url), req, options)
      .then((res) => (res ? res.data : []));
  }

  post(url, req, options = {}) {
    return axios
      .post(this.mapURL(url), req, options)
      .then((res) => (res ? res.data : []));
  }

  put(url, req, options = {}) {
    return axios
      .put(this.mapURL(url), req, options)
      .then((res) => (res ? res.data : []));
  }

  delete(url) {
    return axios.delete(this.mapURL(url)).then((res) => (res ? res.data : []));
  }

  mapURL(url) {
    return `${API_URL}/${url}`;
  }
}
