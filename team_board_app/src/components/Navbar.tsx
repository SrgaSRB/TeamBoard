import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
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
            <div className="link-block-2 link-block w-inline-block">
              <div>Srdjan</div>
            </div>
            <div className="link-block-3 w-inline-block">
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
