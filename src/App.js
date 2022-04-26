import React from 'react';
import './App.scss';
import ChatPage from './pages/chat-page/chat-page';
import LoginPage from './pages/login-page/login-page';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  

  return (
    <div className="app-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/chat" element={<ChatPage/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}


export default App;
