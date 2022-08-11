import React from 'react';
import { useSelector } from 'react-redux';
import File from './file/File';
import style from './FileList.module.scss';

const FileList = () => {
  const files = useSelector((state) => state.files.files).map((file) => (
    <File key={file.id} file={file} />
  ));

  return (
    <div className={style.fileList}>
      <div className={style.header}>
        <div className={style.listItem + ' ' + style.name}>Name</div>
        <div className={style.listItem + ' ' + style.date}>Date</div>
        <div className={style.listItem + ' ' + style.size}>Size</div>
      </div>
      {files}
    </div>
  );
};

export default FileList;
