import React from "react";
import styles from "./file.module.scss";
import dirLogo from "../../../../assets/img/dir.svg";
import fileLogo from "../../../../assets/img/file.svg";
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";
import { downloadFile } from "../../../../actions/file";

const File = ({ file }) => {
    const { _id, name, date, size, type, path } = file;
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.files.currentDir);

    function openDirHandler(file) {
        if (file.type === "dir") {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    }
    function downloadClickHandler(e) {
        e.stopPropagation();
        downloadFile(file);
    }

    return (
        <div className={styles.file} onClick={() => openDirHandler(file)}>
            <img
                src={type === "dir" ? dirLogo : fileLogo}
                alt=""
                className={styles.img}
            />
            <div className={styles.name}>{name}</div>
            <div className={styles.date}>{date.slice(0, 10)}</div>
            <div className={styles.size}>{size}</div>
            {file.type !== "dir" && (
                <button
                    onClick={(e) => downloadClickHandler(e)}
                    className={`${styles.btn} ${styles.download}`}
                >
                    Скачать
                </button>
            )}
            <button className={`${styles.btn} ${styles.delete}`}>
                Удалить
            </button>
        </div>
    );
};

export default File;
