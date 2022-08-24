// import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
// import './scss/login.scss'
// import './scss/_reset.scss'
// import './scss/_header.scss'
import './scss/all.scss'
import  Home from './page/Home';
// import  About from './components/About';
import Login from "./page/Login";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home"  element={<Home />} />
        <Route path="/"  element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
