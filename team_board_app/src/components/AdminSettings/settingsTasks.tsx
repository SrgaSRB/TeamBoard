import React from "react";

const SettingsTasks: React.FC = () => {

    return(
        <section className="s-tasks-section">
            <div className="w-layout-blockcontainer container w-container">
                <div className="s-tasks-wrapper">
                    <div className="div-block-23">
                        <div className="w-form">
                            <form id="email-form-6" name="email-form-6" data-name="Email Form 6" method="get" className="form-6">
                                <div className="text-block-46">Create New Task</div>
                                <label htmlFor="name">Name</label>
                                <input className="text-field-8 w-input" maxLength={256} name="name-7" data-name="Name 7" placeholder="" type="text" id="name-7"/>
                                <label htmlFor="field-4">Description</label>
                                <textarea placeholder="Enter task description" maxLength={5000} id="field-4" name="field-4" data-name="Field 4" className="textarea w-input"></textarea>
                                <label htmlFor="field-6">Project</label>
                                <select id="field-6" name="field-6" data-name="Field 6" className="select-field-2 w-select">
                                    <option value="">Select one...</option>
                                    <option value="First">First choice</option>
                                    <option value="Second">Second choice</option>
                                    <option value="Third">Third choice</option>
                                </select>
                                <label htmlFor="field-8">User</label>
                                <select id="field-8" name="field-8" data-name="Field 8" className="select-field-3 w-select">
                                    <option value="">Select one...</option>
                                    <option value="First">First choice</option>
                                    <option value="Second">Second choice</option>
                                    <option value="Third">Third choice</option>
                                </select>
                                <label htmlFor="field-7">Priority</label>
                                <select id="field-7" name="field-7" data-name="Field 7" className="select-field-4 w-select">
                                    <option value="">Select one...</option>
                                    <option value="First">First choice</option>
                                    <option value="Second">Second choice</option>
                                    <option value="Third">Third choice</option>
                                </select>
                                <label htmlFor="field-9">Deadline</label>
                                <select id="field-9" name="field-9" data-name="Field 9" className="select-field-5 w-select">
                                    <option value="">Select one...</option>
                                    <option value="First">First choice</option>
                                    <option value="Second">Second choice</option>
                                    <option value="Third">Third choice</option>
                                </select>
                                <input type="submit" data-wait="Please wait..." className="submit-button-7 w-button" value="Create"/>
                            </form>
                        </div>
                    </div>
                    <div className="div-block-24">
                        <div className="w-form">
                            <form id="email-form-7" name="email-form-7" data-name="Email Form 7" method="get" className="form-3">
                                <div className="task-filter-div">
                                    <label htmlFor="field-10">Name</label>
                                    <input className="text-field-9 w-input" maxLength={256} name="field-10" data-name="Field 10" placeholder="Example Text" type="text" id="field-10" required/>
                                </div>
                                <div className="task-filter-div">
                                    <label htmlFor="field-11">Project</label>
                                    <input className="text-field-10 w-input" maxLength={256} name="field-10" data-name="Field 10" placeholder="Example Text" type="text" id="field-10" required/>
                                </div>
                                <div className="task-filter-div">
                                    <label htmlFor="field-11">Team</label>
                                    <input className="text-field-11 w-input" maxLength={256} name="field-10" data-name="Field 10" placeholder="Example Text" type="text" id="field-10" required/>
                                </div>
                                <div className="task-filter-div">
                                    <label htmlFor="field-11">Deadline</label>
                                    <input className="text-field-12 w-input" maxLength={256} name="field-10" data-name="Field 10" placeholder="Example Text" type="text" id="field-10" required/>
                                </div>
                                <div className="task-filter-div">
                                    <label htmlFor="field-11">Priority</label>
                                    <select id="field-11" name="field-11" data-name="Field 11" className="select-field w-select">
                                        <option value="">Select one...</option>
                                        <option value="First">First choice</option>
                                        <option value="Second">Second choice</option>
                                        <option value="Third">Third choice</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="tasks-list">
                            <div className="task">
                                <div className="text-block-47">Title</div>
                                <div>Description</div>
                                <div>
                                    Project: <span className="text-span-10">Project1</span>
                                </div>
                                <div>
                                    Status: <span className="text-span-10">ToDo</span>
                                </div>
                                <div>
                                    Priority: <span className="text-span-10">Low</span>
                                </div>
                                <div>
                                    Deadline: <span className="text-span-10">12.12.2012</span>
                                </div>
                                <div>
                                    User: <span className="text-span-10">Srdjan</span>
                                </div>
                                <a className="button-4 w-button">Delete Task</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default SettingsTasks;