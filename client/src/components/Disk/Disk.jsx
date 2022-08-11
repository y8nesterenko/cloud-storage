import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDir, getFiles } from '../../api/api';
import FileList from './fileList/FileList';
import style from './Disk.module.scss';
import Popup from './Popup';
import { setCurrentDir } from '../../reducers/fileReducer';

const Disk = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <div className={style.disk}>
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
      </div>
      <FileList />
      <Popup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        currentDir={currentDir}
      />
    </div>
  );
};

export default Disk;
