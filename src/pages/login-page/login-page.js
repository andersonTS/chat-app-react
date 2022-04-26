import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Link } from "react-router-dom";
import './login-page.scss'

const clientId = "626536912684-rqi479hsd700r0v7e1t06uk7ri9153ks.apps.googleusercontent.com";

function LoginPage() {
    const [isSiginIn, setIsSigin] = useState(false)
    const [userName, setUserName] = useState([]) 
    
    const onLoginSuccess = (res) => {
        alert('Login Success, welcom to chat: ' + res.profileObj.name);
        console.log(res.profileObj)
        setIsSigin(true)
        setUserName(res.profileObj.name)
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };


    return (
        <div className="login-page-container">
            <Link  to="/chat">
                <button className="start-btn" >Start chat</button>
            </Link>
            <GoogleLogin
                    clientId={clientId}
                    buttonText={isSiginIn ? userName : 'Sign in'}
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    isSignedIn={false}
                    cookiePolicy={"single_host_origin"}
                />
        </div>
    );
}
export default LoginPage;