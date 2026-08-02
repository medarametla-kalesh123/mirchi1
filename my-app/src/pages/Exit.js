import { useNavigate } from "react-router-dom";

function Exit(){

    const navigate=useNavigate();

    const logout=()=>{

        localStorage.removeItem("isLoggedIn");

        navigate("/login");
    }

    return(

        <button onClick={logout}>
            Logout
        </button>

    );

}

export default Exit;