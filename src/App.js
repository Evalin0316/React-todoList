import { Routes, Route } from "react-router-dom";
import './scss/all.scss'
import  Home from './page/Home';
import Login from "./page/Login";
import './App.css';
import ThemeProvider from  './scripts/theme'

function App() {
  return (
    <div className="App">
    <ThemeProvider>
      <Routes>
        <Route path="/home"  element={<Home />} />
        <Route path="/"  element={<Login />} />
      </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
