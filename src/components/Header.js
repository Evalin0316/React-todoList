import React, { useContext, useEffect, useState } from "react";
import Logo from "../assets/img/todoListLogo.png";
import { useNavigate } from 'react-router-dom';
import { userLogout } from "../scripts/api";
import LogoutDialog from '../components/LogoutDialog';
import  { ThemeContext, LoginStatus }  from '../scripts/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const [isLogOut,setIsLogOut] = useState(false);
    const userName = JSON.parse(localStorage.userName).user.nickname;
    let navigate = useNavigate();
    const loginStatus = useContext(LoginStatus);
    const [dialog,setDialog] = useState(false); //dialog 顯示

    const handleClick = async () => {
        try {
            setDialog(true);
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    useEffect(() => {
        if (isLogOut) {
            const logOut = async() =>{
                const response = await userLogout();
                alert(response.data.message);
            }
            logOut();
            setIsLogOut(true);
            loginStatus.onLogin(false);
            navigate('/');
        }
    }, [isLogOut, loginStatus, navigate]);

    const ThemeButton = () =>{
        const {toggleTheme} = useContext(ThemeContext)
        return <button className="modeButton" onClick={toggleTheme}><FontAwesomeIcon icon={faCircleHalfStroke} size="2x" /></button>
    }

    return (
        <>
        {dialog ? <LogoutDialog  setDialog={setDialog} setIsLogOut={setIsLogOut}/> : null}
            <div className="headerInfo">
                <div className="headerLogo"><img className="logo" src={Logo} alt="" /></div>
                <div className="rightHeader">
                    <div className="modeTheme"><ThemeButton/></div>
                    <div className="userName">{userName}的代辦</div>
                    <div className="logOut" onClick={handleClick}>登出</div>

                </div>
            </div>
        </>
    )
}


export default Header;

