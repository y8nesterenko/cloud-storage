import React, { useRef, useState, useEffect } from 'react';
import style from './ConfirmAction.module.scss';

const ConfirmAction = (props) => {
  const closePopup = () => {
    props.setIsVisible(false);
  };

  return (
    <div
      className={
        props.isVisible ? style.popup + ' ' + style.active : style.popup
      }
      onClick={closePopup}
    >
      <div className={style.content} onClick={(e) => e.stopPropagation()}>
        <div className={style.header}>
          <div className={style.title}>{props.title}</div>
          <button className={style.close} onClick={closePopup}>
            X
          </button>
        </div>
        <div className={style.buttons}>
          <button
            className={style.yes}
            onClick={() => {
              props.action();
              closePopup();
            }}
          >
            yes
          </button>
          <button className={style.no} onClick={closePopup}>
            no
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAction;
