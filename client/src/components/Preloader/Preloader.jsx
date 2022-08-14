import React from 'react';
import style from './Preloader.module.scss';

let Preloader = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.preloader}></div>
    </div>
  );
};

export default Preloader;
