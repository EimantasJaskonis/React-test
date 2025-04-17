import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { v4 as generateID } from 'uuid';
import bcrypt from "bcryptjs";
import { useContext } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import { User } from "../../types";
import UsersContext from "../contexts/UsersContext";


type InitValues = Omit<User, 'id' | 'passwordText'> & { passwordRepeat : string };

const Register = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("Register must be used within a UsersProvider");
  };
  const { dispatch } = context;

    const initValues: InitValues = {
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
        role: ''
      };

      const handleSubmit = (values: InitValues, { resetForm }: { resetForm: () => void }) => {
        // console.log(values);
        const newUser: User = {
        id: generateID(),
        name: values.name,
        email: values.email,
        password: bcrypt.hashSync(values.password, 10),
        passwordText: values.password,
        role: values.role
        // console.log(newUser);
      };

      fetch("http://localhost:8080/users", {
        method: "POST",
        body: JSON.stringify(newUser)
      });
  
      dispatch({ type: 'addNew', newUser });
  
      resetForm();
      };   

      const validSchema = Yup.object({
        name: Yup.string()
          .min(5, 'Name too short')
          .max(20, 'Name too long')
          .trim()
          .required('Enter your name'),
        email: Yup.string()
          .email('Please enter the correct email format')
          .required('Enter your email'),
        password: Yup.string()
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
            'The password must contain at least 1 uppercase letter, at least 1 lowercase letter, a special character (@$!%*?&), at least 1 number, and be at least 8 characters long and at least 20 characters long'
          )
          .trim()
          .required('Enter your password'),
        passwordRepeat: Yup.string()
          .oneOf([Yup.ref('password')], 'The passwords must match')
          .trim()
          .required('Re-enter your password'),
        role: Yup.string()
        .optional()
      });

      return (
        <section>
          <h2>Create account</h2>
          <Formik
            initialValues={initValues}
            onSubmit={handleSubmit}
            validationSchema={validSchema}
          >
            {({ errors, submitCount }) => (
              <Form>
                <div>
                  <label htmlFor="name">Your name</label>
                  <Field
                    name="name"
                    id="name"
                    placeholder="First and last name"
                    type="text"
                    autoComplete="name"
                    $error={submitCount > 0 && !!errors.name}
                  />
                  {submitCount > 0 && errors.name && (
                    <span className="error">{errors.name}</span>
                  )}
                </div>
      
                <div>
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    id="email"
                    type="email"
                    autoComplete="email"
                    $error={submitCount > 0 && !!errors.email}
                  />
                  {submitCount > 0 && errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
      
                <div>
                 <label htmlFor="password">Password</label>
                 <Field
                  name="password"
                  id="password"
                  placeholder="at least 8 characters"
                  type="password"
                  $error={submitCount > 0 && !!errors.password}
                  />
                  {submitCount > 0 && errors.password ? (
                  <span className="error">{errors.password}</span>
                  ) : (
                  <span className="hint">Passwords must be at least 8 characters</span>
                )}
                </div>
      
                <div>
                  <label htmlFor="passwordRepeat">Re-enter password</label>
                  <Field
                    name="passwordRepeat"
                    id="passwordRepeat"
                    type="password"
                    autoComplete="password"
                    $error={submitCount > 0 && !!errors.passwordRepeat}
                  />
                  {submitCount > 0 && errors.passwordRepeat && (
                    <span className="error">{errors.passwordRepeat}</span>
                  )}
                </div>
      
                <input type="submit" value="Create your account" />
              </Form>
            )}
          </Formik>
      
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </section>
      );
    };
   
  export default Register;