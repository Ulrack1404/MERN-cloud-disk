import React, { useEffect } from "react";
import Navbar from "../navbar/navbar";
import styles from "./app.module.scss";
import { useRoutes, useLocation } from "react-router-dom";
// import Registration from "../authorization/registration";
// import Login from "../authorization/login";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../actions/user";
// import Disk from "../disk/disk";
// import Profile from "../profile/profile";
import routes from "../../routes";

function App() {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();
    const location = useLocation();
    const elements = useRoutes(routes(isAuth, location));
    console.log("isAuth app:", isAuth);

    useEffect(() => {
        dispatch(auth());
    }, []);

    return (
        <div className={styles.app}>
            <Navbar />
            <div className={styles.wrap}>
                <div className={styles.container}>{elements}</div>
            </div>
        </div>
    );
}

export default App;
