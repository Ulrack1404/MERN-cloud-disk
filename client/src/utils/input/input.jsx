import React from "react";
import styles from "./input.module.scss";

const Input = (props) => {
    return (
        <input
            onChange={(event) => props.setValue(event.target.value)}
            value={props.value}
            type={props.type}
            placeholder={props.placeholder}
        />
    );
};

export default Input;
