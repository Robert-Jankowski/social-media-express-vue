import {POSTS_MOCKS} from "../mocks/posts-mocks";
import axios from "axios";
import {FRIENDS_MOCKS, REQUESTS_MOCKS} from "../mocks/friends-mocks";

export class DataService {
  proxy = {
    withCredentials: true,
  };
  baseUrl = 'https://localhost:8080/api/';

  getWall (userId, wallType) {
    // return axios.get(this.buildUrl(`wall/${userId}/${wallType}`), this.proxy);  // userId -> username
    return Promise.resolve({data: POSTS_MOCKS});
  }


  // MERGE INTO ONE --------------------------------------------------------------

  getFriends (userId) {
    // return axios.get(this.buildUrl(`user/${userId}/friends`), this.proxy);
    return Promise.resolve({data: FRIENDS_MOCKS});
  }

  getFriendsRequests (userId) {
    // return axios.get(this.buildUrl(`user/${userId}/requests`), this.proxy);
    return Promise.resolve({data: REQUESTS_MOCKS});
  }

  // -----------------------------------------------------------------------------

  removeFriend(friendId, userId) {
    return axios.delete(this.buildUrl(`user/${userId}/friends/${friendId}`), this.proxy); // friendId -> friendUsername
  }

  inviteFriend(friendId, userId) {
    return axios.post(this.buildUrl(`user/${userId}/friends/${friendId}/invite`), this.proxy); // friendId -> friendUsername
  }

  acceptFriend(friendId, userId) {
    return axios.post(this.buildUrl(`user/${userId}/friends/${friendId}/accept`), this.proxy); // friendId -> friendUsername
  }

  denyFriend(friendId, userId) {
    return axios.delete(this.buildUrl(`user/${userId}/friends/${friendId}/deny`), this.proxy); // friendId -> friendUsername
  }

  loginUser (username, password) {
    return axios.post(this.buildUrl('user/login'), { username, password }, this.proxy);
  }

  registerUser (username, password) {
    return axios.post(this.buildUrl('user/register'), { username, password }, this.proxy);
  }

  post ({title, content, type}, userId) {
    return axios.post(this.buildUrl(`user/${userId}`), { title, content, type }, this.proxy);
  }

  buildUrl(url) {
    return this.baseUrl + url;
  }
}
