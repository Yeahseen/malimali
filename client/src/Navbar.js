import React from "react";
import { Link } from "@reach/router";

function NavBar() {
    return (
        <div className="mvls-container">
            <nav className="mvls-nav">
                <span className="mvls-title">Popular items</span>
                <a href= "/login"> login</a>
                <a href = "/Checkout">check out</a>
                <Link to="/item">items</Link>
                 <Link to="/Admin">Admin</Link>
            </nav>
        </div>
    );
}

export default NavBar;