import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAvatar, uploadAvatar } from '../../api/api';
import style from './Profile.module.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const uploadAvatarHandler = (e) => {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  };

  return (
    <div>
      <button onClick={() => dispatch(deleteAvatar())}>Delete avatar</button>
      <input
        onChange={(e) => uploadAvatarHandler(e)}
        accept='image/*'
        type='file'
        placeholder='upload avatar'
      />
    </div>
  );
};

export default Profile;
