import React from "react";

const AdminNavbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="w-layout-blockcontainer container w-container">
                <div className="navbar-wrapper-admin">
                    <div className="nav-left-div">
                        <a className="link-block-4 w-inline-block">
                            <div className="text-block-52">Teams settings</div>
                        </a>
                        <a className="link-block-4 w-inline-block">
                            <div className="text-block-52">Projects settings</div>
                        </a>
                        <a className="link-block-4 w-inline-block">
                            <div className="text-block-52">Tasks settings</div>
                        </a>
                        <a className="link-block-4 w-inline-block">
                            <div className="text-block-52">Users settings</div>
                        </a>
                    </div>
                    <div className="nav-logout">
                        <img src="https://cdn.prod.website-files.com/67f2c0cfbba583171c160c0b/67f2e0072d31c88ef596bb06_exit.png" loading="lazy" alt="" className="image-2"/>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar;