import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createDir } from '../../api/api';
import style from './Popup.module.scss';

const Popup = (props) => {
  const [dirName, setDirName] = useState('');
  const dispatch = useDispatch();
  const inputEl = useRef(null);

  const createDirHandler = () => {
    dispatch(createDir(props.currentDir, dirName));
    props.setIsVisible(false);
    setDirName('');
  };

  const closePopup = () => {
    props.setIsVisible(false);
    setDirName('');
  };

  useEffect(() => {
    if (props.isVisible) {
      inputEl.current.focus();
    }
  }, [props.isVisible]);

  return (
    <div
      className={
        props.isVisible ? style.popup + ' ' + style.active : style.popup
      }
      onClick={closePopup}
    >
      <div className={style.content} onClick={(e) => e.stopPropagation()}>
        <div className={style.header}>
          <div className={style.title}>Create new folder</div>
          <button className={style.close} onClick={closePopup}>
            Cancel
          </button>
        </div>
        <input
          type='text'
          placeholder='Enter folder name'
          value={dirName}
          onChange={(e) => setDirName(e.target.value)}
          ref={inputEl}
        />
        <button
          className={style.create}
          onClick={() => {
            createDirHandler();
          }}
        >
          Add folder
        </button>
      </div>
    </div>
  );
};

export default Popup;
