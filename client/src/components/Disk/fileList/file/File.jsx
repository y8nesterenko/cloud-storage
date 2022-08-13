import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFile, downloadFile } from '../../../../api/api';
import fileLogo from '../../../../assets/img/file.svg';
import folderLogo from '../../../../assets/img/folder.svg';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import sizeFormat from '../../../../utils/sizeFormat';
import style from './File.module.scss';

const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);

  const openDir = () => {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  };

  const downloadHandler = (e) => {
    e.stopPropagation();
    downloadFile(file);
  };

  const deleteHandler = (e) => {
    e.stopPropagation();
    dispatch(deleteFile(file));
  };

  return (
    <div className={style.file + ' ' + 'file'} onClick={() => openDir(file)}>
      <img
        src={file.type === 'dir' ? folderLogo : fileLogo}
        alt='file logo'
        className={style.fileImage}
      />
      <div className={style.name}>{file.name}</div>
      {file.type !== 'dir' && (
        <button
          className={style.buttons + ' ' + style.download}
          onClick={(e) => {
            downloadHandler(e);
          }}
        >
          download
        </button>
      )}
      <button
        className={style.buttons + ' ' + style.delete}
        onClick={(e) => deleteHandler(e)}
      >
        delete
      </button>
      <div className={style.date}>{file.date.slice(0, 10)}</div>
      <div className={style.size}>{sizeFormat(file.size)}</div>
    </div>
  );
};

export default File;
