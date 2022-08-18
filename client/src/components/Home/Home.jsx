import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Home.module.scss';
import kosmonavt from '../../assets/img/kosmonavt.png';

const Home = () => {
  return (
    <section className={style.wrapper}>
      <div className={style.home}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div className={style.kosmonavt}>
          <img src={kosmonavt} alt='' />
        </div>
        <h1 className={style.title}>Project - Cloud Storage</h1>
        <div className={style.buttons}>
          <button>
            <NavLink to='/login'>login</NavLink>
          </button>
          <button>
            <NavLink to='/registration'>sign up</NavLink>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
