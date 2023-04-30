import React, { createRef } from "react";
import { useSelector } from "react-redux";
import File from "./file/file";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import styles from "./fileList.module.scss";

const FileList = () => {
    const files = useSelector((state) => state.files.files).map((i) => ({
        ...i,
        nodeRef: createRef(null)
    }));
    const view = useSelector((state) => state.files.view);

    if (files.length === 0) {
        return <div className={styles.noFiles}>Файлы отсутствуют</div>;
    }
    if (view === "plate") {
        return (
            <div className={styles.filePlate}>
                {files.map((file) => (
                    <File file={file} key={file._id} />
                ))}
            </div>
        );
    }

    if (view === "list") {
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
    }
};

export default FileList;
