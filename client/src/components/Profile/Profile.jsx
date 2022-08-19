import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAvatar, uploadAvatar } from '../../api/api';
import { logout } from '../../reducers/userReducer';
import sizeFormat from '../../utils/sizeFormat';
import style from './Profile.module.scss';
import { SERVER_URL } from '../../config';
import avatarLogo from '../../assets/img/avatar.svg';
import ConfirmAction from '../ConfirmAction/ConfirmAction';

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupLogoutVisible, setIsPopupLogoutVisible] = useState(false);

  const uploadAvatarHandler = (e) => {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  };

  const avatar = currentUser.avatar
    ? `${SERVER_URL + currentUser.avatar}`
    : avatarLogo;

  const totalStorage = useMemo(() => {
    return sizeFormat(currentUser.diskSpace);
  }, [currentUser.diskSpace]);

  const availableStorage = useMemo(() => {
    return sizeFormat(currentUser.diskSpace - currentUser.usedSpace);
  }, [currentUser.diskSpace]);

  return (
    <div className={style.profile}>
      <div>
        User: <span className={style.title}>{currentUser.email}</span>
      </div>
      <div>
        Available Storage:{' '}
        <span className={style.title}>{availableStorage}</span>
      </div>
      <div>
        Total Storage: <span className={style.title}>{totalStorage}</span>
      </div>
      <div className={style.avatar}>
        <img src={avatar} alt='avatar' />
        <div className={style.buttons}>
          {currentUser.avatar && (
            <button
              // onClick={() => dispatch(deleteAvatar())}
              onClick={(e) => {
                e.stopPropagation();
                setIsPopupVisible(true);
              }}
            >
              delete avatar
            </button>
          )}
          <button className={style.uploadAvatar}>
            <label htmlFor='uploadAvatar' className={style.uploadAvatarLabel}>
              <span>change avatar</span>
            </label>
            <input
              id='uploadAvatar'
              onChange={(e) => uploadAvatarHandler(e)}
              accept='image/*'
              type='file'
              placeholder='upload avatar'
              className={style.uploadAvatarInput}
            />
          </button>
        </div>
      </div>
      <button
        className={style.logout}
        onClick={(e) => {
          e.stopPropagation();
          setIsPopupLogoutVisible(true);
        }}
      >
        Logout
      </button>
      <ConfirmAction
        isVisible={isPopupLogoutVisible}
        setIsVisible={setIsPopupLogoutVisible}
        action={() => dispatch(logout())}
        title={`Are you sure you want to logout?`}
      />

      <ConfirmAction
        isVisible={isPopupVisible}
        setIsVisible={setIsPopupVisible}
        action={() => dispatch(deleteAvatar())}
        title={`Are you sure you want to delete the avatar?`}
      />
    </div>
  );
};

export default Profile;
