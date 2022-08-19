import React, { useState } from 'react';
import style from './Navbar.module.scss';
import Logo from '../../assets/img/logo.svg';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import { getFiles, searchFile } from '../../api/api';
import { showPreloader } from '../../reducers/appReducer';
import avatarLogo from '../../assets/img/avatar.svg';
import { SERVER_URL } from '../../config';
import ConfirmAction from '../ConfirmAction/ConfirmAction';

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentDir = useSelector((state) => state.files.currentDir);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isPopupLogoutVisible, setIsPopupLogoutVisible] = useState(false);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);
  const avatar = currentUser.avatar
    ? `${SERVER_URL + currentUser.avatar}`
    : avatarLogo;

  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }
    if (e.target.value !== '') {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(showPreloader());
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
            <NavLink to='/' className='_icon-logo'></NavLink>
          </div>
          <div className={style.header}>
            <NavLink to='/'>NY Cloud Storage</NavLink>
          </div>
          {isAuth && (
            <div className={style.searchBar}>
              <i className='_icon-search'></i>
              <input
                value={searchQuery}
                onChange={(e) => searchHandler(e)}
                className={style.search}
                type='text'
                placeholder='search'
              />
            </div>
          )}
        </div>

        {isAuth ? (
          <div className={style.columnRight}>
            <NavLink to='/profile'>
              <img src={avatar} alt='avatar' className={style.avatar} />
            </NavLink>
            <a
              className={style.signOut}
              // onClick={(e) => dispatch(logout())}
              onClick={(e) => {
                e.stopPropagation();
                setIsPopupLogoutVisible(true);
              }}
            >
              Logout
            </a>
            <ConfirmAction
              isVisible={isPopupLogoutVisible}
              setIsVisible={setIsPopupLogoutVisible}
              action={() => dispatch(logout())}
              title={`Are you sure you want to logout?`}
            />
          </div>
        ) : (
          <div className={style.columnRight}>
            <div className={style.login}>
              <NavLink to='/login'>login</NavLink>
            </div>
            <div className={style.registration}>
              <NavLink to='/registration'>sign up</NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
