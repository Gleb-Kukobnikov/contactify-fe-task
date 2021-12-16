import { getRequest } from './api';

export const getContacts = () => getRequest('/contacts');
export const getContactDetails = (id) => getRequest(`/contacts/${id}`);
