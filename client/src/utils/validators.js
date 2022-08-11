import * as Yup from 'yup';

export const loginFormSchema = Yup.object({
   email: Yup.string()
      .email()
      .required('Required'),
   password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
      .required('Required'),
   passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});