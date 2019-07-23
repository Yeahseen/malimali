import React from "react";

function NavBar() {
    return (
        <div className="mvls-container">
            <nav className="mvls-nav">
                <span className="mvls-title">Item List</span>
                <a href="/">Log In</a>
                <a href="/Admin">Admin</a>
                <a href="/Search">Search</a>
            </nav>
        </div>
    );
}

export default NavBar;