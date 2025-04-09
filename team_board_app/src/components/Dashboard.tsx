import React from "react";

const Dashboard: React.FC = () => {

    return(
        <section className="home-section">
        <div className="w-layout-blockcontainer container w-container">
            <div className="home-wrapper">
                <div className="home-column">
                    <h2 className="heading">My Teams</h2>
                    <div className="home-column-list">
                        <div className="home-column-list-item temp1">
                            <div className="text-block-2">Team 1</div>
                            <div className="text-block-4">Team1 description</div>
                            <div className="home-column-list-item-list">
                                <div className="text-block-3 projects-list">tram1 project 1</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-column">
                    <h2 className="heading">My Projects</h2>
                    <div className="home-column-list">
                        <div className="home-column-list-item temp2">
                            <div className="text-block-2">Team 1</div>
                            <div className="text-block-6">Team1 description</div>
                            <div className="home-column-list-item-list">
                                <div className="text-block-3 tasks-list">Task</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-column column-2rows">
                    <div className="home-important-tasks">
                        <h2 className="heading">Important Projects</h2>
                        <div className="home-column-list">
                            <div className="home-column-list-item">
                                <div className="text-block-2">Team 1</div>
                                <div className="text-block-7">Team1 description</div>
                                <div className="home-column-list-item-list">
                                    <div className="text-block-3 ip-list">tram1 project 1</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-tasks-chart">
                        <div className="chart-map">
                            <div className="text-block-8">
                                ToDo: <span className="text-span">3</span>
                            </div>
                            <div className="text-block-9">
                                In progress: <span className="text-span">3</span>
                            </div>
                            <div className="text-block-10">
                                Done: <span className="text-span">6</span>
                            </div>
                        </div>
                        <div className="chart-div"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    );
}

export default Dashboard;