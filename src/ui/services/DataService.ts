import axios from 'axios';
import {PostTypes} from "../../server/types/enums";

export class DataService {
  baseUrl: string;

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getWall (userId: string, wallType: string) {
    const url = this.buildUrl(`wall/${userId}/${wallType}`);

    // return axios.get(url, {
    //   baseURL: this.baseUrl,
    // });
    return Promise.resolve({data: [
      {
        title: 'Title',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur tortor consectetur urna mattis, sit amet suscipit urna tempus. In malesuada tincidunt lobortis.',
        type: PostTypes.PUBLIC,
        author: {
          userId: '61e92c38f23a865083bf47ba',
          username: "Jane Doe",
        },
        comments: [{
          content: 'Vivamus consectetur tortor consectetur urna mattis',
          author: {
            userId: '61e92c38f23a865083bf47ba',
            username: "Jane Doe",
          },
          comments: [],
        }],
      },
    ]});
  }

  private buildUrl (path: string): string {
    return '/api/' + path;
  }
}
