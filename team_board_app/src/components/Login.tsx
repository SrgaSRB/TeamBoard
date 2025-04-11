import React, {useState} from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); 
    
        try {
            const response = await api.post("/auth/login", {
                username,
                password
            });
    
            const data = response.data;
    
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify({
                id: data.id,
                username: data.username,
                isGlobalAdmin: data.isGlobalAdmin
            }));
    
            navigate("/"); 
    
        } catch (error: any) {
            if (error.response?.status === 401) {
                setError("Pogrešno korisničko ime ili lozinka.");
            } else {
                setError("Došlo je do greške. Pokušaj ponovo.");
            }
        }
    };

    return(
        <section className="login-section">
        <div className="w-layout-blockcontainer container w-container">
            <div className="login-wrapper">
                <div className="form-block w-form">
                    <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form" onSubmit={handleSubmit}>
                        <label htmlFor="name">Username</label>
                        <input className="w-input" maxLength={256} name="name" data-name="Name" placeholder="" type="text" id="name" onChange={(e) => setUsername(e.target.value)}/>

                        <label htmlFor="email">Password</label>
                        <input className="w-input" maxLength={256} name="email" data-name="Email" placeholder="" type="password" id="email" required onChange={(e) => setPassword(e.target.value)}/>

                        <input type="submit" data-wait="Please wait..." className="submit-button w-button" value="Prijavi se"/>

                        {error && <p style={{color : "red"}}>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    </section>

    );

}

export default Login;