
export const friendsPageErrorMapper = (error) => {
  const errorCode = +(error?.response?.status ?? '0');

  switch (errorCode) {
    case 401:
      return 'I see some illegal things happening here... Santa is not coming to you this year.';
    case 403:
      return 'Error: you should not exist, but you exist. Weird.';
    case 404:
      return 'That person was not found!';
    case 405:
      return 'You and your friend are already... friends!';
    case 406:
      return 'You have already invited them!';
    case 500:
      return 'Uhhhh, that\'s probably some server side issue... don\'t worry, not your fault :)';
    default:
      return 'I\'m not sure what happened here...';
  }
};
