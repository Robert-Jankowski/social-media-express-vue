export const POSTS_MOCKS = [
  {
    title: 'New post 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur tortor consectetur urna mattis, sit amet suscipit urna tempus. In malesuada tincidunt lobortis.',
    author: {
      userId: '61e92c38f23a865083bf47ba',
      username: "Jack Ryan",
    },
    comments: [
      {
        content: 'Vivamus consectetur tortor consectetur urna mattis',
        author: {
          userId: '61e92c38f23a865083bf47ba',
          username: "Tom Hanks",
        }
      },
      {
        content: 'Vivamus consectetur tortor consectetur urna mattis',
        author: {
          userId: '61e92c38f23a865083bf47ba',
          username: "Jane Doe",
        },
      }],
  },
  {
    title: 'New post 2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur tortor consectetur urna mattis, sit amet suscipit urna tempus. In malesuada tincidunt lobortis.',
    author: {
      userId: '61e92c38f23a865083bf47ba',
      username: "Jane Doe",
    },
    comments: [
      {
        content: 'Vivamus consectetur tortor consectetur urna mattis',
        author: {
          userId: '61e92c38f23a865083bf47ba',
          username: "Jan Kowalski",
        }
      },
      {
        content: 'Vivamus consectetur tortor consectetur urna mattis',
        author: {
          userId: '61e92c38f23a865083bf47ba',
          username: "Adam Malinowski",
        },
      }],
  },
];
