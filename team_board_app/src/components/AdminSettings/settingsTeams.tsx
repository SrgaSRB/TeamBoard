import React from "react";

const SettingsTeams: React.FC = () => {

    return (
        <section className="s-team-section">
            <div className="w-layout-blockcontainer container w-container">
                <div className="s-team-wrapper">
                    <div className="div-block-17">
                        <div className="form-block-2 w-form">
                            <div className="text-block-39">Create New Team</div>
                            <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-8">
                                <label htmlFor="name">Name</label>
                                <input className="text-field-3 w-input" maxLength={256} name="name" data-name="Name" placeholder="Enter team name" type="text" id="name" required />
                                <label htmlFor="field">Description</label>
                                <textarea placeholder="Enter team description" maxLength={5000} id="field" name="field" data-name="Field" className="textarea w-input"></textarea>
                                <input type="submit" data-wait="Please wait..." className="submit-button-7 w-button" value="Create" />
                            </form>
                        </div>
                        <div className="w-form">
                            <form id="email-form-3" name="email-form-3" data-name="Email Form 3" method="get">
                                <div className="text-block-42">Filter Teams</div>
                                <label htmlFor="name-4">Name</label>
                                <input className="w-input" maxLength={256} name="name-4" data-name="Name 4" placeholder="Enter name" type="text" id="name-4" />
                                <div className="div-block-18">
                                    <div>
                                        <label htmlFor="field-3">Min users</label>
                                        <input className="w-input" maxLength={256} name="field-3" data-name="Field 3" placeholder="Enter number" type="text" id="field-3" required />
                                    </div>
                                    <div>
                                        <label htmlFor="field-3">Max Users</label>
                                        <input className="text-field-4 w-input" maxLength={256} name="field-3" data-name="Field 3" placeholder="Enter number" type="text" id="field-3" required />
                                    </div>
                                </div>
                                <div className="div-block-18">
                                    <div>
                                        <label htmlFor="field-3">Min Projects</label>
                                        <input className="w-input" maxLength={256} name="field-3" data-name="Field 3" placeholder="Enter number" type="text" id="field-3" required />
                                    </div>
                                    <div>
                                        <label htmlFor="field-3">Max Projects</label>
                                        <input className="w-input" maxLength={256} name="field-3" data-name="Field 3" placeholder="Enter number" type="text" id="field-3" required />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="div-block-14">
                        <div className="text-block-41">All teams:</div>
                        <div className="teams-list">
                            <div className="teams-div">
                                <div className="div-block-16">
                                    <div className="form-block-3 w-form">
                                        <form id="wf-form-" name="wf-form-" data-name="" method="get" >
                                            <label htmlFor="name-2">Name</label>
                                            <input className="text-field w-input" maxLength={256} name="name-2" data-name="Name 2" placeholder="Team 1" type="text" id="name-2" />
                                            <label htmlFor="field-2">Description</label>
                                            <textarea placeholder="Description of team 1" maxLength={5000} id="field-2" name="field-2" data-name="Field 2" className="textarea-2 w-input"></textarea>
                                            <div>
                                                Members: <span className="text-span-8">10</span>
                                            </div>
                                            <div className="text-block-40">
                                                Projects: <span className="text-span-8">10</span>
                                            </div>
                                            <div className="div-block-19">
                                                <input type="submit" data-wait="Please wait..." className="w-button" value="Save Changes" />
                                                <a className="button-3 w-button">Delete Team</a>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="form-block-4 w-form">
                                        <form id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get" className="form-2" >
                                            <div className="text-block-38">Add new user in team</div>
                                            <input className="text-field-2 w-input" maxLength={256} name="name-3" data-name="Name 3" placeholder="Search users" type="text" id="name-3" />
                                            <div className="new-user-list">
                                                <div className="new-user">
                                                    <div>
                                                        Full name: <span className="text-span-7">Srdjan Delic</span>
                                                    </div>
                                                    <div>
                                                        Username: <span className="text-span-7">Srga02</span>
                                                    </div>
                                                    <div>
                                                        E-mail: <span className="text-span-7">srdjandelic02@gmail.com</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="submit" data-wait="Please wait..." className="submit-button-2 w-button" value="Add in team" />
                                        </form>
                                    </div>
                                </div>
                                <div className="div-block-15">
                                    <div className="text-block-37">Team 1 Users</div>
                                    <div className="team-users-div">
                                        <div className="team-user-div">
                                            <div>
                                                Full name: <span className="text-span-7">Srdjan Delic</span>
                                            </div>
                                            <div>
                                                Username: <span className="text-span-7">Srga02</span>
                                            </div>
                                            <div>
                                                E-mail: <span className="text-span-7">srdjandelic02@gmail.com</span>
                                            </div>
                                        </div>
                                    </div>
                                    <a className="button-2 w-button">Remove user from team</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SettingsTeams;