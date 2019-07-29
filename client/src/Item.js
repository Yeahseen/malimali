import React from "react";
import { Link } from "@reach/router";
import "./App.css"
 function Item({ popularItems }) {
    const {id, name, url, price, review } = Item;
    let reviewText = "";
    if (review === 0) {
        reviewText = "Not reviewed yet";
    }
    else if (review === 1) {
        reviewText = "rated 1";
    }
    else {
        reviewText = `rated ${ review} `;
    }
    return (<div className="mvls-item">
        <img className="mvls-image" src={"no-poster.jpg" } alt={url} />
        <div className="mvls-item-body">
            <div className="mvls-name">{name}</div>
            <div className="mvls-name">{price}</div>
            <p className="mvls-name">{reviewText}</p>
        </div>
        <div className="mvls-item-footer">
            
                <Link to={`/Item/${id}`} className="mvls-btn mvls-btn-items">
                     See Item
                 </Link>
        </div>
    </div>);
}
export default Item;