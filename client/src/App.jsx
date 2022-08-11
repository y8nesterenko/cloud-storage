import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './api/api';
import Disk from './components/Disk/Disk';

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
        <div className='wrapper'>
          {isAuth ? (
            <Routes>
              <Route path='/' element={<Disk />} />
              <Route exact path='*' element={<Navigate to={'/'} />} />
            </Routes>
          ) : (
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/registration' element={<Login />} />
              <Route exact path='/home' element={<div>Landing</div>} />
              <Route exact path='*' element={<Navigate to={'/home'} />} />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
