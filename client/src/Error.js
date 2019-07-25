import React from "react";

function Error({ message }){
    return (
        <div className="mvls-fullpage-text">
            <p>{message}</p>
        </div>
    );
}
Error.defaultProps = {
    message: "sorry, a server error occured. Please retry later."
}

export default Error;