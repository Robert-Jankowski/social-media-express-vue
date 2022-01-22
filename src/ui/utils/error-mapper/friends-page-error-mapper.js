
export const friendsPageErrorMapper = (error) => {
  const errorCode = +(error?.response?.status ?? '500');

  switch (errorCode) {
    case 404:
      return 'Are you sure this IDs owner is real?';
    case 500:
      return 'Uhhhh, that\'s probably some server side issue... don\'t worry, not your fault :)';
    default:
      return 'I\'m not sure what happened here...';
  }
};
