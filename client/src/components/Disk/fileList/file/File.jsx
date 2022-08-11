import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fileLogo from '../../../../assets/img/file.svg';
import folderLogo from '../../../../assets/img/folder.svg';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import style from './File.module.scss';

const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);

  const openDir = () => {
    dispatch(pushToStack(currentDir));
    dispatch(setCurrentDir(file._id));
  };

  return (
    <div
      className={style.file}
      onClick={file.type === 'dir' ? () => openDir() : ''}
    >
      <img
        src={file.type === 'dir' ? folderLogo : fileLogo}
        alt='file logo'
        className={style.fileImage}
      />
      <div className={style.name}>{file.name}</div>
      <div className={style.date}>{file.date.slice(0, 10)}</div>
      <div className={style.size}>{file.size}</div>
    </div>
  );
};

export default File;
