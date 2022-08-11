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
      {isLogging ? (
        <h2>Please sign up in the form below</h2>
      ) : (
        <h2>Login in the form below</h2>
      )}
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
            dispatch(login(values.email, values.password));
          }

          if (!isLogging) {
            registration(values.email, values.password).then((response) => {
              setStatus(response);
              if (response === 'User was created') {
                setIsSuccess(true);
              }
              setTimeout(() => {
                setStatus(null);
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
            <div className={style.field}>
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
              {
                <span className={style.error}>
                  {errors.email && touched.email && errors.email}
                </span>
              }
            </div>

            <div className={style.field}>
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
              {
                <span className={style.error}>
                  {errors.password && touched.password && errors.password}{' '}
                </span>
              }
            </div>

            {!isLogging && (
              <div className={style.field}>
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
                {
                  <span className={style.error}>
                    {errors.passwordConfirmation &&
                      touched.passwordConfirmation &&
                      errors.passwordConfirmation}{' '}
                  </span>
                }
              </div>
            )}

            <button className='btn' type='submit' disabled={isSubmitting}>
              {isLogging ? <span>Sign in</span> : <span>Sign up</span>}
            </button>
            <div className={isSuccess ? style.success : style.error}>
              {status}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default withRouter(Login);
