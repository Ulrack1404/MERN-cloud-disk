import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir } from "../../../actions/file";
import { setPopupDisplay } from "../../../reducers/fileReducer";
import Input from "../../../utils/input/input";
import styles from "./popUp.module.scss";

const PopUp = () => {
    const [dirName, setDirName] = useState("");
    const popupDisplay = useSelector((state) => state.files.popupDisplay);
    const currentDir = useSelector((state) => state.files.currentDir);
    const dispatch = useDispatch();

    function createHandler() {
        dispatch(createDir(currentDir, dirName));
        setDirName("");
        dispatch(setPopupDisplay("none"));
    }

    return (
        <div
            className={styles.popup}
            onClick={() => dispatch(setPopupDisplay("none"))}
            style={{ display: popupDisplay }}
        >
            <div
                className={styles.content}
                onClick={(event) => event.stopPropagation()}
            >
                <div className={styles.header}>
                    <div className={styles.title}>Создать новую папку</div>
                    <button
                        className={styles.btn}
                        onClick={() => dispatch(setPopupDisplay("none"))}
                    >
                        &times;
                    </button>
                </div>
                <Input
                    type="text"
                    placeholder="Введите название папки..."
                    value={dirName}
                    setValue={setDirName}
                />
                <button
                    className={styles.create}
                    onClick={() => createHandler()}
                >
                    Создать{" "}
                </button>
            </div>
        </div>
    );
};

export default PopUp;
