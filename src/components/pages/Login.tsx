import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router';
import { useState } from 'react';

import UsersContext from '../contexts/UsersContext';
import { User, UsersContextTypes } from '../../types';

const Login = () => {
  const { users, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const initValues: Pick<User, 'email'|'password'> = {
    email: '',
    password: ''
  }

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: (values, { resetForm }) => {
      const foundUser = users.find(user => 
        user.email === values.email &&
        bcrypt.compareSync(values.password, user.password)
      );
      if(foundUser){
        console.log('OK')
        setLoggedInUser(foundUser);
        resetForm();
        setError('');
        navigate('/');
      }  else {
        console.log('NOT OK')
        setError('Wrong email or password');
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email()
        .required("Field can't be empty")
        .trim(),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
          'Slaptažodis privalo turėti bent 1 didžiąją, bent 1 mažąją raidę, specialų simbolį (@$!%*?&), bent 1 skaičių ir būtų ne trumpesnis nei 8 simbolių ir ne ilgesnis nei 25 simbolių.'
        )
        .required("Field can't be empty")
        .trim()
    })
  });

    return (
    <section>
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email" name="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.errors.email && formik.touched.email &&
            <p>{formik.errors.email}</p>
          }
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password" name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.errors.password && formik.touched.password &&
            <p>{formik.errors.password}</p>
          }
        </div>
        <input type="submit" value="Login" />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </section>
  );
}
   
export default Login;