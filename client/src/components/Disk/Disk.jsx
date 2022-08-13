import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDir, getFiles, uploadFile } from '../../api/api';
import FileList from './fileList/FileList';
import style from './Disk.module.scss';
import Popup from './Popup';
import { setCurrentDir } from '../../reducers/fileReducer';

const Disk = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dragEnter, setDragEnter] = useState(false);
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);

  const goBack = () => {
    const prevDirId = dirStack.pop();
    dispatch(setCurrentDir(prevDirId));
  };

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  const fileUploadHandler = (e) => {
    const files = [...e.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  };

  const dragEnterHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  };

  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  };

  return !dragEnter ? (
    <div
      className={style.disk}
      onDragEnter={dragEnterHandler}
      onDragOver={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
    >
      <div className={style.buttons}>
        <button className={style.back} onClick={() => goBack()}>
          Back
        </button>
        <button
          className={style.create}
          onClick={() => {
            setIsVisible(true);
          }}
        >
          Create folder
        </button>
        <div className={style.uploadFile}>
          <label htmlFor='uploadFileInput' className={style.uploadFileLabel}>
            Upload a file
          </label>
          <input
            type='file'
            id='uploadFileInput'
            className={style.uploadFileInput}
            multiple={true}
            onChange={(e) => {
              fileUploadHandler(e);
            }}
          />
        </div>
      </div>
      <FileList />
      <Popup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        currentDir={currentDir}
      />
    </div>
  ) : (
    <div
      className={style.dropArea}
      onDragEnter={dragEnterHandler}
      onDragOver={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
    >
      drag files here
    </div>
  );
};

export default Disk;
