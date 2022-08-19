import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './api/api';
import Disk from './components/Disk/Disk';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Preloader from './components/Preloader/Preloader';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth()).then(() => {
      setIsLoading(false);
    });
  }, []);

  const [pickedColor, setPickedColor] = useState('dark');

  useEffect(() => {
    setPickedColor(window.localStorage.getItem('pickedColor'));
  }, []);

  const setColor = useEffect(() => {
    window.localStorage.setItem('pickedColor', pickedColor);
    let root = document.querySelector(':root').style;

    if (pickedColor === 'dark') {
      root.setProperty('--primary-color-hue', 252);
      root.setProperty('--light-color-lightness', '95%');
      root.setProperty('--white-color-lightness', '100%');
      root.setProperty('--dark-color-lightness', '17%');
    } else {
      root.setProperty('--primary-color-hue', 352);
      root.setProperty('--light-color-lightness', '10%');
      root.setProperty('--white-color-lightness', '10%');
      root.setProperty('--dark-color-lightness', '100%');
    }
  }, [pickedColor]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        {isAuth ? (
          <div className='wrapper'>
            <Routes>
              <Route path='/' element={<Disk />} />
              <Route
                path='/profile'
                element={
                  <Profile
                    pickedColor={pickedColor}
                    setPickedColor={setPickedColor}
                    setColor={setColor}
                  />
                }
              />
              <Route exact path='*' element={<Navigate to={'/'} />} />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Login />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='*' element={<Navigate to={'/home'} />} />
          </Routes>
        )}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
