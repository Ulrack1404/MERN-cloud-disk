import React from "react";
import { useDispatch } from "react-redux";
import { removeUploadFile } from "../../../reducers/uploadReducer";
import styles from "./uploader.module.scss";

const UploadFile = ({ file }) => {
    const dispatch = useDispatch();
    return (
        <div className={styles.uploadFile}>
            <div className={styles.uploadFile_header}>
                <div className={styles.uploadFile_name}>{file.name}</div>
                <button
                    className={styles.uploadFile_remove}
                    onClick={() => dispatch(removeUploadFile(file.id))}
                >
                    &times;
                </button>
            </div>
            <div className={styles.uploadFile_progressBar}>
                <div
                    className={styles.uploadFile_progressBar_bar}
                    style={{ width: file.progress + "%" }}
                ></div>
                <div className={styles.uploadFile_progressBar_percent}>
                    {file.progress}%
                </div>
            </div>
        </div>
    );
};

export default UploadFile;
