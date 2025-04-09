import React from "react";

const SettingsUsers: React.FC = () => {

    return (
        <section className="s-users-section">
        <div className="w-layout-blockcontainer container w-container">
            <div className="s-users-wraper">
                <div className="div-block-25">
                    <div className="w-form">
                        <form id="email-form-8" name="email-form-8" data-name="Email Form 8" method="get" className="form-5" >
                            <div className="text-block-49">Create New User</div>
                            <label htmlFor="field-12">Username</label>
                            <input className="w-input" maxLength={256} name="field-12" data-name="Field 12" placeholder="Enter user username" type="text" id="field-12" required/>
                            <label htmlFor="name-8">Name</label>
                            <input className="w-input" maxLength={256} name="name-8" data-name="Name 8" placeholder="Enter user Full Name" type="text" id="name-8" required/>
                            <label htmlFor="email">Email Address</label>
                            <input className="w-input" maxLength={256} name="email" data-name="Email" placeholder="Enter user e-mail address" type="email" id="email" required/>
                            <label htmlFor="field-13">Password</label>
                            <input className="w-input" maxLength={256} name="field-13" data-name="Field 13" placeholder="Enter user password" type="password" id="field-13" required/>
                            <label className="w-checkbox">
                                <input type="checkbox" name="Show-Password" id="Show-Password" data-name="Show Password" className="w-checkbox-input"/>
                                <span className="w-form-label">Show Password</span>
                            </label>
                            <input type="submit" data-wait="Please wait..." className="submit-button-7 w-button" value="Create"/>
                        </form>
                    </div>
                    <div className="form-block-6 w-form">
                        <form id="email-form-9" name="email-form-9" data-name="Email Form 9" method="get" data-wf-page-id="67f518e3b8d7a81a643bc143" >
                            <div className="text-block-50">Filter Users</div>
                            <label htmlFor="field-14">Username</label>
                            <input className="w-input" maxLength={256} name="field-14" data-name="Field 14" placeholder="User username" type="text" id="field-14"/>
                            <label htmlFor="name-9">Name</label>
                            <input className="w-input" maxLength={256} name="name-9" data-name="Name 9" placeholder="User Full Name" type="text" id="name-9"/>
                            <label htmlFor="email-2">Email Address</label>
                            <input className="w-input" maxLength={256} name="email-2" data-name="Email 2" placeholder="User e-mail address" type="email" id="email-2" required/>
                        </form>
                    </div>
                </div>
                <div className="div-block-26">
                    <div className="text-block-51">All Users</div>
                    <div className="users-div">
                        <div className="user-div">
                            <div className="form-block-5 w-form">
                                <form id="email-form-8" name="email-form-8" data-name="Email Form 8" method="get" className="form-4">
                                    <label htmlFor="field-12">Username</label>
                                    <input className="w-input" maxLength={256} name="field-12" data-name="Field 12" placeholder="user username" type="text" id="field-12" required/>
                                    <label htmlFor="name-8">Name</label>
                                    <input className="w-input" maxLength={256} name="name-8" data-name="Name 8" placeholder="user Full Name" type="text" id="name-8" required/>
                                    <label htmlFor="email-4">Email Address</label>
                                    <input className="w-input" maxLength={256} name="email-4" data-name="Email 4" placeholder="user e-mail address" type="email" id="email-4" required/>
                                    <label htmlFor="field-13">Password</label>
                                    <input className="w-input" maxLength={256} name="field-13" data-name="Field 13" placeholder="user password" type="password" id="field-13" required/>
                                    <label className="w-checkbox">
                                        <input type="checkbox" name="Show-Password-2" id="Show-Password-2" data-name="Show Password 2" className="w-checkbox-input"/>
                                        <span className="w-form-label">Show Password</span>
                                    </label>
                                    <div className="div-block-27">
                                        <input type="submit" data-wait="Please wait..." className="w-button" value="Save Changes"/>
                                        <input type="submit" data-wait="Please wait..." className="button-2 temp w-button" value="Delete user"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="user-div"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    );
}

export default SettingsUsers;