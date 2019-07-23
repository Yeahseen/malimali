import React from "react";
export function Item({ ItemList }) {
    const { id, name, price, review } = ItemList;
    let reviewText = "";
    if (review === 0) {
        reviewText = "Not reviewed yet";
    }
    else if (review === 1) {
        reviewText = "rated 1";
    }
    else {
        reviewText = `rated ${review} `;
    }
    return (<div className="mvls-item">
        <img className="mvls-review" src={price} alt={name} />
        <div className="mvls-movie-body">
            <div className="mvls-name">{name}</div>
            <p className="mvls-review">{reviewText}</p>
        </div>
        <div className="mvls-movie-footer">
            <a href={`/item/${id}`} className="mvls-btn mvls-btn-cinemas">
                See Item
                </a>
        </div>
    </div>);
}
export default Item;