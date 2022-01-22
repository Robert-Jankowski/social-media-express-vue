
export const mainPageErrorMapper = (error) => {
  const errorCode = +(error?.response?.status ?? '500');

  switch (errorCode) {
    case 400:
      return 'Something is wrong about your request body... Are you sure you are not going to hack us?';
    case 401:
      return 'Wrong credentials! Pass correct username and password.';
    case 406:
      return 'Someone is already using this username. Let\'s try another one!';
    case 500:
      return 'Uhhhh, that\'s probably some server side issue... don\'t worry, not your fault :)';
    default:
      return 'I\'m not sure what happened here...';
  }
};
