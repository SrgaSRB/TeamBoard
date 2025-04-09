import e from "express";
import React from "react";

const Teams: React.FC = () => {

    return(
        <section className="teams-section">
        <div className="w-layout-blockcontainer container w-container">
            <div className="teams-wrapper">
                <h1 className="heading-2">My Teams</h1>
                <div className="teams-list-div">
                    <div className="team-div">
                        <div className="text-block-5">Team1</div>
                        <div className="text-block-11">Team description</div>
                        <div className="text-block-14">
                            Projects: <span className="text-span-2">10</span>
                        </div>
                        <div className="text-block-14">
                            Members: <span className="text-span-2">10</span>
                        </div>
                    </div>
                </div>
                <a href="#" className="button w-button">Join Team +</a>
            </div>
        </div>
    </section>

    );
}

export default Teams;