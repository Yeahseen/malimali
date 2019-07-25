import React from "react";
import { Link } from "@reach/router";

function NavBar() {
    return (
        <div className="mvls-container">
            <nav className="mvls-nav">
                <span className="mvls-title">Popular items</span>
                <Link to="/">items</Link>
                 <Link to="/login"></Link>
                 <Link to="/admin">Admin</Link>
            </nav>
        </div>
    );
}

export default NavBar;