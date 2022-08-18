// import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './scss/login.scss'
import './scss/_reset.scss'
import  Home from './components/Home';
// import  About from './components/About';
import Login from "./page/Login";
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <div className="nav-link">
          <NavLink to="/">
            <p>回到首頁</p>
          </NavLink>
          <NavLink to="/About">
            <p>關於</p>
          </NavLink>
      </div> */}
      <Routes>
        <Route exact={true} path="/"  element={<Home />} />
        <Route path="/Login"  element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
