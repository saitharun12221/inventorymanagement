import axios from "axios";
const Api_Url="http://localhost:8080/api";
export const getList=()=>axios.get(Api_Url);
export const createInventory=(item)=>axios.post(Api_Url,item);
export const updateInventory=(id,item)=>axios.put(`${Api_Url}/${id}`,item);
export const deleteInventory=(id)=>axios.delete(`${Api_Url}/${id}`);
export const searchInventory=(product)=>axios.get(`${Api_Url}/search?product=${product}`);
export const getProductsortedbyprice=(sortBy)=>axios.get(`${Api_Url}/sorted?sortBy=${sortBy}`);
export const searchbyStatus=(status)=>axios.get(`${Api_Url}/status?status=${status}`);