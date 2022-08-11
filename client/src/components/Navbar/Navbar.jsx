import React from 'react';
import style from './Navbar.module.scss';
import Logo from '../../assets/img/logo.svg';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <nav className={style.navbar}>
      <div className={style.container}>
        <div className={style.columnLeft}>
          <div className={style.logo}>
            <img src={Logo} alt='logo' />
          </div>
          <div className={style.header}>
            <NavLink to='/'>NY Cloud Storage</NavLink>
          </div>
        </div>

        {isAuth ? (
          <div className={style.columnRight}>
            <a onClick={() => dispatch(logout())}>Sign out</a>
          </div>
        ) : (
          <div className={style.columnRight}>
            <div className={style.login}>
              <NavLink to='/login'>Sign in</NavLink>
            </div>
            <div className={style.registration}>
              <NavLink to='/registration'>Sign up</NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
