import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFile, downloadFile } from '../../../../api/api';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import sizeFormat from '../../../../utils/sizeFormat';
import ConfirmAction from '../../../ConfirmAction/ConfirmAction';
import style from './File.module.scss';

const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const filesView = useSelector((state) => state.files.view);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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
    <div
      className={
        filesView === 'list'
          ? style.file + ' ' + 'file'
          : style.filePlate + ' ' + 'file'
      }
      onClick={() => openDir(file)}
    >
      <i className={file.type === 'dir' ? '_icon-folder' : '_icon-file'} />
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
        onClick={(e) => {
          e.stopPropagation();
          setIsPopupVisible(true);
          console.log(file);
        }}
        // onClick={(e) => deleteHandler(e)}
      >
        delete
      </button>
      <div className={style.date}>{file.date.slice(0, 10)}</div>
      <div className={style.size}>{sizeFormat(file.size)}</div>
      <ConfirmAction
        isVisible={isPopupVisible}
        setIsVisible={setIsPopupVisible}
        action={deleteHandler}
        title={`Are you sure you want to delete file '${file.name}'?`}
      />
    </div>
  );
};

export default File;
