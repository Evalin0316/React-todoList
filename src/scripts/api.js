import axios from "axios";

const url = 'https://todoo.5xcamp.us';

export const userLogin = (data) => {
    return axios.post(`${url}/users/sign_in`, data);;
    
}

export const userRegister = (data) => {
   return axios.post(`${url}/users`, data);
    
}