import React, { useEffect } from "react";
import Navbar from "../navbar/navbar";
import styles from "./app.module.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Registration from "../authorization/registration";
import Login from "../authorization/login";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../actions/user";
import Disk from "../disk/disk";

function App() {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(auth());
    }, []);
    return (
        <BrowserRouter>
            <div className={styles.app}>
                <Navbar />
                <div className={styles.wrap}>
                    <div className={styles.container}>
                        {!isAuth ? (
                            <Routes>
                                <Route
                                    path="/registration"
                                    element={<Registration />}
                                />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="*"
                                    element={<Navigate to="/login" />}
                                />
                            </Routes>
                        ) : (
                            <Routes>
                                <Route path="/" end element={<Disk />} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        )}
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
