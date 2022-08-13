import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideUploader } from '../../../reducers/uploadReducer';
import style from './Uploader.module.scss';
import UploadFile from './UploadFile';

const Uploader = () => {
  const files = useSelector((state) => state.upload.files);
  const isVisible = useSelector((state) => state.upload.isUploaderVisible);
  const dispatch = useDispatch();

  return (
    isVisible && (
      <div className={style.uploader}>
        <div className={style.header}>
          <div className={style.title}>Downloads</div>
          <button
            className={style.lose}
            onClick={() => {
              dispatch(hideUploader());
            }}
          >
            X
          </button>
        </div>
        {files.map((file) => (
          <UploadFile key={file.id} file={file} />
        ))}
      </div>
    )
  );
};

export default Uploader;
