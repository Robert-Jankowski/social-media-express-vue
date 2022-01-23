import axios from "axios";

class DataService {
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

    remove: (friendUsername, userId) =>
      axios.delete(this.buildUrl(`user/${userId}/friends/${friendUsername}`), this.proxy),

    invite: (friendUsername, userId) =>
      axios.post(this.buildUrl(`user/${userId}/friends/${friendUsername}/invite`), this.proxy),

    accept: (friendUsername, userId) =>
      axios.post(this.buildUrl(`user/${userId}/friends/${friendUsername}/accept`), this.proxy),

    deny: (friendUsername, userId) =>
      axios.delete(this.buildUrl(`user/${userId}/friends/${friendUsername}/deny`), this.proxy),
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
    comment: (postId, userId, content) =>
      axios.post(this.buildUrl(`post/${postId}`), {userId, content}, this.proxy),
  }

  profile = {
    get: (username) =>
      axios.get(this.buildUrl(`user/${username}`, this.proxy)),

    edit: (userId, newData) =>
      axios.put(this.buildUrl(`user/${userId}`), newData, this.proxy),
  }

  buildUrl(url) {
    return this.baseUrl + url;
  }
}

const serviceInstance = new DataService();

export default serviceInstance;
