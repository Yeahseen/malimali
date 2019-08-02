import React from "react";
import { Router } from "@reach/router";
import Navbar from "./Navbar";
import ItemList from "./ItemList";
import ItemDetails from "./ItemDetails";
import Admin from "./Admin";
import login from "./login";
 import NotFound from "./NotFound";
import "./App.css";



function App() {
    return (
        <div className="mvls-app">
            <header className="mvls-header">
                <Navbar />
            </header>
            <main className="mvls-main">
                <Router>
                     <ItemList path="/" />
                     <ItemDetails path="/item/:itemId" />
                     <Admin path="/Admin" />
                     {/* <login path="/Login" /> */}
                     <NotFound default />
                 </Router>
                 <login />
            </main>
            
        </div>
    );
}

export default App;
