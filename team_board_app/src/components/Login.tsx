import React from "react";

const Login: React.FC = () => {

    return(
        <section className="login-section">
        <div className="w-layout-blockcontainer container w-container">
            <div className="login-wrapper">
                <div className="form-block w-form">
                    <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form" >
                        <label htmlFor="name">Username</label>
                        <input className="w-input" maxLength={256} name="name" data-name="Name" placeholder="" type="text" id="name"/>
                        <label htmlFor="email">Password</label>
                        <input className="w-input" maxLength={256} name="email" data-name="Email" placeholder="" type="password" id="email" required/>
                        <input type="submit" data-wait="Please wait..." className="submit-button w-button" value="Prijavi se"/>
                    </form>
                </div>
            </div>
        </div>
    </section>

    );

}

export default Login;