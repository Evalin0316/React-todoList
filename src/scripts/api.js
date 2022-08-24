import axios from "axios";
const url = 'https://todoo.5xcamp.us';

//Users

//登入
export const userLogin = (data) => {
    return axios.post(`${url}/users/sign_in`, data);;
    
}

//註冊
export const userRegister = (data) => {
   return axios.post(`${url}/users`, data);
    
}

//登出
export const userLogout = () =>{
    return axios.delete(`${url}/users/sign_out`,{
        headers:{
            authorization:JSON.parse(localStorage.token).token.authorization
        }
    });
}

//Todos

//新增項目
export const addTodo = (data) =>{
    return axios.post(`${url}/todos`,data,{
        headers:{
            authorization:JSON.parse(localStorage.token).token.authorization
        }
    })
}

//取得列表

export const getTodoList = () =>{
    return axios.get(`${url}/todos`,{
        headers:{
            authorization:JSON.parse(localStorage.token).token.authorization
        }
    })
}

// 刪除項目

export const deleteItem = (id) =>{
    return axios.delete(`${url}/todos/${id}`,{
        headers:{
            authorization:JSON.parse(localStorage.token).token.authorization
        }
    })
}

// todo完成/已完成 切換
export const statusChange = (id) =>{
    return axios.patch(`${url}/todos/${id}/toggle`,{} ,{
        headers:{
            authorization:JSON.parse(localStorage.token).token.authorization
        }
    })
}

// 編輯項目
export const editItem = (id,data) =>{
    return axios.put(`${url}/todos/${id}`,data,{
        headers:{
            authorization:JSON.parse(localStorage.token).token.authorization
        }
    })
}