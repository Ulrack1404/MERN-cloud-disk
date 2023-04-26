import React, { createRef } from "react";
import { useSelector } from "react-redux";
import File from "./file/file";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import styles from "./fileList.module.scss";

const FileList = () => {
    let files = useSelector((state) => state.files.files).map((i) => ({
        ...i,
        nodeRef: createRef(null)
    }));

    return (
        <div className={styles.fileList}>
            <div className={styles.header}>
                <div className={styles.name}>Название</div>
                <div className={styles.date}>Дата</div>
                <div className={styles.size}>Размер</div>
            </div>
            <TransitionGroup>
                {files.map((file) => (
                    <CSSTransition
                        key={file._id}
                        timeout={900}
                        classNames="file"
                        exit={false}
                        nodeRef={file.nodeRef}
                    >
                        <File file={file} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
};

export default FileList;
