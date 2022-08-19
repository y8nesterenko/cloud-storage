import React, { useState, useEffect } from 'react';
import style from './Theme.module.scss';

const Theme = (props) => {
  return (
    <div className={style.theme}>
      <div className={style.title}>Choose your favorite color scheme</div>
      <div className={style.colorScheme}>
        <div
          className={
            props.pickedColor === 'dark'
              ? style.color1 + ' ' + style.active
              : style.color1
          }
          onClick={(e) =>
            props.setPickedColor(e.target.id || e.target.parentElement.id)
          }
          id='dark'
        >
          <span></span>
          <h5>Dark</h5>
        </div>

        <div
          className={
            props.pickedColor === 'light'
              ? style.color2 + ' ' + style.active
              : style.color2
          }
          onClick={(e) =>
            props.setPickedColor(e.target.id || e.target.parentElement.id)
          }
          id='light'
        >
          <span></span>
          <h5>Light</h5>
        </div>
      </div>
    </div>
  );
};

export default Theme;
