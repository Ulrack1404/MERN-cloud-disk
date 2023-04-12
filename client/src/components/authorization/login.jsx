import React, { useState } from "react";
import { login, registration } from "../../actions/user";
import Input from "../../utils/input/input";
import styles from "./authorization.module.scss";
import { useDispatch } from "react-redux";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    return (
        <div className={styles.authorization}>
            <div className={styles.authorization_header}>Авторизация</div>
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
                onClick={() => dispatch(login(email, password))}
            >
                Войти
            </button>
        </div>
    );
};

export default Login;
