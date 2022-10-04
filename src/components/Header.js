import React, { useContext, useEffect, useState } from "react";
import Logo from "../assets/img/todoListLogo.png";
import { useNavigate } from 'react-router-dom';
import { userLogout } from "../scripts/api";
import { LoignStatus } from '../scripts/theme';
import LogoutDialog from '../components/LogoutDialog';

function Header() {
    const [islogOut,setIsLogOut] = useState(false);
    const userName = JSON.parse(localStorage.userName).user.nickname;
    let navigate = useNavigate();
    const loignStatus = useContext(LoignStatus);
    const [dialog,setDialog] = useState(false); //dialog 顯示
    const handleClick = async () => {
        try {
            setDialog(true);
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    useEffect(() => {
        if (islogOut) {
            const logOut = async() =>{
                const response = await userLogout();
                alert(response.data.message);
            }
            logOut();
            setIsLogOut(true);
            loignStatus.setlogin(false);
            navigate('/');
        }
    }, [islogOut]);


    return (
        <>
        {dialog ? <LogoutDialog  setDialog={setDialog} setIsLogOut={setIsLogOut}/> : null}
            <div className="headerInfo">
                <div className="headerLogo"><img className="logo" src={Logo} alt="" /></div>
                <div className="rightHeader">
                    <div className="userName">{userName}的代辦</div>
                    <div className="logOut" onClick={handleClick}>登出</div>

                </div>
            </div>
        </>
    )
}


export default Header;

