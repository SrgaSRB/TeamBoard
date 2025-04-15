import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {

  const [fullName, setFullName] = React.useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setFullName(parsedUser.username);
    }
  }
  , []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  
  return (
    <section className="navbar">
      <div className="w-layout-blockcontainer container navbar-container w-container">
        <div className="navbar-wrapper">
          <div className="navbar-left-div">
            <Link to="/" className="link-block w-inline-block">
              <div className="text-block">Home</div>
            </Link>
            <Link to="/teams" className="link-block w-inline-block">
              <div className="text-block">Teams</div>
            </Link>
            <Link to="/tasks" className="link-block w-inline-block">
              <div className="text-block">Tasks</div>
            </Link>
            <Link to="/projects" className="link-block w-inline-block">
              <div className="text-block">Projects</div>
            </Link>
          </div>
          <div className="navbar-right-div">
            <Link to="admin/teams" className="link-block-2 link-block w-inline-block">
              <div>{fullName}</div>
            </Link>
            <div className="link-block-3 w-inline-block" onClick={handleLogout}>
              <img
                src="https://cdn.prod.website-files.com/67f2c0cfbba583171c160c0b/67f2f67349bf291aad53945d_exit%20(2).png"
                loading="lazy"
                alt=""
                className="image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
