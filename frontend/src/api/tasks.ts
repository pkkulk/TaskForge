import api from './axios';
export const getTasks=()=>api.get('/tasks');

export const createTask=(data:{
    title:string;
    description?:string;
    status:string;
})=>api.post('/tasks',data);

export const updateTask=(id:string,data:any)=>api.put(`/tasks/${id}`,data);

export const deleteTask=(id:string)=>api.delete(`/tasks/${id}`);