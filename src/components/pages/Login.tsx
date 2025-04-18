import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router';

import UsersContext from '../contexts/UsersContext';
import { User, UsersContextTypes } from '../../types';
import Header from "../UI/organism/Header";
import Footer from "../UI/organism/Footer";
import styled from 'styled-components';

const Login = () => {
  const { users, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const initValues: Pick<User, 'email' | 'password'> = {
    email: '',
    password: ''
  };

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: (values, { resetForm }) => {
      const foundUser = users.find(user =>
        user.email === values.email &&
        bcrypt.compareSync(values.password, user.password)
      );

      if (foundUser) {
        setLoggedInUser(foundUser);
        resetForm();
        setError('');
        navigate('/');
      } else {
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
          'Password must contain at least 1 uppercase, 1 lowercase, 1 special symbol, 1 number, and be 8–25 characters long.'
        )
        .required("Field can't be empty")
        .trim()
    })
  });

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <FormWrapper onSubmit={formik.handleSubmit}>
          <h2>Login</h2>

          <Label>Email:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <Error>{formik.errors.email}</Error>
          )}

          <Label>Password:</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <Error>{formik.errors.password}</Error>
          )}

          <SubmitButton type="submit">Login</SubmitButton>
          {error && <Error>{error}</Error>}
        </FormWrapper>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default Login;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.main`
  flex: 1;
`;

const FormWrapper = styled.form`
  max-width: 500px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.6rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Label = styled.label`
  font-weight: bold;
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  background-color: rgb(250, 70, 70);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 14px;
  margin: 0;
`;
