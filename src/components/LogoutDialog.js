import React from "react";

const LogoutDialog = ({setDialog,setIsLogOut}) =>{
    const setDialogs = setDialog;
    const setlogOut = setIsLogOut;
    const logOut = () => {
        setlogOut(true);
        setDialogs(false);
    }
    return(
        <>
        <div className="dialogModal">
        <div className="dialog">
        <div className="titleLogout">確定要登出嗎?</div>
        <div className="question">
        <div className="confirmBtn" onClick={logOut}>是</div>
        <div className="cancelBtn" onClick={()=>setDialogs(false)}>否</div>
        </div>
        </div>
        </div>
        </>
    )
}

export default LogoutDialog;
