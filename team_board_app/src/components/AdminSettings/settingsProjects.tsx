import React from "react";

const SettingsProjects: React.FC = () => {

    return (
        <section className="s-projects-section">
            <div className="w-layout-blockcontainer container w-container">
                <div className="s-projects-wrapper">
                    <div className="div-block-20">
                        <div className="w-form">
                            <form id="email-form-4" name="email-form-4" data-name="Email Form 4" method="get" className="form-7" >
                                <div className="text-block-44">Create New Project</div>
                                <label htmlFor="name-5">Name</label>
                                <input className="w-input" maxLength={256} name="name-5" data-name="Name 5" placeholder="Enter project name" type="text" id="name-5" required />
                                <label htmlFor="field-4">Description</label>
                                <textarea placeholder="Enter project description" maxLength={5000} id="field-4" name="field-4" data-name="Field 4" className="textarea w-input"></textarea>
                                <label htmlFor="field-5">Select Team</label>
                                <select id="field-5" name="field-5" data-name="Field 5" required className="w-select">
                                    <option value="">Select one...</option>
                                </select>
                                <input type="submit" data-wait="Please wait..." className="submit-button-7 w-button" value="Create" />
                            </form>
                        </div>
                        <div className="w-form">
                            <form id="email-form-5" name="email-form-5" data-name="Email Form 5" method="get">
                                <label htmlFor="name-6">Name</label>
                                <input className="w-input" maxLength={256} name="name-6" data-name="Name 6" placeholder="Enter Project Name" type="text" id="name-6" />
                                <div className="div-block-18">
                                    <div>
                                        <label htmlFor="field-5">Min users</label>
                                        <input className="w-input" maxLength={256} name="field-3" data-name="Field 3" placeholder="Enter number" type="text" id="field-3" required />
                                    </div>
                                    <div>
                                        <label htmlFor="field-5">Max Users</label>
                                        <input className="text-field-4 w-input" maxLength={256} name="field-3" data-name="Field 3" placeholder="Enter number" type="text" id="field-3" required />
                                    </div>
                                </div>
                                <div className="div-block-18">
                                    <div>
                                        <label htmlFor="field-5">Min Tasks</label>
                                        <input className="w-input" maxLength={256} name="field-3" data-name="Field 3" placeholder="Enter number" type="text" id="field-3" required />
                                    </div>
                                    <div>
                                        <label htmlFor="field-5">Max Tasks</label>
                                        <input className="text-field-4 w-input" maxLength={256} name="field-3" data-name="Field 3" placeholder="Enter number" type="text" id="field-3" required />
                                    </div>
                                </div>
                                <div className="div-block-18">
                                    <div>
                                        <label htmlFor="field-5">Min Tasks To Do</label>
                                        <input className="w-input" maxLength={256} name="field-3" data-name="Field 3" placeholder="Enter number" type="text" id="field-3" required />
                                    </div>
                                    <div>
                                        <label htmlFor="field-5">Max Tasks To Do</label>
                                        <input className="text-field-4 w-input" maxLength={256} name="field-3" data-name="Field 3" placeholder="Enter number" type="text" id="field-3" required />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="div-block-21">
                        <div className="text-block-45">All Projects</div>
                        <div className="projects-list-s">
                            <div className="project-div-s">
                                <div className="div-block-22">
                                    <div className="form-block-3 w-form">
                                        <form id="wf-form-" name="wf-form-" data-name="" method="get">
                                            <label htmlFor="name-2">Name</label>
                                            <input className="text-field w-input" name="name-2" data-name="Name 2" placeholder="Project 1" type="text" id="name-2" />
                                            <label htmlFor="field-2">Description</label>
                                            <textarea placeholder="Description of project 1" maxLength={5000} id="field-2" name="field-2" data-name="Field 2" className="textarea-2 w-input"></textarea>
                                            <div>
                                                Members: <span className="text-span-8">10</span>
                                            </div>
                                            <div>
                                                Created at: <span className="text-span-8">10</span>
                                            </div>
                                            <div className="text-block-40">
                                                Tasks: <span className="text-span-9">10</span>
                                                (4/3/3)
                                            </div>
                                            <div className="div-block-19">
                                                <input type="submit" data-wait="Please wait..." className="w-button" value="Save Changes" />
                                                <a className="button-3 w-button">Delete Project</a>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="form-block-4 w-form">
                                        <form id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get" className="form-2">
                                            <div className="text-block-38">Add new user in Project</div>
                                            <input className="text-field-2 w-input" name="name-3" data-name="Name 3" placeholder="Search users" type="text" id="name-3" />
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
                                            <input type="submit" data-wait="Please wait..." className="submit-button-2 w-button" value="Add in Project" />
                                        </form>
                                    </div>
                                </div>
                                <div className="div-block-15">
                                    <div className="text-block-37">Project1 Users</div>
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

export default SettingsProjects;