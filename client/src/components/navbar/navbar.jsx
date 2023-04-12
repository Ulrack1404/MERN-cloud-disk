import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/navbar_logo.svg";
import { logout } from "../../reducers/userReducer";
import styles from "./Navbar.module.scss";

const Navbar = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();

    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <NavLink to="/">
                    <img src={Logo} alt="" className={styles.navbar_logo} />
                </NavLink>
                <div className={styles.navbar_header}>MERN CLOUD</div>
                {!isAuth && (
                    <div className={styles.navbar_login}>
                        <NavLink to="/login">Войти</NavLink>
                    </div>
                )}
                {!isAuth && (
                    <div className={styles.navbar_registration}>
                        <NavLink to="/registration">Регистрация</NavLink>
                    </div>
                )}
                {isAuth && (
                    <div
                        className={styles.navbar_exit}
                        onClick={() => dispatch(logout())}
                    >
                        Выход
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
