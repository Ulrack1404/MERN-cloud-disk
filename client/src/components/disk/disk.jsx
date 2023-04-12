import React, { useEffect } from "react";
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

    return (
        <div className={styles.disk}>
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
                        onChange={() => fileUploadHandler(event)}
                        type="file"
                        id="disk__upload-input"
                        className={styles.input}
                    />
                </div>
            </div>
            <FileList />
            <PopUp />
        </div>
    );
};

export default Disk;
