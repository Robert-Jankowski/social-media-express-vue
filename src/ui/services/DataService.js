import axios from "axios";
import 'dotenv/config';

class DataService {
  baseUrl;

  constructor() {
    this.baseUrl = `https://${process.env.APP_HOST ?? 'localhost'}:${process.env.APP_PORT ?? 8080}/api/`;
  }

  wall = {
    get: (username, isPrivate) =>
      axios.get(this.buildUrl(`wall/${username}${isPrivate ? '/private' : ''}`), this.getProxy()),
  }
  friends = {
    get: () =>
      axios.get(this.buildUrl(`friends`), this.getProxy()),

    remove: (friendUsername) =>
      axios.delete(this.buildUrl(`friends/${friendUsername}`), this.getProxy()),

    invite: (friendUsername) =>
      axios.post(this.buildUrl(`friends/${friendUsername}/invite`), undefined, this.getProxy()),

    accept: (friendUsername) =>
      axios.post(this.buildUrl(`friends/${friendUsername}/accept`), undefined, this.getProxy()),

    deny: (friendUsername) =>
      axios.delete(this.buildUrl(`friends/${friendUsername}/deny`), this.getProxy()),
  };

  user = {
    login: (username, password) =>
      axios.post(this.buildUrl('user/login'), {username, password}),

    register: (username, password) =>
      axios.post(this.buildUrl('user/register'), {username, password}),

    revive: () =>
      axios.post(this.buildUrl('user/revive'), undefined, this.getProxy()),

    post: ({title, content, type}) =>
      axios.post(this.buildUrl(`user`), {title, content, type}, this.getProxy()),
  };

  post = {
    comment: (postId, content) =>
      axios.post(this.buildUrl(`post/${postId}`), {content}, this.getProxy()),
  }

  profile = {
    get: (username) =>
      axios.get(this.buildUrl(`user/${username}`), this.getProxy()),

    edit: (newData) =>
      axios.put(this.buildUrl(`user`), newData, this.getProxy()),
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
