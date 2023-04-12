import React, { useState } from "react";
import { registration } from "../../actions/user";
import Input from "../../utils/input/input";
import styles from "./authorization.module.scss";

const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className={styles.authorization}>
            <div className={styles.authorization_header}>Регистрация</div>
            <Input
                value={email}
                setValue={setEmail}
                type="text"
                placeholder="Введите email... "
            />
            <Input
                value={password}
                setValue={setPassword}
                type="password"
                placeholder="Введите пароль... "
            />
            <button
                className={styles.authorization_btn}
                onClick={() => registration(email, password)}
            >
                Зарегистрироваться
            </button>
        </div>
    );
};

export default Registration;
