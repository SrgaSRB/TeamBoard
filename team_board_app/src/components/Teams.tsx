import React, { useEffect } from "react";
import api from "../api";

interface Team {
    teamName: string;
    teamDescription: string;
    memberCount: number;
    projectsUserWorksOn: string[];
    totalProjectsInTeam: number;
    userProjectCount: number;
}

const Teams: React.FC = () => {

    const [teams, setTeams] = React.useState<Team[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/teams/my/");
                console.log(response);
                setTeams(response.data);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();

    }, []);

    return (
        <section className="teams-section">
            <div className="w-layout-blockcontainer container w-container">
                <div className="teams-wrapper">
                    <h1 className="heading-2">My Teams</h1>
                    <div className="teams-list-div">
                        {teams.map((team, index) => (

                                <div key={index} className="team-div">
                                    <div className="text-block-5">{team.teamName}</div>
                                    <div className="text-block-11">{team.teamDescription}</div>
                                    <div className="text-block-14">
                                        Total projects in team: <span className="text-span-2">{team.totalProjectsInTeam}</span>
                                    </div>
                                    <div className="text-block-14">
                                        Members: <span className="text-span-2">{team.memberCount}</span>
                                    </div>
                                    <div className="text-block-14">
                                        Projects user worked on ({team.userProjectCount}):<span> </span>
                                        {team.projectsUserWorksOn?.length > 0 ? (
                                            <span className="text-span-2"> 
                                                {team.projectsUserWorksOn.join(", ")}
                                            </span>
                                        ) : (
                                            <em className="text-span-2">No active projects</em>
                                        )}
                                    </div>
                                </div>
                        ))}
                    </div>
                    <a className="button w-button">Join Team +</a>
                </div>
            </div>
        </section>

    );
}

export default Teams;