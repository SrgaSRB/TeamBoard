import React, { useEffect } from "react";
import api from "../api";

interface MyProjectsDto {
    projectName: string;
    projectDescription: string;
    createdAt: string;
    allTasks: number;
    teamName: string;
    members: string[];
    toDoTasks: string[];
    inProgressTasks: string[];
    doneTasks: string[];
}

const Projects: React.FC = () => {

    const [projects, setProjects] = React.useState<MyProjectsDto[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/projects/my/");
                console.log(response);
                setProjects(response.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();

    }, []);

    return (
        <section className="projects-section">
            <div className="w-layout-blockcontainer container w-container">
                <div className="projects-wrapper">
                    <h1 className="heading-3">My Projects</h1>
                    <div className="my-projects-list">
                        {projects.map((project, index) => (
                            <div key={index} className="project-div">
                                <div className="div-block-4">
                                    <div>
                                        <div className="text-block-16">{project.projectName}</div>
                                        <div className="text-block-18">
                                            {project.projectDescription}<br />
                                        </div>
                                        <div className="text-block-25">
                                            Created At: <span className="text-span-3">{project.createdAt}</span>
                                        </div>
                                        <div className="text-block-25">
                                            All Tasks: <span className="text-span-3">{project.allTasks}</span>
                                        </div>
                                        <div className="text-block-25">
                                            Team: <span className="text-span-3">{project.teamName}</span>
                                        </div>
                                        <div className="div-block-2">
                                            <div className="text-block-27">Members:</div>
                                            <div className="div-block-3">
                                                {project.members.map((member, index) => (
                                                    <div key={index} className="text-block-26">{member}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="div-block">
                                        <div className="text-block-17">My Tasks:</div>
                                        <div className="text-block-20">
                                            To Do: <span className="text-span-3">{project.toDoTasks.length}</span>
                                        </div>
                                        <div className="text-block-21">
                                            In Progress: <span className="text-span-3">{project.inProgressTasks.length}</span>
                                        </div>
                                        <div className="text-block-22">
                                            Done: <span className="text-span-3">{project.doneTasks.length}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="project-tasks-list">
                                    <div className="projects-to-do">
                                        <div className="text-block-29">To Do</div>
                                        <div className="projects-todo-list">
                                            {project.toDoTasks.map((task, index) => (
                                                <div key={index} className="div-block-5">
                                                    <div className="text-block-30">&gt;</div>
                                                    <div className="text-block-31">{task}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="projects-in-progress">
                                        <div className="text-block-32">In Progress</div>
                                        <div className="projects-in-progress-list">
                                            {project.inProgressTasks.map((task, index) => (
                                                <div key={index} className="div-block-6">
                                                    <div>&gt;</div>
                                                    <div>{task}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="projects-done">
                                        <div className="text-block-33">Done</div>
                                        <div className="projects-done-list">
                                            {project.doneTasks.map((task, index) => (
                                                <div key={index} className="div-block-7">
                                                    <div>&gt;</div>
                                                    <div>{task}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>

    );
}

export default Projects;