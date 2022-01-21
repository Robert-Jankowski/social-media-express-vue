import {POSTS_MOCKS} from "../mocks/posts-mocks";
import axios from "axios";

export class DataService {
  axiosSettings = {
    withCredentials: true,
  };


  constructor (baseUrl) {
    this.axiosSettings = {
      ...this.axiosSettings,
      baseURL: baseUrl + '/api/',
    };
  }

  getWall (userId, wallType) {
    const url = this.buildUrl(`wall/${userId}/${wallType}`);

    // return axios.get(url, {} ,this.axiosSettings);
    return Promise.resolve({data: POSTS_MOCKS});
  }

  logIn (login, password) {
    return axios.post('user/login', { login, password }, this.axiosSettings);
  }
}
