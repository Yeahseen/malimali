import React from "react";
import { Router } from "@reach/router";
import Navbar from "./Navbar";
import ItemList from "./ItemList";
import ItemDetails from "./ItemDetails";
import Admin from "./Admin"
 import NotFound from "./NotFound";
import "./App.css";

// This is static hard-coded data, we shall later fetch it from our server


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
                     <NotFound default />
                 </Router>
            </main>
        </div>
    );
}

export default App;
