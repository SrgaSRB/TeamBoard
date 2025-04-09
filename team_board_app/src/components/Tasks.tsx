import React from "react";

const Tasks: React.FC = () => {

    return(
        <section className="tasks-section">
        <div className="w-layout-blockcontainer container w-container">
            <div className="task-wrapper">
                <h1 className="heading-4">My Tasks</h1>
                <div className="tasks-div-block">
                    <div className="todo-tasks-div">
                        <div className="div-block-9">
                            <div className="text-block-34">TO DO</div>
                        </div>
                        <div className="div-block-8">
                            <div className="task-div">
                                <div className="text-block-23">Finish this UI</div>
                                <div className="text-block-24">Finish all ui/ux tasks</div>
                                <div>
                                    Project: <span className="text-span-4">Task Manager</span>
                                </div>
                                <div>
                                    Priority: <span className="text-span-5">Low/Medium/high</span>
                                </div>
                                <div>
                                    Deadline: <span className="text-span-6">11.04.2025.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="in-progress-tasks-div">
                        <div className="div-block-10">
                            <div className="text-block-35">IN PREOGRESS</div>
                        </div>
                        <div className="div-block-11">
                            <div className="task-div">
                                <div className="text-block-23">Finish this UI</div>
                                <div className="text-block-24">Finish all ui/ux tasks</div>
                                <div>
                                    Project: <span className="text-span-4">Task Manager</span>
                                </div>
                                <div>
                                    Priority: <span className="text-span-5">Low/Medium/high</span>
                                </div>
                                <div>
                                    Deadline: <span className="text-span-6">11.04.2025.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="done-tasks-div">
                        <div className="div-block-12">
                            <div className="text-block-36">DONE</div>
                        </div>
                        <div className="div-block-13">
                            <div className="task-div">
                                <div className="text-block-23">Finish this UI</div>
                                <div className="text-block-24">Finish all ui/ux tasks</div>
                                <div>
                                    Project: <span className="text-span-4">Task Manager</span>
                                </div>
                                <div>
                                    Priority: <span className="text-span-5">Low/Medium/high</span>
                                </div>
                                <div>
                                    Deadline: <span className="text-span-6">11.04.2025.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    );

}

export default Tasks;