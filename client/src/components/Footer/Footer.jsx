import React from 'react';
import style from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <a
        className='_icon-facebook'
        href='https://www.facebook.com/profile.php?id=1648141964'
        target='_blank'
        rel='noopener noreferrer'
      ></a>
      <a
        className='_icon-linkedin'
        href='https://www.linkedin.com/'
        target='_blank'
        rel='noopener noreferrer'
      ></a>
      <a
        className='_icon-portfolio'
        href='http://test.inf.ua'
        target='_blank'
        rel='noopener noreferrer'
      ></a>
    </footer>
  );
};

export default Footer;
