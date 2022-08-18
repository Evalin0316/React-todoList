// import {Link} from "react-router-dom";
import React from "react";
import Logo from "../assets/img/todoListLogo.png";
import LoginBg from "../assets/img/loginbg.png";
// import { useNavigate } from 'react-router-dom';

function Login() {
    return (
      <>
        <div id="loginPage" class="loginContainer">
            <div className="loginPage vhContainer">
                <div className="side">
                <img className="logoImg" src={Logo} alt=""/>
                 <img className="d-m-n" src={LoginBg} alt=""/>
                </div>
                <div>
                  <form className="formControls">
                    <h2 className="contentTitle">最實用的線上代辦事項服務</h2>
                      <label className="loginTitle">Email</label>
                      <input className="loginInput" placeholder="請輸入email"/>
                      <label className="loginTitle">密碼</label>
                      <input  className="loginInput" placeholder="請輸入密碼"/>
                      <div class="sendData">
                      <button className="formControls_btnSubmit" type="button">登入</button>
                      <button className="formControls_btnLink">註冊帳號</button>
                      </div>
                      
                  </form>
                </div>
            </div>
        </div>
      </>
    );
  }

  export default Login;