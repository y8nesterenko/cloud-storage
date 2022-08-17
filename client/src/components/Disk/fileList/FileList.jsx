import React from 'react';
import { useSelector } from 'react-redux';
import File from './file/File';
import style from './FileList.module.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const FileList = () => {
  const files = useSelector((state) => state.files.files);
  const filesView = useSelector((state) => state.files.view);

  if (files.length === 0) {
    return <h2>This folder is empty</h2>;
  }

  if (filesView === 'list') {
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
  }

  if (filesView === 'plate') {
    return (
      <div className={style.filePlate}>
        {files.map((file) => (
          <File key={file._id} file={file} />
        ))}
      </div>
    );
  }
};

export default FileList;
