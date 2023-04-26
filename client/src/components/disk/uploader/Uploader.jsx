import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideUploader } from "../../../reducers/uploadReducer";
import styles from "./uploader.module.scss";
import UploadFile from "./UploadFile";

const Uploader = () => {
    const dispatch = useDispatch();
    const files = useSelector((state) => state.upload.files);
    const isVisible = useSelector((state) => state.upload.isVisible);
    return (
        isVisible && (
            <div className={styles.uploader}>
                <div className={styles.header}>
                    <div className={styles.header_title}>Загрузки</div>
                    <button
                        className={styles.uploader_close}
                        onClick={() => dispatch(hideUploader())}
                    >
                        &times;
                    </button>
                </div>
                {files.map((file) => (
                    <UploadFile key={file.id} file={file} />
                ))}
            </div>
        )
    );
};

export default Uploader;
