import React from 'react';
import { useSelector } from 'react-redux';
import File from './file/File';
import style from './FileList.module.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const FileList = () => {
  const files = useSelector((state) => state.files.files);

  if (files.length === 0) {
    return <h2>This folder is empty</h2>;
  }

  return (
    <div className={style.fileList}>
      <div className={style.header}>
        <div className={style.listItem + ' ' + style.name}>Name</div>
        <div className={style.listItem + ' ' + style.date}>Date</div>
        <div className={style.listItem + ' ' + style.size}>Size</div>
      </div>
      <TransitionGroup>
        {files.map((file) => (
          <CSSTransition
            key={file._id}
            timeout={500}
            classNames={'file'}
            exit={false}
          >
            <File file={file} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default FileList;
