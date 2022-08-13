import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFileFromUpload } from '../../../reducers/uploadReducer';
import doneIcon from '../../../assets/img/done.svg';
import style from './UploadFile.module.scss';

const UploadFile = ({ file }) => {
  const dispatch = useDispatch();

  return (
    <div className={style.uploadFile}>
      <div className={style.fileHeader}>
        <div className={style.fileName}>{file.name}</div>
        {file.progress == 100 ? (
          <img src={doneIcon} alt='done' />
        ) : (
          <button
            className={style.remove}
            onClick={() => dispatch(removeFileFromUpload(file.id))}
          >
            cancel
          </button>
        )}
      </div>
      {file.progress < 100 && (
        <div className={style.progress}>
          <div
            className={style.progressBar}
            style={{ width: file.progress + '%' }}
          />
          <div className={style.progressPercent}>{file.progress}%</div>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
