import {POSTS_MOCKS} from "../mocks/posts-mocks";
import axios from "axios";

export class DataService {
  proxy = {
    withCredentials: true,
  };
  baseUrl = 'https://localhost:8080/api/';

  getWall (userId, wallType) {
    const url = this.buildUrl(`wall/${userId}/${wallType}`);

    // return axios.get(url, {} ,this.axiosSettings);
    return Promise.resolve({data: POSTS_MOCKS});
  }

  logIn (login, password) {
    console.log(this.proxy)
    return axios.post(this.buildUrl('user/login'), { login, password }, this.proxy);
  }

  buildUrl(url) {
    return this.baseUrl + url;
  }
}
