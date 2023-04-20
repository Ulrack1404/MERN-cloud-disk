import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir, getFiles, uploadFile } from "../../actions/file";
import { setCurrentDir, setPopupDidplay } from "../../reducers/fileReducer";
import styles from "./disk.module.scss";
import FileList from "./fileList/fileList";
import PopUp from "./popUp/popUp";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.files.currentDir);
    const dirStack = useSelector((state) => state.files.dirStack);
    const [dragEnter, setDragEnter] = useState(false);
    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [currentDir]);

    function showPopupHandler() {
        dispatch(setPopupDidplay("flex"));
    }
    function backClickHandler() {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    }
    function dragEnterHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
        console.log("event:", event);
    }

    function dragLeaveHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    }
    function dropHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));
        setDragEnter(false);
    }

    return !dragEnter ? (
        <div
            className={styles.disk}
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
        >
            <div className={styles.btns}>
                <button
                    className={styles.back}
                    onClick={() => backClickHandler()}
                >
                    Назад
                </button>
                <button
                    className={styles.create}
                    onClick={() => showPopupHandler()}
                >
                    Создать папку
                </button>
                <div className={styles.upload}>
                    <label
                        htmlFor="disk__upload-input"
                        className={styles.label}
                    >
                        Загрузить файл
                    </label>
                    <input
                        multiple={true}
                        onChange={(event) => fileUploadHandler(event)}
                        type="file"
                        id="disk__upload-input"
                        className={styles.input}
                    />
                </div>
            </div>
            <FileList />
            <PopUp />
        </div>
    ) : (
        <div
            className={styles.dropArea}
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
            onDrop={dropHandler}
        >
            Перетащите файлы сюда
        </div>
    );
};

export default Disk;
