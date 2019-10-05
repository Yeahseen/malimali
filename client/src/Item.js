import React from "react";
import { Link } from "@reach/router";
import "./App.css"

 function Item({ popularItem }) {
    const {id, name, url, price, review } = popularItem;
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
        <img className="mvls-image" src= {url} alt={url}  />
        <div className="mvls-item-body">
            <div className="mvls-name">{name}</div>
            <div className="mvls-price">Ksh {price}</div>
            <p className="mvls-price">{reviewText}</p>
        </div>
        <div className="mvls-item-footer">
            
                <Link to={`/ItemDetails/${id}`} className="mvls-btn mvls-btn-items">
                     See Item
                 </Link>
        </div>
    </div>);
}
export default Item;