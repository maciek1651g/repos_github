import styles from "./style.module.css";

import React from "react";

let closeHandler = null;

const ErrorMessage = (props) => {

    const close = () => {
        props.setMessage(null);
    }
    if(props.message!==null)
    {
        if(closeHandler!=null)
            clearTimeout(closeHandler);
        closeHandler = setTimeout(close, 3000);
    }

    return (
        <div className={styles.errorMessage}>
            <div>
                <p style={{margin: "20px 0"}}>{props.message}</p>
            </div>
        </div>

    )
}

export default ErrorMessage;