import React from "react";
import Logo from "../assets/img/todoListLogo.png";
import { useNavigate } from 'react-router-dom';
import  { userLogout }  from "../scripts/api";


const { useState , useEffect } = React;

function Header(){
    const [logOut,setLogOut] = useState(false);
    const userName = JSON.parse(localStorage.userName).user.nickname;
    let navigate = useNavigate();

    const handleClick = async() =>{
        try {
            const response = await userLogout();
            alert(response.data.message);
            setLogOut(true)
          } catch (err) {
            alert(err.response.data.message);
          }
        }
       
    

    useEffect(()=>{
        if(logOut){
          navigate('/');
        }
    });


    return (
        <>
        <div className="headerInfo">
        <div className="headerLogo"><img className="logo" src={Logo} alt=""/></div>
        <div className="rightHeader">
        <div className="userName">{userName}的代辦</div>
        <div className="logOut"  onClick={handleClick}>登出</div>
        </div>
       </div>
        </>
    )    
}


export default Header;

