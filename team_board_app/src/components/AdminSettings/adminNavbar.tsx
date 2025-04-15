import React, { use, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminNavbar: React.FC = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/login");
        }
    }
    , [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="w-layout-blockcontainer container w-container">
                <div className="navbar-wrapper-admin">
                    <div className="nav-left-div">
                        <Link to="/admin/teams" className="link-block-4 w-inline-block">
                            <div className="text-block-52">Teams settings</div>
                        </Link>
                        <Link to="/admin/projects" className="link-block-4 w-inline-block">
                            <div className="text-block-52">Projects settings</div>
                        </Link>
                        <Link to="/admin/tasks" className="link-block-4 w-inline-block">
                            <div className="text-block-52">Tasks settings</div>
                        </Link>
                        <Link to="/admin/users" className="link-block-4 w-inline-block">
                            <div className="text-block-52">Users settings</div>
                        </Link>
                    </div>
                    <div className="nav-logout" onClick={handleLogout}>
                        <img src="https://cdn.prod.website-files.com/67f2c0cfbba583171c160c0b/67f2e0072d31c88ef596bb06_exit.png" loading="lazy" alt="" className="image-2"/>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar;