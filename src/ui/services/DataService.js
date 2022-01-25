import axios from "axios";

class DataService {
  baseUrl = 'https://localhost:8080/api/';

  wall = {
    get: (username, isPrivate) =>
      axios.get(this.buildUrl(`wall/${username}${isPrivate ? '/private' : ''}`), this.getProxy()),
  }
  friends = {
    get: (userId) =>
      axios.get(this.buildUrl(`user/${userId}/friends`), this.getProxy()),

    remove: (friendUsername, userId) =>
      axios.delete(this.buildUrl(`user/${userId}/friends/${friendUsername}`), this.getProxy()),

    invite: (friendUsername, userId) =>
      axios.post(this.buildUrl(`user/${userId}/friends/${friendUsername}/invite`), undefined, this.getProxy()),

    accept: (friendUsername, userId) =>
      axios.post(this.buildUrl(`user/${userId}/friends/${friendUsername}/accept`), undefined, this.getProxy()),

    deny: (friendUsername, userId) =>
      axios.delete(this.buildUrl(`user/${userId}/friends/${friendUsername}/deny`), this.getProxy()),
  };

  user = {
    login: (username, password) =>
      axios.post(this.buildUrl('user/login'), {username, password}, this.getProxy()),

    register: (username, password) =>
      axios.post(this.buildUrl('user/register'), {username, password}, this.getProxy()),

    post: ({title, content, type}, userId) =>
      axios.post(this.buildUrl(`user/${userId}`), {title, content, type}, this.getProxy()),
  };

  post = {
    comment: (postId, userId, content) =>
      axios.post(this.buildUrl(`post/${postId}`), {userId, content}, this.getProxy()),
  }

  profile = {
    get: (username) =>
      axios.get(this.buildUrl(`user/${username}`), this.getProxy()),

    edit: (userId, newData) =>
      axios.put(this.buildUrl(`user/${userId}`), newData, this.getProxy()),
  }

  buildUrl(url) {
    return this.baseUrl + url;
  }

  getProxy() {
    const token = sessionStorage.getItem('microwall-jwt');
    return {
      headers: { Authorization: `Bearer token=${token}` }
    };
  }
}

const serviceInstance = new DataService();

export default serviceInstance;
