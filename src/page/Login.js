// import {Link} from "react-router-dom";
import React, { useContext } from "react";
import Logo from "../assets/img/todoListLogo.png";
import LoginBg from "../assets/img/loginbg.png";
import { useForm } from "react-hook-form";
import  {userLogin, userRegister}  from "../scripts/api";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import  { LoignStatus }  from '../scripts/theme';

const { useState , useEffect } = React;

function Login() {
  const { register, handleSubmit, watch, formState: { errors },reset} = useForm();
  let navigate = useNavigate();
  const loginStatus = useContext(LoignStatus);
  const Login = loginStatus.login;

    const [status,setStatus]=useState('Login');
     // eslint-disable-next-line
    const email_val = /^([A-Za-z0-9_\.\-\+])+\@(([a-zA-Z0-9\_-])+\.)+([a-zA-Z0-9\.]{2,4})+$/m;

    useEffect(()=>{
      if(Login === true){
        navigate('/home');
      } // eslint-disable-next-line react-hooks/exhaustive-deps
    },[Login]);

    //login
    const onSubmit = async form =>{

      console.log(watch('email'));
      try {
        const response = await userLogin({user:form});
        console.log(response)
        const token = JSON.stringify({token:response.headers})
        const userName = JSON.stringify({user:response.data})
        localStorage.setItem('token', token);
        localStorage.setItem('userName',userName)
        loginStatus.setlogin(true);
      } catch (err) {
        console.log(err)
        toast.error(err.response.data.message);
      }
    }

    const onRegisterSubmuit = async form =>{
      try {
        const response = await userRegister({user:form});
        toast.success(response.data.message);
        setStatus('Login');
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message +':' + err.response.data.error)
      }
    }

    const onRegister = () =>{
      setStatus('register');
      reset({email:null,password:null,nickname:null},{ //清空欄位資料
        keepValues:false,
      })
    }

    const onLogin = () =>{
      setStatus('Login');
      reset({email:null,password:null},{ //清空欄位資料
        keepValues:false,
      })
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
                      <input className="loginInput"  placeholder="請輸入email" {...register('email',{required:true,
                      pattern:{value:email_val}})}/>
                      <div className="errorMessage">{errors.email && errors.email.type==="required" && "此欄位不可為空"}</div>
                      <div className="errorMessage">{errors.email && errors.email.type==="pattern" && "email輸入格式有誤"}</div>
                      <label className="loginTitle">密碼</label>
                      <input  className="loginInput" type="password" placeholder="請輸入密碼" {...register('password',{required:true})}/>
                      <div className="sendData">
                      <button className="formControls_btnSubmit" type="submit">登入</button>
                      <button className="formControls_btnLink" id="registerBtn" onClick={()=>onRegister()}>註冊帳號</button>
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
                    <input className="loginInput" id="email" name="register_email" autoComplete="off" placeholder="請輸入email" {...register('email',{required:true,
                      pattern:{// eslint-disable-next-line
                      value:/^([A-Za-z0-9_\.\-\+])+\@(([a-zA-Z0-9\_-])+\.)+([a-zA-Z0-9\.]{2,4})+$/m}})}/> 
                    <div className="errorMessage">{errors.email && errors.email.type==="required" && "此欄位不可為空"}</div>
                    <div className="errorMessage">{errors.email && errors.email.type==="pattern" && "email輸入格式有誤"}</div>
                    <label className="loginTitle">您的暱稱</label>
                    <input className="loginInput" name="register_name" placeholder="請輸入您的暱稱" {...register('nickname',{required:true})}/>
                    <label className="loginTitle">密碼</label>
                    <input  className="loginInput" type="password" name="register_password" placeholder="請輸入密碼" {...register('password',{required:true,minLength:{value:6}})}/>
                    <div className="errorMessage">{errors.password && errors.password.type==="required" && "此欄位不可為空"}</div>
                    <div className="errorMessage">{errors.password && errors.password.type==="minLength" && "密碼長度至少為6碼"}</div>
                    <label className="loginTitle">再次輸入密碼</label>
                    <input  className="loginInput" type="password" name="register_passowordII" placeholder="請再次輸入密碼" {...register('checkpassword',{required:true,minLength:{value:6} ,validate: (value) => {
                    if (watch('password') !== value) {
                      return "與第一次密碼輸入不同";
                    }
                }})}/>
                    <div className="errorMessage">{errors.checkpassword && errors.checkpassword.type==="minLength" && "密碼長度至少為6碼"}</div>
                    <div className="errorMessage">{errors.checkpassword&& errors.checkpassword.type==="required" && "此欄位不可為空"}</div>
                    <div className="errorMessage">{errors.checkpassword&& errors.checkpassword.type==="validate" && errors.checkpassword.message}</div>
                    <div className="sendData">
                    <button className="formControls_btnSubmit" type="submit">註冊帳號</button>
                    <button className="formControls_btnLink" onClick={()=>onLogin()}>登入</button>
                    </div>
                </form>
              </div>
          </div>
        </div>
          }
          <Toaster
          position="top-center"
          reverseOrder={false}
          />
        </>
    );
  }

  export default Login;