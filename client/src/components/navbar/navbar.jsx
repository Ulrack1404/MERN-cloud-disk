import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getFiles, searchFiles } from "../../actions/file";
import Logo from "../../assets/img/navbar_logo.svg";
import { showLoader } from "../../reducers/appReducer";
import { logout } from "../../reducers/userReducer";
import styles from "./Navbar.module.scss";
import avatarLogo from "../../assets/img/avatar.svg";
import { API_URL } from "../../config";

const Navbar = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(false);
    const currentDir = useSelector((state) => state.files.currentDir);
    const currentUser = useSelector((state) => state.user.currentUser);
    const avatar = currentUser.avatar
        ? `${API_URL + currentUser.avatar}`
        : avatarLogo;

    function searchChangeHandler(e) {
        setSearchName(e.target.value);
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        dispatch(showLoader());
        setSearchTimeout(
            setTimeout(
                (value) => {
                    dispatch(searchFiles(value));
                },
                500,
                e.target.value
            )
        );
    }
    function clearValueHandler() {
        setSearchName("");
    }
    function handleBlur() {
        setSearchName("");
    }
    function handleKeyDown(e) {
        if (e.keyCode == 27) {
            setSearchName("");
        }
    }

    useEffect(() => {
        if (!searchName) {
            dispatch(getFiles(currentDir));
        }
    }, [searchName]);

    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <NavLink to="/">
                    <img src={Logo} alt="" className={styles.navbar_logo} />
                </NavLink>
                <div className={styles.navbar_header}>MERN CLOUD</div>
                {isAuth && (
                    <>
                        <div className="search">
                            <input
                                type="text"
                                placeholder=" "
                                value={searchName}
                                onChange={(e) => searchChangeHandler(e)}
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                            />
                            <div>
                                <svg>
                                    <use xlinkHref="#path" />
                                </svg>
                            </div>
                        </div>
                        <div
                            className="search_clear"
                            style={
                                searchName
                                    ? { display: "block" }
                                    : { display: "none" }
                            }
                            onClick={clearValueHandler}
                        >
                            &times;
                        </div>

                        <svg style={{ display: "none" }}>
                            <symbol
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 160 28"
                                id="path"
                            >
                                <path
                                    d="M32.9418651,-20.6880772 C37.9418651,-20.6880772 40.9418651,-16.6880772 40.9418651,-12.6880772 C40.9418651,-8.68807717 37.9418651,-4.68807717 32.9418651,-4.68807717 C27.9418651,-4.68807717 24.9418651,-8.68807717 24.9418651,-12.6880772 C24.9418651,-16.6880772 27.9418651,-20.6880772 32.9418651,-20.6880772 L32.9418651,-29.870624 C32.9418651,-30.3676803 33.3448089,-30.770624 33.8418651,-30.770624 C34.08056,-30.770624 34.3094785,-30.6758029 34.4782612,-30.5070201 L141.371843,76.386562"
                                    transform="translate(83.156854, 22.171573) rotate(-225.000000) translate(-83.156854, -22.171573)"
                                ></path>
                            </symbol>
                        </svg>
                    </>
                )}
                {/* {isAuth && (
                    <input
                        className={styles.navbar_search}
                        type="text"
                        placeholder="Название файла..."
                        value={searchName}
                        onChange={(e) => searchChangeHandler(e)}
                    />
                )} */}
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
                {isAuth && (
                    <NavLink to="/profile">
                        {" "}
                        <img src={avatar} alt="avatar" />
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Navbar;
