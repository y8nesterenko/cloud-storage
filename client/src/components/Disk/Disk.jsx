import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from '../../api/api';
import FileList from './fileList/FileList';
import style from './Disk.module.scss';
import Popup from './Popup';
import { setCurrentDir, setView } from '../../reducers/fileReducer';
import Uploader from './Uploader/Uploader';
import Preloader from '../Preloader/Preloader';

const Disk = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState('name');
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);
  const preloader = useSelector((state) => state.app.preloader);
  const view = useSelector((state) => state.files.view);

  const goBack = () => {
    const prevDirId = dirStack.pop();
    dispatch(setCurrentDir(prevDirId));
  };

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

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

  if (preloader) {
    return <Preloader />;
  }

  return !dragEnter ? (
    <div
      className={style.disk}
      onDragEnter={dragEnterHandler}
      onDragOver={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
    >
      <div className={style.buttons}>
        <button
          className={style.back + ' ' + '_icon-arrow_left'}
          onClick={() => goBack()}
        />
        <button
          className={style.create}
          onClick={() => {
            setIsPopupVisible(true);
          }}
        >
          Create folder
        </button>
        <button className={style.uploadFile}>
          <label htmlFor='uploadFileInput' className={style.uploadFileLabel}>
            <span>Upload a file</span>
            <i className='_icon-plus'></i>
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
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={style.select}
        >
          <option value='name'>by name</option>
          <option value='type'>by type</option>
          <option value='date'>by date</option>
        </select>
        {view === 'list' ? (
          <button
            className={style.plate + ' ' + '_icon-plate'}
            onClick={() => dispatch(setView('plate'))}
          />
        ) : (
          <button
            className={style.list + ' ' + '_icon-list'}
            onClick={() => dispatch(setView('list'))}
          />
        )}
      </div>
      <FileList />
      <Popup
        isVisible={isPopupVisible}
        setIsVisible={setIsPopupVisible}
        currentDir={currentDir}
      />
      <Uploader />
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
