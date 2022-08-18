import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './api/api';
import Disk from './components/Disk/Disk';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        {isAuth ? (
          <div className='wrapper'>
            <Routes>
              <Route path='/' element={<Disk />} />
              <Route path='/profile' element={<Profile />} />
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
      </div>
    </BrowserRouter>
  );
}

export default App;
