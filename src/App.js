import { Routes, Route } from "react-router-dom";
import './scss/all.scss'
import  Home from './page/Home';
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
