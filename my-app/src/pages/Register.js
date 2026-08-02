import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Register(){

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const navigate=useNavigate();

    const handleRegister=(e)=>{

        e.preventDefault();

        const user={
            username,
            password
        };

        localStorage.setItem("user",JSON.stringify(user));

        alert("Registration Successful");

        navigate("/login");
    };

    return(

        <div className="login-page">

            <form onSubmit={handleRegister}>

                <h2>Register</h2>

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
                    Register
                </button>

                <p className="bottom-text">
                    Already have account?
                    <Link to="/login"> Login</Link>
                </p>

            </form>

        </div>

    );
}

export default Register;