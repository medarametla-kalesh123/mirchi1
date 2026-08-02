import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Login.css";

function Login(){

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const navigate=useNavigate();

    const handleLogin=(e)=>{

        e.preventDefault();

        const storedUser=
            JSON.parse(localStorage.getItem("user"));

        if(
            storedUser &&
            username===storedUser.username &&
            password===storedUser.password
        ){

            localStorage.setItem("isLoggedIn","true");

            navigate("/");
        }
        else{

            alert("Invalid Username or Password");
        }
    };

    return(

        <div className="login-page">

            <form onSubmit={handleLogin}>

                <h2>Login</h2>

                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Login
                </button>

                <p className="bottom-text">
                    New user?
                    <Link to="/register"> Register</Link>
                </p>

            </form>

        </div>

    );
}

export default Login;