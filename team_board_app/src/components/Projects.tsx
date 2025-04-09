import React from "react";

const Projects: React.FC = () => {

    return(
        <section className="projects-section">
        <div className="w-layout-blockcontainer container w-container">
            <div className="projects-wrapper">
                <h1 className="heading-3">My Projects</h1>
                <div className="my-projects-list">
                    <div className="project-div">
                        <div className="div-block-4">
                            <div>
                                <div className="text-block-16">Project name</div>
                                <div className="text-block-18">
                                    Description<br/>
                                </div>
                                <div className="text-block-25">
                                    Created At: <span className="text-span-3">12.12.2012</span>
                                </div>
                                <div className="text-block-25">
                                    All Tasks: <span className="text-span-3">50</span>
                                </div>
                                <div className="text-block-25">
                                    Team: <span className="text-span-3">Team1</span>
                                </div>
                                <div className="div-block-2">
                                    <div className="text-block-27">Members:</div>
                                    <div className="div-block-3">
                                        <div className="text-block-26">Srdjan</div>
                                    </div>
                                </div>
                            </div>
                            <div className="div-block">
                                <div className="text-block-17">My Tasks:</div>
                                <div className="text-block-20">
                                    To Do: <span className="text-span-3">3</span>
                                </div>
                                <div className="text-block-21">
                                    In Progress: <span className="text-span-3">3</span>
                                </div>
                                <div className="text-block-22">
                                    Done: <span className="text-span-3">6</span>
                                </div>
                            </div>
                        </div>
                        <div className="project-tasks-list">
                            <div className="projects-to-do">
                                <div className="text-block-29">To Do</div>
                                <div className="projects-todo-list">
                                    <div className="div-block-5">
                                        <div className="text-block-30">&gt;</div>
                                        <div className="text-block-31">Zavrsi ovo danas Zavrsi ovo danasZavrsi ovo danasZavrsi ovo danas</div>
                                    </div>
                                </div>
                            </div>
                            <div className="projects-in-progress">
                                <div className="text-block-32">In Progress</div>
                                <div className="projects-in-progress-list">
                                    <div className="div-block-6">
                                        <div>&gt;</div>
                                        <div>Zavrsi ovo danasZavrsi ovo danasZavrsi ovo danasZavrsi ovo danasZavrsi ovo danasZavrsi ovo danas</div>
                                    </div>
                                </div>
                            </div>
                            <div className="projects-done">
                                <div className="text-block-33">Done</div>
                                <div className="projects-done-list">
                                    <div className="div-block-7">
                                        <div>&gt;</div>
                                        <div>Zavrsena hoem pageZavrsena hoem pageZavrsena hoem pageZavrsena hoem pageZavrsena hoem pageZavrsena hoem page</div>
                                    </div>
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

export default Projects;