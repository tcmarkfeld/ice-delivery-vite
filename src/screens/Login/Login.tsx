import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as AuthService from '../../services/auth.service';

import logo from '../../assets/icon.png';

function Login() {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const initialValues: {
    email: string;
    password: string;
  } = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
  });

  const handleLogin = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;

    setMessage('');
    setLoading(true);

    AuthService.login(email, password).then(
      () => {
        navigate('/');
        window.location.reload();
      },
      (error: any) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      },
    );
  };

  return (
    <div className='col-md-12'>
      <div className='card-container bg-lightgrey flex justify-center items-center flex-col text-black h-screen'>
        <p className='text-primary font-bold mb-2 tracking-wide uppercase'>Corolla Ice Delivery</p>
        <img src={logo} alt='profile-img' className='h-auto w-48 mb-5' />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className='form-group'>
              <label htmlFor='email' className='text-black'>
                Email
              </label>
              <br></br>
              <Field
                name='email'
                type='text'
                className='form-control text-black my-2 rounded-lg p-2'
              />
              <ErrorMessage name='email' component='div' className='alert text-error' />
            </div>

            <div className='form-group'>
              <label htmlFor='password' className='text-black'>
                Password
              </label>
              <br></br>
              <Field
                name='password'
                type='password'
                className='form-control text-black my-2 rounded-lg p-2'
              />
              <ErrorMessage name='password' component='div' className='alert text-error' />
            </div>

            <div className='form-group flex justify-center'>
              <button
                type='submit'
                className='flex bg-primary rounded-lg p-2 items-center justify-center text-white'
                disabled={loading}
              >
                {loading && <span className='spinner-border spinner-border-sm'></span>}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className='form-group'>
                <div className='alert text-error' role='alert'>
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
