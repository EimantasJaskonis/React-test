import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { v4 as generateID } from 'uuid';
import bcrypt from 'bcryptjs';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import UsersContext from '../contexts/UsersContext';
import { User } from '../../types';
import Header from '../UI/organism/Header';
import Footer from '../UI/organism/Footer';
import styled from 'styled-components';
import { Link } from 'react-router';

type InitValues = Omit<User, 'id' | 'passwordText' | 'avatar' | 'saved'> & { passwordRepeat: string };

const Register = () => {
  const { dispatch, users, setLoggedInUser } = useContext(UsersContext)!;
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState('');

  const initValues: InitValues = {
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
    role: ''
  };

  const handleSubmit = (values: InitValues, { resetForm }: { resetForm: () => void }) => {
    const nameExists = users.some(user => user.name === values.name);
    const emailExists = users.some(user => user.email === values.email);

    if (nameExists || emailExists) {
      setModalMessage(nameExists ? 'Username is already taken' : 'Email is already in use');
      return;
    }

    const newUser: User = {
      id: generateID(),
      name: values.name,
      email: values.email,
      password: bcrypt.hashSync(values.password, 10),
      passwordText: values.password,
      role: values.role,
      avatar: undefined,
      saved: []
    };

    fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });

    dispatch({ type: 'addNew', newUser });
    setLoggedInUser(newUser);
    resetForm();
    navigate('/');
  };

  const validSchema = Yup.object({
    name: Yup.string()
      .min(5, 'Name too short')
      .max(20, 'Name too long')
      .trim()
      .required('Enter your name'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Enter your email'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        'Password must contain uppercase, lowercase, number, symbol and be 8–20 characters'
      )
      .required('Enter your password')
      .trim(),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Repeat your password')
      .trim(),
    role: Yup.string().optional()
  });

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <FormSection>
          <h2>Create Account</h2>
          <Formik initialValues={initValues} validationSchema={validSchema} onSubmit={handleSubmit}>
            {({ errors, submitCount }) => (
              <StyledForm>
                <Label htmlFor="name">Name</Label>
                <StyledField name="name" id="name" placeholder="Full name" $error={submitCount > 0 && !!errors.name} />
                {submitCount > 0 && errors.name && <Error>{errors.name}</Error>}

                <Label htmlFor="email">Email</Label>
                <StyledField name="email" id="email" type="email" $error={submitCount > 0 && !!errors.email} />
                {submitCount > 0 && errors.email && <Error>{errors.email}</Error>}

                <Label htmlFor="password">Password</Label>
                <StyledField name="password" id="password" type="password" $error={submitCount > 0 && !!errors.password} />
                {submitCount > 0 && errors.password ? (
                  <Error>{errors.password}</Error>
                ) : (
                  <Hint>Passwords must be at least 8 characters</Hint>
                )}

                <Label htmlFor="passwordRepeat">Repeat Password</Label>
                <StyledField name="passwordRepeat" id="passwordRepeat" type="password" $error={submitCount > 0 && !!errors.passwordRepeat} />
                {submitCount > 0 && errors.passwordRepeat && <Error>{errors.passwordRepeat}</Error>}

                <SubmitButton type="submit">Create your account</SubmitButton>
              </StyledForm>
            )}
          </Formik>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </FormSection>
      </ContentWrapper>
      <Footer />
      {modalMessage && (
        <ModalBackdrop>
          <ModalBox>
            <p>{modalMessage}</p>
            <button onClick={() => setModalMessage('')}>OK</button>
          </ModalBox>
        </ModalBackdrop>
      )}
    </PageWrapper>
  );
};

export default Register;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.main`
  flex: 1;
`;

const FormSection = styled.section`
  max-width: 500px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledField = styled(Field)<{ $error?: boolean }>`
  padding: 0.6rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid ${({ $error }) => ($error ? 'red' : '#ccc')};
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

const Hint = styled.p`
  color: #777;
  font-size: 12px;
  margin: 0;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 300px;
  text-align: center;
  color: black;

  p {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: black
  }

  button {
    background-color: red;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;
