import React from "react";
import Navbar from "./Navbar";
import ItemList from "./ItemList";
import "./App.css";

// This is static hard-coded data, we shall later fetch it from our server
const POPULAR_ITEM = [
    {
        id: 2,
        title: "Kalank",
        poster_url: "http://bit.ly/2WnGRdu",
        cinema_count: 2
    },
    {
        id: 1,
        title: "Captain Marvel",
        poster_url: "http://bit.ly/2vI1c1n",
        cinema_count: 1
    },
    {
        id: 3,
        title: "Captain Marvel is a really long title",
        poster_url: "http://bit.ly/2vI1c1n",
        cinema_count: 0
    }
];

function App() {
    return (
        <div className="mvls-app">
            <header className="mvls-header">
                <Navbar />
            </header>
            <main className="mvls-main">
                <ItemList popularItem={POPULAR_ITEM} />
            </main>
        </div>
    );
}

export default App;
