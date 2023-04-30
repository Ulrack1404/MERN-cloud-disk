import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir, getFiles, uploadFile } from "../../actions/file";
import {
    setCurrentDir,
    setPopupDisplay,
    setView
} from "../../reducers/fileReducer";
import styles from "./disk.module.scss";
import FileList from "./fileList/fileList";
import PopUp from "./popUp/popUp";
import Uploader from "./uploader/Uploader";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.files.currentDir);
    const loader = useSelector((state) => state.app.loader);
    const dirStack = useSelector((state) => state.files.dirStack);
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState("type");

    useEffect(() => {
        dispatch(getFiles(currentDir, sort));
    }, [currentDir, sort]);

    function showPopupHandler() {
        dispatch(setPopupDisplay("flex"));
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

    if (loader) {
        return (
            <div className={styles.loader}>
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
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
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className={styles.select}
                    id=""
                >
                    <option value="name">По имени</option>
                    <option value="type">По типу</option>
                    <option value="date">По дате</option>
                </select>
                <button
                    className={styles.filesPlate}
                    onClick={() => dispatch(setView("plate"))}
                />
                <button
                    className={styles.filesList}
                    onClick={() => dispatch(setView("list"))}
                />
            </div>
            <FileList />
            <PopUp />
            <Uploader />
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
