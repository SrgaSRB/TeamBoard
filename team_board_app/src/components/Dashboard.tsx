import React, { useEffect, useState } from "react";
import api from "../api";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Team {
    teamName: string;
    teamDescription: string;
    projects: string[];
}

interface MyProject {
    projectName: string;
    projectDescription: string;
    tasks: string[];
}

interface HighPriorityTask {
    taskName: string;
    taskDescription: string;
    status: string;
}

interface TaskStatus {
    status: string;
    count: number;
}


const Dashboard: React.FC = () => {

    const [teams, setTeams] = React.useState<Team[]>([]);
    const [projects, setProjects] = React.useState<MyProject[]>([]);
    const [highPriorityTasks, setHighPriorityTasks] = React.useState<HighPriorityTask[]>([]);
    const [taskStatus, setTaskStatus] = React.useState<TaskStatus[]>([]);

    const [radius, setRadius] = useState(80);

    useEffect(() => {
        const updateRadius = () => {
            if (window.innerWidth < 480) {
                setRadius(60); 
            } else if (window.innerWidth < 768) {
                setRadius(70);
            } else {
                setRadius(80); 
            }
        };

        updateRadius(); 
        window.addEventListener("resize", updateRadius); 
        return () => window.removeEventListener("resize", updateRadius);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/dashboard/");
                console.log(response.data);
                setTeams(response.data.teams);
                setProjects(response.data.projects);
                setHighPriorityTasks(response.data.highPriorityTasks);
                setTaskStatus(response.data.taskStatus);

                console.log(taskStatus);


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);



    return (
        <section className="home-section">
            <div className="w-layout-blockcontainer container w-container">
                <div className="home-wrapper">
                    <div className="home-column">
                        <h2 className="heading">My Teams</h2>
                        <div className="home-column-list">
                            {teams.map((team, index) => (
                                <div key={index} className="home-column-list-item temp1">
                                    <div className="text-block-2">{team.teamName}</div>
                                    <div className="text-block-4">{team.teamDescription}</div>
                                    <div className="home-column-list-item-list">
                                        {team.projects.map((project, index) => (
                                            <div key={index} className="text-block-3 projects-list">{project}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="home-column">
                        <h2 className="heading">My Projects</h2>
                        <div className="home-column-list">
                            {projects.map((project, index) => (
                                <div key={index} className="home-column-list-item temp2">
                                    <div className="text-block-2">{project.projectName}</div>
                                    <div className="text-block-6">{project.projectDescription}</div>
                                    <div className="home-column-list-item-list">
                                        {project.tasks.map((task, index) => (
                                            <div key={index} className="text-block-3 temp-dashboard">{task}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="home-column column-2rows">
                        <div className="home-important-tasks">
                            <h2 className="heading">High Priority Tasks</h2>
                            <div className="home-column-list">
                                {highPriorityTasks.map((task, index) => (
                                    <div key={index} className="home-column-list-item">
                                        <div className="text-block-2">{task.taskName}</div>
                                        <div className="text-block-6">{task.taskDescription}</div>
                                        <div className="home-column-list-item-list">
                                            <div className="text-block-3 ip-list">{task.status}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="home-tasks-chart">
                            <div className="chart-map">
                                <div className="text-block-7"></div>
                                {taskStatus.map((status, index) => {
                                    let className = "text-block-8"; // Default class
                                    if (status.status === "InProgress") {
                                        className = "text-block-9";
                                    } else if (status.status === "Done") {
                                        className = "text-block-10";
                                    }
                                    return (
                                        <div key={index} className={className}>
                                            {status.status}: <span className="text-span">{status.count}</span>
                                        </div>
                                    );
                                })}
                                <div className="text-block-12">Total: <span className="text-span">{taskStatus.reduce((acc, status) => acc + status.count, 0)}</span></div>
                            </div>
                            <div className="chart-div">
                                <div className="chart-wrapper" style={{ width: "100%", height: "100%" }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={taskStatus}
                                                dataKey="count"
                                                nameKey="status"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={radius}
                                                fill="#8884d8"
                                                label
                                            >
                                                {taskStatus.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={["#f2c94c", "#f2994a", "#27ae60", "#FF8042"][index % 4]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Dashboard;