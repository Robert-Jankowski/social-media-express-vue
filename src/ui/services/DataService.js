import {POSTS_MOCKS} from "../mocks/posts-mocks";
import axios from "axios";
import {FRIENDS_MOCKS, REQUESTS_MOCKS} from "../mocks/friends-mocks";

export class DataService {
  proxy = {
    withCredentials: true,
  };
  baseUrl = 'https://localhost:8080/api/';

  wall = {
    // axios.get(this.buildUrl(`wall/${username}/${wallType}`), this.proxy)
    get: (username, wallType) =>
      Promise.resolve({data: POSTS_MOCKS}),
  }

  friends = {
    // axios.get(this.buildUrl(`user/${userId}/friends`), this.proxy);
    get: (userId) =>
      Promise.resolve({data: {friends: FRIENDS_MOCKS, requests: REQUESTS_MOCKS}}),

    remove: (friendId, userId) =>
      axios.delete(this.buildUrl(`user/${userId}/friends/${friendId}`), this.proxy), // friendId -> friendUsername

    invite: (friendId, userId) =>
      axios.post(this.buildUrl(`user/${userId}/friends/${friendId}/invite`), this.proxy),

    accept: (friendId, userId) =>
      axios.post(this.buildUrl(`user/${userId}/friends/${friendId}/accept`), this.proxy),

    deny: (friendId, userId) =>
      axios.delete(this.buildUrl(`user/${userId}/friends/${friendId}/deny`), this.proxy),
  };

  user =  {
    login: (username, password) =>
      axios.post(this.buildUrl('user/login'), {username, password}, this.proxy),

    register: (username, password) =>
      axios.post(this.buildUrl('user/register'), {username, password}, this.proxy),

    post: ({title, content, type}, userId) =>
      axios.post(this.buildUrl(`user/${userId}`), {title, content, type}, this.proxy)
  };

  post = {
    comment: (postId, userId) =>
      axios.post(this.buildUrl(`wall/${postId}$`), {userId}, this.proxy),
  }

  buildUrl(url) {
    return this.baseUrl + url;
  }
}
