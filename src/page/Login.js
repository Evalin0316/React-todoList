// import {Link} from "react-router-dom";
import React from "react";
import Logo from "../assets/img/todoListLogo.png";
import LoginBg from "../assets/img/loginbg.png";
import { useForm } from "react-hook-form";
import  {userLogin, userRegister}  from "../scripts/api";
import { useNavigate } from 'react-router-dom';

const { useState , useEffect } = React;

function Login() {
  const { register, handleSubmit, watch, formState: { errors }} = useForm();
    let navigate = useNavigate();

    const [login,setLogin] = useState(false);
    const [status,setStatus]=useState('Login');
    const email_val = /^([A-Za-z0-9_\.\-\+])+\@(([a-zA-Z0-9\_-])+\.)+([a-zA-Z0-9\.]{2,4})+$/m;

    useEffect(()=>{
      if(login){
        navigate('/home');
      }
    });

    //login
    const onSubmit = async form =>{

      console.log(watch('email'));
      try {
        const response = await userLogin({user:form});
        console.log(response)
        const token = JSON.stringify({token:response.headers})
        const userName = JSON.stringify({user:response.data})
        localStorage.setItem('token', token);
        localStorage.setItem('userName',userName);
        setLogin(true);
      } catch (err) {
        alert(err.response.data.message +':' + err.response.data.error);
      }
    }

    const onRegisterSubmuit = async form =>{
      try {
        const response = await userRegister({user:form});
        alert(response.data.message);
        setStatus('Login');
      } catch (err) {
         alert(err.response.data.message +':' + err.response.data.error);
        
      }
    }

    return (
      <>
      { status === 'Login' ? 
        <div id="loginPage" className="loginContainer">
            <div className="loginPage vhContainer">
                <div className="side">
                <img className="logoImg" src={Logo} alt=""/>
                 <img className="d-m-n" src={LoginBg} alt=""/>
                </div>
                <div>
                  <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="contentTitle">最實用的線上代辦事項服務</h2>
                      <label className="loginTitle">Email</label>
                      <input className="loginInput"   placeholder="請輸入email" {...register('email',{required:true,
                      pattern:{value:email_val}})}/>
                      <div className="errorMessage">{errors.email && errors.email.type==="required" && "此欄位不可為空"}</div>
                      <div className="errorMessage">{errors.email && errors.email.type==="pattern" && "email輸入格式有誤"}</div>
                      <label className="loginTitle">密碼</label>
                      <input  className="loginInput"  placeholder="請輸入密碼" {...register('password',{required:true})}/>
                      <div className="sendData">
                      <button className="formControls_btnSubmit" type="submit">登入</button>
                      <button className="formControls_btnLink" onClick={()=>setStatus('register')}>註冊帳號</button>
                      </div>
                  </form>
                </div>
            </div>
        </div> 
        :
        //register
        <div id="loginPage" className="loginContainer">
          <div className="loginPage vhContainer">
              <div className="side">
              <img className="logoImg" src={Logo} alt=""/>
               <img className="d-m-n" src={LoginBg} alt=""/>
              </div>
              <div>
                <form className="formControls" onSubmit={handleSubmit(onRegisterSubmuit)}>
                  <h2 className="contentTitle">註冊帳號</h2>
                    <label className="loginTitle">Email</label>
                    <input className="loginInput" name="register_email" autocomplete="off" placeholder="請輸入email" {...register('email',{required:true,
                      pattern:{value:/^([A-Za-z0-9_\.\-\+])+\@(([a-zA-Z0-9\_-])+\.)+([a-zA-Z0-9\.]{2,4})+$/m}})}/>
                    <div className="errorMessage">{errors.email && errors.email.type==="required" && "此欄位不可為空"}</div>
                    <div className="errorMessage">{errors.email && errors.email.type==="pattern" && "email輸入格式有誤"}</div>
                    <label className="loginTitle">您的暱稱</label>
                    <input className="loginInput" name="register_name" placeholder="請輸入您的暱稱" {...register('nickname',{required:true})}/>
                    <label className="loginTitle">密碼</label>
                    <input  className="loginInput" name="register_password" placeholder="請輸入密碼" {...register('password',{required:true})}/>
                    <label className="loginTitle">再次輸入密碼</label>
                    <input  className="loginInput" name="register_passowordII" placeholder="請再次輸入密碼" {...register('password',{required:true})}/>
                    <div className="sendData">
                    <button className="formControls_btnSubmit" type="submit">註冊帳號</button>
                    <button className="formControls_btnLink" onClick={()=>setStatus('Login')}>登入</button>
                    </div>
                </form>
              </div>
          </div>
        </div>
          }
        </>
    );
  }

  export default Login;