import api from './axios';
export const registerUser= (data:{
    username:string;
    password:string;
})=>api.post('auth/register',data);

export const loginUser=(data:{
    username:string;
    password:string;        
})=>api.post('auth/login',data);