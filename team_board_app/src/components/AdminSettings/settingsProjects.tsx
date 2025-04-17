import React, { useEffect, useState } from "react";
import api from "../../api";

interface ProjectData {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    toDoCount: number;
    inProgressCount: number;
    doneCount: number;
    users: User[];
    outsideUsers: User[];
}

interface User {
    id: string;
    name: string;
    email: string;
    username: string;
}

interface Team {
    id: string;
    name: string;
}


const SettingsProjects: React.FC = () => {

    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);

    const [newProjectName, setNewProjectName] = useState<string>("");
    const [newProjectDescription, setNewProjectDescription] = useState<string>("");
    const [newProjectTeam, setNewProjectTeam] = useState<string>("");

    const [editValues, setEditValues] = useState<Record<string, { name: string; description: string }>>({});

    const [filterProjectName, setFilterProjectName] = useState<string>("");
    const [filterMinUsers, setFilterMinUsers] = useState<number | null>(null);
    const [filterMaxUsers, setFilterMaxUsers] = useState<number | null>(null);
    const [filterMinTasks, setFilterMinTasks] = useState<number | null>(null);
    const [filterMaxTasks, setFilterMaxTasks] = useState<number | null>(null);
    const [filterMinTasksToDo, setFilterMinTasksToDo] = useState<number | null>(null);
    const [filterMaxTasksToDo, setFilterMaxTasksToDo] = useState<number | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/projects/");
                setProjects(response.data);

                setEditValues(
                    response.data.reduce((acc: any, project: ProjectData) => {
                        acc[project.id] = { name: project.name, description: project.description };
                        return acc;
                    }, {})
                );

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/teams/names-and-ids/");
                setTeams(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleRemoveFromProject = async (projectId: string, userId: string) => {
        try {
            const response = await api.delete(`/projects/${projectId}/remove-user/${userId}`);
            setProjects((prevProjects) =>
                prevProjects.map((project) => {
                    if (project.id !== projectId) return project;

                    const removedUser = project.users.find((user) => user.id === userId);
                    if (!removedUser) return project;

                    return {
                        ...project,
                        users: project.users.filter((user) => user.id !== userId),
                        outsideUsers: [...project.outsideUsers, removedUser],
                        memberCount: project.users.length - 1,
                    };

                })
            )
        }
        catch (error) {
            console.error("Error removing user from project:", error);
        }
    };

    const handleAddUserToProject = async (projectId: string, userId: string) => {
        try {
            const response = await api.post(`/projects/${projectId}/add-user/${userId}`);
            setProjects((prevProjects) =>
                prevProjects.map((project) => {

                    if (project.id !== projectId) return project;

                    const addedUser = project.outsideUsers.find((user) => user.id === userId);
                    if (!addedUser) return project;

                    return {
                        ...project,
                        users: [...project.users, addedUser],
                        outsideUsers: project.outsideUsers.filter((user) => user.id !== userId),
                        memberCount: project.users.length + 1,
                    };

                })
            )
        }
        catch (error) {
            console.error("Error adding user to project:", error);
        }
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/projects/", {
                name: newProjectName,
                description: newProjectDescription,
                teamId: newProjectTeam,
            });

            const newProject = response.data;

            setProjects((prevProjects) => [...prevProjects, newProject]);

            setEditValues((prev) => ({
                ...prev,
                [newProject.id]: {
                    name: newProject.name,
                    description: newProject.description,
                },
            }));

        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    const handleDeleteProject = async (projectId: string) => {
        try {
            await api.delete(`/projects/${projectId}`);
            setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    }

    const saveChanges = async (e: React.FormEvent, projectId: string) => {

        e.preventDefault();

        const { name, description } = editValues[projectId];

        try {
            await api.put(`/projects/${projectId}/`, {
                name,
                description,
            });
            setProjects((prevProjects) =>
                prevProjects.map((project) => {
                    if (project.id !== projectId) return project;
                    return { ...project, name, description };
                })
            );
            window.alert("Changes saved successfully!");
        } catch (error) {
            console.error("Failed to save changes:", error);
        }
    }


    return (
        <section className="s-projects-section">
            <div className="w-layout-blockcontainer container w-container">
                <div className="s-projects-wrapper">
                    <div className="div-block-20">
                        <div className="w-form">
                            <form id="email-form-4" name="email-form-4" data-name="Email Form 4" method="get" className="form-7" onSubmit={handleCreateProject}>
                                <div className="text-block-44">Create New Project</div>
                                <label htmlFor="name-5">Name</label>
                                <input className="w-input" maxLength={256} name="name-5" data-name="Name 5" placeholder="Enter project name" type="text" id="name-5" required onChange={(e) => (setNewProjectName(e.target.value))} />
                                <label htmlFor="field-4">Description</label>
                                <textarea placeholder="Enter project description" maxLength={5000} id="field-4" name="field-4" data-name="Field 4" className="textarea w-input" required onChange={(e) => (setNewProjectDescription(e.target.value))} />
                                <label htmlFor="field-5">Select Team</label>
                                <select
                                    id="field-5"
                                    name="field-5"
                                    data-name="Field 5"
                                    required
                                    className="w-select"
                                    onChange={(e) => setNewProjectTeam(e.target.value)}
                                >
                                    {teams.map((team) => (
                                        <option key={team.id} value={team.id}>
                                            {team.name}
                                        </option>
                                    ))}
                                </select>
                                <input type="submit" data-wait="Please wait..." className="submit-button-7 w-button" value="Create" />
                            </form>
                        </div>
                        <div className="w-form">
                            <form id="email-form-5" name="email-form-5" data-name="Email Form 5" method="get">
                                <label htmlFor="name-6">Name</label>
                                <input className="w-input" maxLength={256} name="name-6" data-name="Name 6" placeholder="Enter Project Name" type="text" id="name-6"
                                    value={filterProjectName || ""}
                                    onChange={(e) => setFilterProjectName(e.target.value)}
                                />
                                <div className="div-block-18">
                                    <div>
                                        <label htmlFor="field-5">Min users</label>
                                        <input className="w-input" maxLength={256} name="field-3" data-name="Field 3" placeholder="Enter number" type="number" id="field-3"
                                            value={filterMinUsers !== null ? filterMinUsers : ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setFilterMinUsers(value !== "" ? parseInt(value) : null);
                                            }} />
                                    </div>
                                    <div>
                                        <label htmlFor="field-5">Max Users</label>
                                        <input className="text-field-4 w-input" maxLength={256} name="field-3" data-name="Field 3" placeholder="Enter number" type="number" id="field-3"
                                            value={filterMaxUsers !== null ? filterMaxUsers : ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setFilterMaxUsers(value !== "" ? parseInt(value) : null);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="div-block-18">
                                    <div>
                                        <label htmlFor="field-5">Min Tasks</label>
                                        <input className="w-input" maxLength={256} name="field-3" data-name="Field 3" placeholder="Enter number" type="number" id="field-3"
                                            value={filterMinTasks !== null ? filterMinTasks : ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setFilterMinTasks(value !== "" ? parseInt(value) : null);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="field-5">Max Tasks</label>
                                        <input className="text-field-4 w-input" maxLength={256} name="field-3" data-name="Field 3" placeholder="Enter number" type="number" id="field-3"
                                            value={filterMaxTasks !== null ? filterMaxTasks : ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setFilterMaxTasks(value !== "" ? parseInt(value) : null);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="div-block-18">
                                    <div>
                                        <label htmlFor="field-5">Min Tasks To Do</label>
                                        <input className="w-input" maxLength={256} name="field-3" data-name="Field 3" placeholder="Enter number" type="number" id="field-3"
                                            value={filterMinTasksToDo !== null ? filterMinTasksToDo : ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setFilterMinTasksToDo(value !== "" ? parseInt(value) : null);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="field-5">Max Tasks To Do</label>
                                        <input className="text-field-4 w-input" maxLength={256} name="field-3" data-name="Field 3" placeholder="Enter number" type="number" id="field-3"
                                            value={filterMaxTasksToDo !== null ? filterMaxTasksToDo : ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setFilterMaxTasksToDo(value !== "" ? parseInt(value) : null);
                                            }}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="div-block-21">
                        <div className="text-block-45">All Projects</div>
                        <div className="projects-list-s">

                            {projects
                                .filter((project) => project.name.toLowerCase().includes(filterProjectName.toLowerCase()) &&
                                    (filterMinUsers === null || project.users.length >= filterMinUsers) &&
                                    (filterMaxUsers === null || project.users.length <= filterMaxUsers) &&
                                    (filterMinTasks === null || (project.toDoCount + project.inProgressCount + project.doneCount) >= filterMinTasks) &&
                                    (filterMaxTasks === null || (project.toDoCount + project.inProgressCount + project.doneCount) <= filterMaxTasks) &&
                                    (filterMinTasksToDo === null || project.toDoCount >= filterMinTasksToDo) &&
                                    (filterMaxTasksToDo === null || project.toDoCount <= filterMaxTasksToDo)
                                )
                                .map((projects) => (
                                    <div className="project-div-s">
                                        <div className="div-block-22">
                                            <div className="form-block-3 w-form">
                                                <form id="wf-form-" name="wf-form-" data-name="" method="get" onSubmit={(e) => saveChanges(e, projects.id)}>
                                                    <label htmlFor="name-2">Name</label>
                                                    <input
                                                        className="text-field w-input"
                                                        name="name-2"
                                                        data-name="Name 2"
                                                        placeholder="Project 1"
                                                        type="text"
                                                        id="name-2"
                                                        required
                                                        value={editValues[projects.id]?.name || ""}
                                                        onChange={(e) =>
                                                            setEditValues((prev) => ({
                                                                ...prev,
                                                                [projects.id]: {
                                                                    ...prev[projects.id],
                                                                    name: e.target.value,
                                                                },
                                                            }))
                                                        }
                                                    />
                                                    <label htmlFor="field-2">Description</label>
                                                    <textarea
                                                        placeholder="Description of project 1"
                                                        maxLength={5000}
                                                        id="field-2"
                                                        name="field-2"
                                                        data-name="Field 2"
                                                        className="textarea-2 w-input"
                                                        value={editValues[projects.id]?.description || ""}
                                                        onChange={(e) =>
                                                            setEditValues((prev) => ({
                                                                ...prev,
                                                                [projects.id]: {
                                                                    ...prev[projects.id],
                                                                    description: e.target.value,
                                                                },
                                                            }))
                                                        }
                                                    ></textarea>
                                                    <div>
                                                        Members: <span className="text-span-8">{projects.users.length}</span>
                                                    </div>
                                                    <div>
                                                        Created at: <span className="text-span-8">{new Date(projects.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="text-block-40">
                                                        Tasks: <span className="text-span-9">{projects.toDoCount + projects.inProgressCount + projects.doneCount}</span>
                                                        ({projects.toDoCount}/{projects.inProgressCount}/{projects.doneCount})
                                                    </div>
                                                    <div className="div-block-19">
                                                        <input type="submit" data-wait="Please wait..." className="w-button" value="Save Changes" />
                                                        <a className="button-3 w-button" onClick={() => handleDeleteProject(projects.id)}>Delete Project</a>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="form-block-4 w-form">
                                                <form id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get" className="form-2">
                                                    <div className="text-block-38">Add new user in Project</div>
                                                    <input className="text-field-2 w-input" name="name-3" data-name="Name 3" placeholder="Search users" type="text" id="name-3" />
                                                    <div className="new-user-list">
                                                        {projects.outsideUsers.map((user) => (
                                                            <div className="new-user" key={user.id}>
                                                                <div>
                                                                    Full name: <span className="text-span-7">{user.name}</span>
                                                                </div>
                                                                <div>
                                                                    Username: <span className="text-span-7">{user.username}</span>
                                                                </div>
                                                                <div>
                                                                    E-mail: <span className="text-span-7">{user.email}</span>
                                                                </div>
                                                                <a className="link-block-5 w-inline-block" onClick={() => handleAddUserToProject(projects.id, user.id)}>
                                                                    <img src="https://cdn.prod.website-files.com/67f2c0cfbba583171c160c0b/67fd7efbc8a9c4f53db0f6c6_add-user%20(2).png" loading="lazy" alt="" className="image-3" />
                                                                </a>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <input type="submit" data-wait="Please wait..." className="submit-button-2 w-button" value="Add in Project" />
                                                </form>
                                            </div>
                                        </div>
                                        <div className="div-block-15">
                                            <div className="text-block-37">Project1 Users</div>
                                            <div className="team-users-div">
                                                {projects.users.map((user) => (
                                                    <div className="team-user-div" key={user.id}>
                                                        <div>
                                                            Full name: <span className="text-span-7">{user.name}</span>
                                                        </div>
                                                        <div>
                                                            Username: <span className="text-span-7">{user.username}</span>
                                                        </div>
                                                        <div>
                                                            E-mail: <span className="text-span-7">{user.email}</span>
                                                        </div>
                                                        <a className="link-block-6 w-inline-block" onClick={() => handleRemoveFromProject(projects.id, user.id)}>
                                                            <img src="https://cdn.prod.website-files.com/67f2c0cfbba583171c160c0b/67fd7f89a1c31d5c7a574b84_remove-user%20(3).png" loading="lazy" alt="" className="image-4" />
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                            <a className="button-2 w-button">Remove user from team</a>
                                        </div>
                                    </div>
                                ))}

                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default SettingsProjects;