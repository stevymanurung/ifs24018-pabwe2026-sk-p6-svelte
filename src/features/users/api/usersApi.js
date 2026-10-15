import { apiGet, apiPut, apiPost } from '../../../helpers/apiHelper.js';
export const getUsers = () => apiGet('/users');
export const getMe = () => apiGet('/users/me');
export const updateMe = (data) => apiPut('/users/me', data);
export const uploadPhoto = (file) => { const body = new FormData(); body.append('photo',file); return apiPost('/users/me/photo',body); };
export const changePassword = (current_password,new_password) => apiPut('/users/me/password',{current_password,new_password});
