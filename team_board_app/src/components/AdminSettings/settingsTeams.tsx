import React, { useEffect, useState } from "react";
import api from "../../api";
import e from "express";
interface TeamUserDto {
    id: string;
    name: string;
    email: string;
    username: string;
}

interface TeamDto {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    projectCount: number;
    users: TeamUserDto[];
    outsideUsers: TeamUserDto[];
}

const SettingsTeams: React.FC = () => {

    const [teams, setTeams] = useState<TeamDto[]>([]);

    const [editValues, setEditValues] = useState<Record<string, { name: string; description: string }>>({});

    const [newTeamName, setNewTeamName] = useState<string>("");
    const [newTeamDescription, setNewTeamDescription] = useState<string>("");

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await api.get("/teams/");
                setTeams(response.data);
                
                setEditValues(
                    response.data.reduce((acc: any, team: TeamDto) => {
                      acc[team.id] = { name: team.name, description: team.description };
                      return acc;
                    }, {})
                  );                  
            
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleRemoveUser = async (teamId: string, userId: string) => {
        try {
            await api.delete(`/teams/${teamId}/remove-user/${userId}/`);
            setTeams((prevTeams) =>
                prevTeams.map((team) =>
                    team.id === teamId
                        ? {
                            ...team,
                            users: team.users.filter((user) => user.id !== userId),
                            outsideUsers: [...team.outsideUsers, team.users.find((user) => user.id === userId)!],
                            memberCount: team.memberCount - 1,
                        }
                        : team
                )
            )
        } catch (error) {
            console.error("Failed to remove user:", error);
        }
    };

    const handleAddUser = async (teamId: string, userId: string) => {
        try {
            await api.post(`/teams/${teamId}/add-user/${userId}/`);
            setTeams((prevTeams) =>
                prevTeams.map((team) => {
                    if(team.id !== teamId) return team;
                    
                    const newUser = team.outsideUsers.find((user) => user.id === userId);
                    if (!newUser) return team;

                    return{
                        ...team,
                        users: [...team.users, newUser],
                        outsideUsers: team.outsideUsers.filter((user) => user.id !== userId),
                        memberCount: team.memberCount + 1,
                    }

                })
            )
        } catch (error) {
            console.error("Failed to add user:", error);
        }
    }

    const handleCreateTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/teams/create-team", {
                name: newTeamName,
                description: newTeamDescription,
            });
            setTeams((prevTeams) => [...prevTeams, response.data]);
            setNewTeamName("");
            setNewTeamDescription("");
        } catch (error) {
            console.error("Failed to create team:", error);
        }
    }

    const handleDeleteTeam = async (teamId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this team?");
        if (!confirmed) return;
        
        try {
            await api.delete(`/teams/${teamId}/delete-team/`);
            setTeams((prevTeams) => prevTeams.filter((team) => team.id !== teamId));
        } catch (error) {
            console.error("Failed to delete team:", error);
        }
    }

    const saveChanges = async (e: React.FormEvent, teamId: string) => {

        e.preventDefault();

        const { name, description } = editValues[teamId];

        try {
            await api.put(`/teams/${teamId}/`, {
                name,
                description,
            });
            setTeams((prevTeams) =>
                prevTeams.map((team) =>
                    team.id === teamId ? { ...team, name, description } : team
                )
            );
            window.alert("Changes saved successfully!");
        } catch (error) {
            console.error("Failed to save changes:", error);
        }
    }

    return (
        <section className="s-team-section">
            <div className="w-layout-blockcontainer container w-container">
                <div className="s-team-wrapper">
                    <div className="div-block-17">
                        <div className="form-block-2 w-form">
                            <div className="text-block-39">Create New Team</div>
                            <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-8" onSubmit={handleCreateTeam}>
                                <label htmlFor="name">Name</label>
                                <input
                                    className="text-field-3 w-input"
                                    maxLength={256}
                                    name="name"
                                    data-name="Name"
                                    placeholder="Enter team name"
                                    type="text"
                                    id="name"
                                    required
                                    value={newTeamName}
                                    onChange={(e) => setNewTeamName(e.target.value)}
                                />
                                <label htmlFor="field">Description</label>
                                <textarea
                                    placeholder="Enter team description"
                                    maxLength={5000}
                                    id="field"
                                    name="field"
                                    data-name="Field"
                                    className="textarea w-input"
                                    value={newTeamDescription}
                                    onChange={(e) => setNewTeamDescription(e.target.value)}
                                ></textarea>
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

                            {teams.map((team) => (
                                <div className="teams-div" key={team.id}>
                                    <div className="div-block-16">
                                        <div className="form-block-3 w-form">
                                            <form id="wf-form-" name="wf-form-" data-name="" method="get" onSubmit={(e) => saveChanges(e, team.id)}>
                                                <label htmlFor="name-2">Name</label>
                                                <input
                                                    className="text-field w-input"
                                                    maxLength={256}
                                                    name="name-2"
                                                    data-name="Name 2"
                                                    placeholder="Team 1"
                                                    type="text"
                                                    id="name-2"
                                                    value={editValues[team.id]?.name || ""}
                                                    onChange={(e) =>
                                                      setEditValues((prev) => ({
                                                        ...prev,
                                                        [team.id]: {
                                                          ...prev[team.id],
                                                          name: e.target.value,
                                                        },
                                                      }))
                                                    }
                                                    required
                                                />
                                                <label htmlFor="field-2">Description</label>
                                                <textarea
                                                    placeholder="Description of team 1"
                                                    maxLength={5000}
                                                    id="field-2"
                                                    name="field-2"
                                                    data-name="Field 2"
                                                    className="textarea-2 w-input"
                                                    value={editValues[team.id]?.description || ""}
                                                    onChange={(e) =>
                                                      setEditValues((prev) => ({
                                                        ...prev,
                                                        [team.id]: {
                                                          ...prev[team.id],
                                                          description: e.target.value,
                                                        },
                                                      }))
                                                    }
                                                    required
                                                />
                                                <div>
                                                    Members: <span className="text-span-8">{team.memberCount}</span>
                                                </div>
                                                <div className="text-block-40">
                                                    Projects: <span className="text-span-8">{team.projectCount}</span>
                                                </div>
                                                <div className="div-block-19">
                                                    <input type="submit" data-wait="Please wait..." className="w-button" value="Save Changes" />
                                                    <a className="button-3 w-button" onClick={() => handleDeleteTeam(team.id)}>Delete Team</a>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="form-block-4 w-form">
                                            <form id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get" className="form-2" >
                                                <div className="text-block-38">Add new user in team</div>
                                                <input className="text-field-2 w-input" maxLength={256} name="name-3" data-name="Name 3" placeholder="Search users" type="text" id="name-3" />
                                                <div className="new-user-list">
                                                    {team.outsideUsers?.map((user) => (
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
                                                            <a className="link-block-5 w-inline-block" onClick={() => handleAddUser(team.id, user.id)}>
                                                                <img src="https://cdn.prod.website-files.com/67f2c0cfbba583171c160c0b/67fd7efbc8a9c4f53db0f6c6_add-user%20(2).png" loading="lazy" alt="" className="image-3" />
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="div-block-15">
                                        <div className="text-block-37">{team.name} Users:</div>
                                        <div className="team-users-div">
                                            {team.users?.map((user) => (
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
                                                    <a className="link-block-6 w-inline-block" onClick={() => handleRemoveUser(team.id, user.id)}>
                                                        <img src="https://cdn.prod.website-files.com/67f2c0cfbba583171c160c0b/67fd7f89a1c31d5c7a574b84_remove-user%20(3).png" loading="lazy" alt="" className="image-4" />
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
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

export default SettingsTeams;