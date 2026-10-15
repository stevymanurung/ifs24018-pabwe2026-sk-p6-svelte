import { apiPost } from '../../../helpers/apiHelper.js';
export async function login(email,password){const result=await apiPost('/auth/login',{email,password});return result?.data||result;}
export async function register(name,email,password){const result=await apiPost('/auth/register',{name,email,password});return result?.data||result;}
