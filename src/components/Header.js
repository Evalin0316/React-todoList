import React,{useContext,useEffect} from "react";
import Logo from "../assets/img/todoListLogo.png";
import { useNavigate } from 'react-router-dom';
import  { userLogout }  from "../scripts/api";
import  { LoignStatus }  from '../scripts/theme';

function Header(){
    // const [logOut,setLogOut] = useState(false);
    const userName = JSON.parse(localStorage.userName).user.nickname;
    let navigate = useNavigate();
    const loignStatus = useContext(LoignStatus);

    const handleClick = async() =>{
        try {
            const response = await userLogout();
            alert(response.data.message);
            loignStatus.setlogin(false);
          } catch (err) {
            alert(err.response.data.message);
          }
        }
       
    

    useEffect(()=>{
        if(loignStatus.login === false){
          navigate('/');
        }
    },[loignStatus.login]);


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

