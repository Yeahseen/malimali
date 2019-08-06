import React from "react";
import { Link } from "@reach/router";

function NavBar() {
    return (
        <div className="mvls-container">
            <nav className="mvls-nav">
                <span className="mvls-home">
                    <c href to="./home">HOME</c>
                </span>
                <b><Link to= "/Login"> login</Link> </b>
                <a href = "/Checkout">check out</a>
                <Link to="/ItemDetails">items</Link>
                 <Link to="/Admin">Admin</Link> 
            </nav>
            
        </div>
    );
}

export default NavBar;