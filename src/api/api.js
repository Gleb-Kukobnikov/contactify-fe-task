export const BASE_URL = 'https://contactify-api.herokuapp.com/api';

export const getRequest = (url) => fetch(BASE_URL + url).then((response) => response.json());
