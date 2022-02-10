
export const loginPageErrorMapper = (error) => {
  const errorCode = +(error?.response?.status ?? '0');

  switch (errorCode) {
    case 400:
      return 'Something is wrong about your request body... Are you sure you are not going to hack us?';
    case 401:
      return 'Wrong credentials! Pass correct username and password.';
    case 403:
      return 'Error: you should not exist, but you exist. Weird.';
    case 404:
      return 'That user does not exist.';
    case 406:
      return 'Someone is already using this username. Let\'s try another one!';
    case 500:
      return 'Uhhhh, that\'s probably some server side issue... don\'t worry, not your fault :)';
    default:
      return 'I\'m not sure what happened here...';
  }
};
