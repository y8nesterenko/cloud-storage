import React, { useState } from 'react';
import style from './Navbar.module.scss';
import Logo from '../../assets/img/logo.svg';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import { getFiles, searchFile } from '../../api/api';
import { showPreloader } from '../../reducers/appReducer';

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentDir = useSelector((state) => state.files.currentDir);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);

  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }
    dispatch(showPreloader());
    if (e.target.value !== '') {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFile(value));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  };

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
          {isAuth && (
            <input
              value={searchQuery}
              onChange={(e) => searchHandler(e)}
              className={style.search}
              type='text'
              placeholder='search'
            />
          )}
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
