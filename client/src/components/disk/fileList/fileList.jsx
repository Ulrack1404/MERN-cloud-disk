import React from "react";
import { useSelector } from "react-redux";
import File from "./file/file";

import styles from "./fileList.module.scss";

const FileList = () => {
    const files = useSelector((state) => state.files.files);

    return (
        <div className={styles.fileList}>
            <div className={styles.header}>
                <div className={styles.name}>Название</div>
                <div className={styles.date}>Дата</div>
                <div className={styles.size}>Размер</div>
            </div>
            {files.map((file) => (
                <File key={file._id} file={file} />
            ))}
        </div>
    );
};

export default FileList;
