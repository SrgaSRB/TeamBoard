import React, { useEffect, useState } from "react";
import api from "../../api";

interface TaskDto {
    id: string;
    name: string;
    description: string;
    projectName: string;
    status: string;
    priority: string;
    deadline: string;
    user: string;
    username: string;
}

interface User {
    id: string;
    username: string;
    name: string;
}

interface Project {
    id: string;
    name: string;
    users: User[];
}

const SettingsTasks: React.FC = () => {

    const [tasks, setTasks] = React.useState<TaskDto[]>([]);

    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<string>("");
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const [newTaskName, setNewTaskName] = useState<string>("");
    const [newTaskDescription, setNewTaskDescription] = useState<string>("");
    const [newTaskUser, setNewTaskUser] = useState<string>("");
    const [newTaskPriority, setNewTaskPriority] = useState<string>("");
    const [newTaskDeadline, setNewTaskDeadline] = useState<string>("");

    const [filterName, setFilterName] = useState<string>("");
    const [filterProject, setFilterProject] = useState<string>("");
    const [filterTeam, setFilterTeam] = useState<string>("");
    const [filterDeadline, setFilterDeadline] = useState<string>("");
    const [filterPriority, setFilterPriority] = useState<string>("");

    const [createTaskError, setCreateTaskError] = useState<string>("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects/list');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }
        fetchProjects();
    }, []);

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newTaskPriority === "") {
            setCreateTaskError("Please select a priority for the task.");
            return;
        }

        if (newTaskDeadline === "") {
            setCreateTaskError("Please select a deadline for the task.");
            return;
        }

        if (newTaskUser === "") {
            setCreateTaskError("Please select a user for the task.");
            return;
        }

        if (selectedProjectId === "") {
            setCreateTaskError("Please select a project for the task.");
            return;
        }

        try {
            const response = await api.post('/tasks/create-task', {
                name: newTaskName,
                description: newTaskDescription,
                projectId: selectedProjectId,
                userId: newTaskUser,
                priority: newTaskPriority,
                deadline: newTaskDeadline
            });
            setTasks([...tasks, response.data]);
            setNewTaskName("");
            setNewTaskDescription("");
            setSelectedProjectId("");
            setSelectedUsers([]);
            setNewTaskUser("");
            setNewTaskPriority("");
            setNewTaskDeadline("");
            setCreateTaskError("");

            alert("Task created successfully!");
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };


    return (
        <section className="s-tasks-section">
            <div className="w-layout-blockcontainer container w-container">
                <div className="s-tasks-wrapper">
                    <div className="div-block-23">
                        <div className="w-form">
                            <form id="email-form-6" name="email-form-6" data-name="Email Form 6" method="get" className="form-6" onSubmit={handleCreateTask}>
                                <div className="text-block-46">Create New Task</div>
                                <label htmlFor="name">Name</label>
                                <input
                                    className="text-field-8 w-input"
                                    maxLength={256}
                                    name="name-7"
                                    data-name="Name 7"
                                    placeholder="Enter task name"
                                    type="text"
                                    id="name-7"
                                    required
                                    value={newTaskName}
                                    onChange={(e) => setNewTaskName(e.target.value)}
                                />
                                <label htmlFor="field-4">Description</label>
                                <textarea
                                    placeholder="Enter task description"
                                    maxLength={5000}
                                    id="field-4"
                                    name="field-4"
                                    data-name="Field 4"
                                    className="textarea w-input"
                                    required
                                    value={newTaskDescription}
                                    onChange={(e) => setNewTaskDescription(e.target.value)}
                                ></textarea>
                                <label htmlFor="field-6">Project</label>
                                <select
                                    id="field-6"
                                    name="field-6"
                                    className="select-field-2 w-select"
                                    required
                                    value={selectedProjectId}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        setSelectedProjectId(selectedId);
                                        const foundProject = projects.find((proj) => proj.id === selectedId);
                                        setSelectedUsers(foundProject?.users || []);
                                    }}
                                >
                                    <option value="">Select one...</option>
                                    {projects.map((proj) => (
                                        <option key={proj.id} value={proj.id}>
                                            {proj.name}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="field-8">User</label>
                                <select
                                    id="field-8"
                                    name="field-8"
                                    className="select-field-3 w-select"
                                    disabled={!selectedProjectId}
                                    required
                                    value={newTaskUser}
                                    onChange={(e) => setNewTaskUser(e.target.value)}
                                >
                                    <option value="">Select one...</option>
                                    {selectedUsers.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name} ({user.username})
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="field-7">Priority</label>
                                <select
                                    id="field-7"
                                    name="field-7"
                                    data-name="Field 7"
                                    className="select-field-4 w-select"
                                    value={newTaskPriority}
                                    onChange={(e) => setNewTaskPriority(e.target.value)}
                                >
                                    <option value="">Select one...</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                <label htmlFor="field-9">Deadline</label>
                                <input
                                    type="date"
                                    id="field-9"
                                    name="field-9"
                                    data-name="Field 9"
                                    className="select-field-5 w-input"
                                    value={newTaskDeadline}
                                    onChange={(e) => setNewTaskDeadline(e.target.value)}
                                />
                                <input type="submit" data-wait="Please wait..." className="submit-button-7 w-button" value="Create" />
                                {createTaskError && <div className="error-message" style={{ color: "red" }}>{createTaskError}</div>}
                            </form>
                        </div>
                    </div>
                    <div className="div-block-24">
                        <div className="w-form">
                            <form id="email-form-7" name="email-form-7" data-name="Email Form 7" method="get" className="form-3">
                                <div className="task-filter-div">
                                    <label htmlFor="field-10">Name</label>
                                    <input className="text-field-9 w-input" maxLength={256} name="field-10" data-name="Field 10" placeholder="Example Text" type="text" id="field-10"
                                        value={filterName}
                                        onChange={(e) => setFilterName(e.target.value)}
                                    />
                                </div>
                                <div className="task-filter-div">
                                    <label htmlFor="field-11">Project</label>
                                    <input className="text-field-10 w-input" maxLength={256} name="field-10" data-name="Field 10" placeholder="Example Text" type="text" id="field-10"
                                        value={filterProject}
                                        onChange={(e) => setFilterProject(e.target.value)}
                                    />
                                </div>
                                {
                                    //For the team filter, you can use a dropdown or a text input based on your requirement.
                                    /*<div className="task-filter-div">
                                                                        <label htmlFor="field-11">Team</label>
                                                                        <input className="text-field-11 w-input" maxLength={256} name="field-10" data-name="Field 10" placeholder="Example Text" type="text" id="field-10"
                                                                            value={filterTeam}
                                                                            onChange={(e) => setFilterTeam(e.target.value)}
                                                                            </div>
                                                                        />*/
                                }
                                <div className="task-filter-div">
                                    <label htmlFor="field-11">Deadline until</label>
                                    <input className="text-field-12 w-input" maxLength={256} name="field-10" data-name="Field 10" placeholder="Example Text" type="date" id="field-10"
                                        value={filterDeadline}
                                        onChange={(e) => setFilterDeadline(e.target.value)}
                                    />
                                </div>
                                <div className="task-filter-div">
                                    <label htmlFor="field-11">Priority</label>
                                    <select id="field-11" name="field-11" data-name="Field 11" className="select-field w-select"
                                        value={filterPriority}
                                        onChange={(e) => setFilterPriority(e.target.value)}
                                    >
                                        <option value="">Select one...</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="tasks-list">
                            {tasks
                                .filter((task) => {
                                    const taskDeadline = new Date(task.deadline);
                                    const filterDeadlineDate = filterDeadline ? new Date(filterDeadline) : null;

                                    return (
                                        task.name.toLowerCase().includes(filterName.toLowerCase()) &&
                                        task.projectName.toLowerCase().includes(filterProject.toLowerCase()) &&
                                        task.user.toLowerCase().includes(filterTeam.toLowerCase()) &&
                                        (!filterDeadlineDate || taskDeadline <= filterDeadlineDate) &&
                                        task.priority.toLowerCase().includes(filterPriority.toLowerCase())
                                    );
                                })
                                .map((task) => (
                                    <div className="task" key={task.id}>
                                        <div className="text-block-47">{task.name}</div>
                                        <div>{task.description}</div>
                                        <div>
                                            Project: <span className="text-span-10">{task.projectName}</span>
                                        </div>
                                        <div>
                                            Status: <span className="text-span-10">{task.status}</span>
                                        </div>
                                        <div>
                                            Priority: <span className="text-span-10">{task.priority}</span>
                                        </div>
                                        <div>
                                            Deadline: <span className="text-span-10">{new Date(task.deadline).toLocaleDateString()}</span>
                                        </div>
                                        <div>
                                            User: <span className="text-span-10">{task.user}</span> <span className="text-span-11">(@{task.username})</span>
                                        </div>
                                        <a className="button-4 w-button" onClick={() => (handleDeleteTask(task.id))}>Delete Task</a>
                                    </div>
                                ))}

                        </div>
                    </div>
                </div>
            </div >
        </section >

    );
}

export default SettingsTasks;