import axios from "axios";

export class DataService {
  proxy = {
    withCredentials: true,
  };
  baseUrl = 'https://localhost:8080/api/';

  wall = {
    get: (username, isPrivate) =>
      axios.get(this.buildUrl(`wall/${username}`), {...this.proxy, params: { isPrivate }}),
  }
  friends = {
    get: (userId) =>
      axios.get(this.buildUrl(`user/${userId}/friends`), this.proxy),

    remove: (friendId, userId) =>
      axios.delete(this.buildUrl(`user/${userId}/friends/${friendId}`), this.proxy),

    invite: (friendId, userId) =>
      axios.post(this.buildUrl(`user/${userId}/friends/${friendId}/invite`), this.proxy),

    accept: (friendId, userId) =>
      axios.post(this.buildUrl(`user/${userId}/friends/${friendId}/accept`), this.proxy),

    deny: (friendId, userId) =>
      axios.delete(this.buildUrl(`user/${userId}/friends/${friendId}/deny`), this.proxy),
  };

  user = {
    login: (username, password) =>
      axios.post(this.buildUrl('user/login'), {username, password}, this.proxy),

    register: (username, password) =>
      axios.post(this.buildUrl('user/register'), {username, password}, this.proxy),

    post: ({title, content, type}, userId) =>
      axios.post(this.buildUrl(`user/${userId}`), {title, content, type}, this.proxy),
  };

  post = {
    comment: (postId, userId) =>
      axios.post(this.buildUrl(`wall/${postId}$`), {userId}, this.proxy),
  }

  profile = {
    get: (username) =>
      axios.get(this.buildUrl(`user/${username}`, this.proxy)),

    edit: (userId, newData) =>
      axios.patch(this.buildUrl(`user/${userId}`), newData, this.proxy),
  }

  buildUrl(url) {
    return this.baseUrl + url;
  }
}
