import React from 'react';
import style from './Registration.module.scss';
import { Formik } from 'formik';
import { loginFormSchema } from '../../utils/validators';

const Registration = (props) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberMe: undefined,
        captcha: '',
      }}
      validationSchema={loginFormSchema}
      onSubmit={(values, { setSubmitting, setStatus, setTouched }) => {
        setSubmitting(true);
        props
          .login(
            values.email,
            values.password,
            values.rememberMe,
            values.captcha,
            setStatus
          )
          .then(() => {
            setSubmitting(false);
          });
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
          <div className={style.error}>{status}</div>
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
          </div>

          <button className='btn' type='submit' disabled={isSubmitting}>
            Log in
          </button>
        </form>
      )}
    </Formik>
  );
};

export default Registration;
