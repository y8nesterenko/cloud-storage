import React, { useState, useEffect } from 'react';
import style from './Login.module.scss';
import { Formik } from 'formik';
import { loginFormSchema } from '../../utils/validators';
import withRouter from '../../hocs/withRouter';
import { registration, login } from '../../api/api';
import { useDispatch } from 'react-redux';

const Login = (props) => {
  const [isLogging, setIsLogging] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.router.location.pathname === '/login') {
      setIsLogging(true);
    } else if (props.router.location.pathname === '/registration') {
      setIsLogging(false);
    }
  }, [props.router.location.pathname]);

  return (
    <div className={style.login}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={loginFormSchema}
        onSubmit={(values, { setSubmitting, setStatus, setTouched }) => {
          setSubmitting(true);

          if (isLogging) {
            dispatch(login(values.email, values.password)).then((response) => {
              setStatus(response);
              setTimeout(() => {
                setStatus(null);
              }, 5000);
            });
          }

          if (!isLogging) {
            registration(values.email, values.password).then((response) => {
              setStatus(response);
              if (response === 'User was created') {
                setIsSuccess(true);
              }
              setTimeout(() => {
                setStatus(null);
                if (response === 'User was created') {
                  props.router.navigate('/login');
                }
              }, 5000);
            });
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          status,
          /* and other goodies */
        }) => (
          <form className={style.form} onSubmit={handleSubmit}>
            {isLogging ? (
              <h2>Please login in the form below</h2>
            ) : (
              <h2>Please sign up in the form below</h2>
            )}
            <div className={style.field}>
              <i className='_icon-avatar' />
              <input
                type='email'
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder='Enter your email'
                touched={touched.email}
                error={errors.email}
              />
            </div>
            {errors.email && touched.email && (
              <div className={style.error}>{errors.email}</div>
            )}

            <div className={style.field}>
              <i className='_icon-password' />
              <input
                type='password'
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder='Enter your password'
                touched={touched.password}
                error={errors.password}
              />
            </div>
            {errors.password && touched.password && (
              <div className={style.error}>{errors.password}</div>
            )}

            {!isLogging && (
              <div className={style.field}>
                <i className='_icon-password' />

                <input
                  type='password'
                  name='passwordConfirmation'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordConfirmation}
                  placeholder='Confirm your password'
                  touched={touched.passwordConfirmation}
                  error={errors.passwordConfirmation}
                />
              </div>
            )}
            {errors.passwordConfirmation && touched.passwordConfirmation && (
              <div className={style.error}>{errors.passwordConfirmation}</div>
            )}

            <div className={isSuccess ? style.success : style.error}>
              {status}
            </div>

            <button className='btn' type='submit' disabled={isSubmitting}>
              {isLogging ? <span>Sign in</span> : <span>Sign up</span>}
            </button>

            {!isLogging && status === 'User was created' && (
              <div className={style.success}>
                In 5 seconds you will be redirected to login page
              </div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default withRouter(Login);
