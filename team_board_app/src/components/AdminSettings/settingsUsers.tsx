import React, { useEffect, useState } from "react";
import api from "../../api";

interface UserDto {
    id: string;
    fullName: string;
    username: string;
    email: string;
    password: string;
    teams: string[];
    projects: string[];
    tasks: string[];
}

const SettingsUsers: React.FC = () => {

    const [users, setUsers] = useState<UserDto[]>([]);

    const [editValues, setEditValues] = useState<Record<string, { FullName: string; username: string; email: string; password: string; isCheckedPassword: boolean }>>({});

    const [newUserName, setNewUserName] = useState<string>("");
    const [newUserFullName, setNewUserFullName] = useState<string>("");
    const [newUserEmail, setNewUserEmail] = useState<string>("");
    const [newUserPassword, setNewUserPassword] = useState<string>("");
    const [newUserIsCheckedPassword, setNewUserIsCheckedPassword] = useState<boolean>(false);

    const [filterUsername, setFilterUsername] = useState<string>("");
    const [filterFullName, setFilterFullName] = useState<string>("");
    const [filterEmail, setFilterEmail] = useState<string>("");


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/users");
                setUsers(response.data);

                const initialEditValues: Record<string, { FullName: string; username: string; email: string; password: string; isCheckedPassword: boolean }> = {};
                response.data.forEach((user: UserDto) => {
                    initialEditValues[user.id] = {
                        FullName: user.fullName,
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        isCheckedPassword: false,
                    };
                });
                setEditValues(initialEditValues);

            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchUsers();
    }, []);

    const handleSaveChanges = async (e: React.FormEvent, userId: string) => {
        e.preventDefault();
        const user = editValues[userId];
        if (user) {
            try {
                await api.put(`/users/${userId}`, {
                    fullName: user.FullName,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                });
                alert("User updated successfully!");
            } catch (error) {
                console.error("Error updating user:", error);
            }
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/users", {
                fullName: newUserFullName,
                username: newUserName,
                email: newUserEmail,
                password: newUserPassword,
            });
            alert("User created successfully!");

            setUsers((prevUsers) => [
                ...prevUsers,
                {
                    ...response.data,
                    teams: response.data.teams || [],
                    projects: response.data.projects || [],
                    tasks: response.data.tasks || [],
                },
            ]);

            setEditValues((prev) => ({
                ...prev,
                [response.data.id]: {
                    FullName: response.data.fullName,
                    username: response.data.username,
                    email: response.data.email,
                    password: response.data.password,
                    isCheckedPassword: false,
                },
            }));

            setNewUserName("");
            setNewUserFullName("");
            setNewUserEmail("");
            setNewUserPassword("");
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            await api.delete(`/users/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            alert("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <section className="s-users-section">
            <div className="w-layout-blockcontainer container w-container">
                <div className="s-users-wraper">
                    <div className="div-block-25">
                        <div className="w-form">
                            <form id="email-form-8" name="email-form-8" data-name="Email Form 8" method="get" className="form-5" onSubmit={(e) => handleCreateUser(e)}>
                                <div className="text-block-49">Create New User</div>
                                <label htmlFor="field-12">Username</label>
                                <input className="w-input" maxLength={256} name="field-12" data-name="Field 12" placeholder="Enter user username" type="text" id="field-12" required
                                    value={newUserName}
                                    onChange={(e) => setNewUserName(e.target.value)}
                                />
                                <label htmlFor="name-8">Name</label>
                                <input className="w-input" maxLength={256} name="name-8" data-name="Name 8" placeholder="Enter user Full Name" type="text" id="name-8" required
                                    value={newUserFullName}
                                    onChange={(e) => setNewUserFullName(e.target.value)}
                                />
                                <label htmlFor="email">Email Address</label>
                                <input className="w-input" maxLength={256} name="email" data-name="Email" placeholder="Enter user e-mail address" type="email" id="email" required
                                    value={newUserEmail}
                                    onChange={(e) => setNewUserEmail(e.target.value)}
                                />
                                <label htmlFor="field-13">Password</label>
                                <input className="w-input" maxLength={256} name="field-13" data-name="Field 13" placeholder="Enter user password" id="field-13" required
                                    value={newUserPassword}
                                    onChange={(e) => setNewUserPassword(e.target.value)}
                                    type={newUserIsCheckedPassword ? "text" : "password"}
                                />
                                <label className="w-checkbox">
                                    <input type="checkbox" name="Show-Password" id="Show-Password" data-name="Show Password" className="w-checkbox-input"
                                        checked={newUserIsCheckedPassword}
                                        onChange={(e) => setNewUserIsCheckedPassword(e.target.checked)}
                                    />
                                    <span className="w-form-label">Show Password</span>
                                </label>
                                <input type="submit" data-wait="Please wait..." className="submit-button-7 w-button" value="Create" />
                            </form>
                        </div>
                        <div className="form-block-6 w-form">
                            <form id="email-form-9" name="email-form-9" data-name="Email Form 9" method="get" data-wf-page-id="67f518e3b8d7a81a643bc143" >
                                <div className="text-block-50">Filter Users</div>
                                <label htmlFor="field-14">Username</label>
                                <input
                                    className="w-input"
                                    maxLength={256}
                                    name="field-14"
                                    placeholder="User username"
                                    type="text"
                                    id="field-14"
                                    value={filterUsername}
                                    onChange={(e) => setFilterUsername(e.target.value)}
                                />

                                <label htmlFor="name-9">Name</label>
                                <input
                                    className="w-input"
                                    maxLength={256}
                                    name="name-9"
                                    placeholder="User Full Name"
                                    type="text"
                                    id="name-9"
                                    value={filterFullName}
                                    onChange={(e) => setFilterFullName(e.target.value)}
                                />

                                <label htmlFor="email-2">Email Address</label>
                                <input
                                    className="w-input"
                                    maxLength={256}
                                    name="email-2"
                                    placeholder="User e-mail address"
                                    type="email"
                                    id="email-2"
                                    value={filterEmail}
                                    onChange={(e) => setFilterEmail(e.target.value)}
                                />

                            </form>
                        </div>
                    </div>
                    <div className="div-block-26">
                        <div className="text-block-51">All Users</div>
                        <div className="users-div">
                            {users
                                .filter((user) =>
                                    user.username.toLowerCase().includes(filterUsername.toLowerCase()) &&
                                    user.fullName.toLowerCase().includes(filterFullName.toLowerCase()) &&
                                    user.email.toLowerCase().includes(filterEmail.toLowerCase())
                                )
                                .map((user) => (
                                    <div className="user-div" key={user.id}>
                                        <div className="form-block-5 w-form">
                                            <form id="email-form-8" name="email-form-8" data-name="Email Form 8" method="get" className="form-4" onSubmit={(e) => handleSaveChanges(e, user.id)}>
                                                <label htmlFor="field-12">Username</label>
                                                <input className="w-input" maxLength={256} name="field-12" data-name="Field 12" placeholder="user username" type="text" id="field-12" required
                                                    value={editValues[user.id]?.username}
                                                    onChange={(e) => setEditValues({ ...editValues, [user.id]: { ...editValues[user.id], username: e.target.value } })}
                                                />
                                                <label htmlFor="name-8">Name</label>
                                                <input className="w-input" maxLength={256} name="name-8" data-name="Name 8" placeholder="user Full Name" type="text" id="name-8" required
                                                    value={editValues[user.id]?.FullName}
                                                    onChange={(e) => setEditValues({ ...editValues, [user.id]: { ...editValues[user.id], FullName: e.target.value } })}
                                                />
                                                <label htmlFor="email-4">Email Address</label>
                                                <input className="w-input" maxLength={256} name="email-4" data-name="Email 4" placeholder="user e-mail address" type="email" id="email-4" required
                                                    value={editValues[user.id]?.email}
                                                    onChange={(e) => setEditValues({ ...editValues, [user.id]: { ...editValues[user.id], email: e.target.value } })}
                                                />
                                                <label htmlFor="field-13">Password</label>
                                                <input className="w-input" maxLength={256} name="field-13" data-name="Field 13" placeholder="user password"
                                                    type={editValues[user.id]?.isCheckedPassword ? "text" : "password"} id="field-13" required
                                                    value={editValues[user.id]?.password}
                                                    onChange={(e) => setEditValues({ ...editValues, [user.id]: { ...editValues[user.id], password: e.target.value } })}
                                                />
                                                <label className="w-checkbox">
                                                    <input type="checkbox" name="Show-Password-2" id="Show-Password-2" data-name="Show Password 2" className="w-checkbox-input"
                                                        checked={editValues[user.id]?.isCheckedPassword}
                                                        onChange={(e) => setEditValues({ ...editValues, [user.id]: { ...editValues[user.id], isCheckedPassword: e.target.checked } })}
                                                    />
                                                    <span className="w-form-label">Show Password</span>
                                                </label>
                                                <div className="user-info">
                                                    <div className="user-info-list">
                                                        <div className="text-block-53">Teams ({user.teams.length}):</div>
                                                        <div className="user-project-list">
                                                            {user.teams.map((team, index) => (
                                                                <div key={index} className="text-block-54">{team}, </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="user-info-list">
                                                        <div className="text-block-53">Projects ({user.projects.length}):</div>
                                                        <div className="user-project-list">
                                                            {user.projects.map((team, index) => (
                                                                <div key={index} className="text-block-54">{team}, </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="user-info-list">
                                                        <div className="text-block-53">Tasks ({user.tasks.length}):</div>
                                                        <div className="user-project-list">
                                                            {user.tasks.map((team, index) => (
                                                                <div key={index} className="text-block-54">{team}, </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="div-block-27">
                                                    <input type="submit" data-wait="Please wait..." className="w-button" value="Save Changes" />
                                                    <input type="submit" data-wait="Please wait..." className="button-2 temp w-button" value="Delete user" onClick={() => handleDeleteUser(user.id)} />
                                                </div>
                                            </form>
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

export default SettingsUsers;