import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };
    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`);
          } else {
            Router.push(`/user`);
          }
        });
      }
    });
  };
  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading ? (
      <div className='alert alert-info' style={{ textAlign: 'center' }}>
        Loading...
      </div>
    ) : (
      ''
    );
  const showError = () =>
    error ? (
      <div className='alert alert-danger' style={{ textAlign: 'center' }}>
        {error}
      </div>
    ) : (
      ''
    );
  const showMessage = () =>
    message ? (
      <div className='alert alert-info' style={{ textAlign: 'center' }}>
        {message}
      </div>
    ) : (
      ''
    );

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            value={email}
            onChange={handleChange('email')}
            type='email'
            className='form-control'
            placeholder='Email'
          ></input>
        </div>
        <div className='form-group'>
          <input
            value={password}
            onChange={handleChange('password')}
            type='password'
            className='form-control'
            placeholder='Password'
          ></input>
        </div>
        <div className='text-center'>
          <button className='btn btn-primary'>Login</button>
        </div>
      </form>
    );
  };
  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {/* <LoginGoogle /> */}
      {showForm && signinForm()}
      <br />
      <Link href='/auth/password/forgot'>
        <a className='btn btn-outline-danger btn-sm'>Forget Password</a>
      </Link>
    </React.Fragment>
  );
};

export default SigninComponent;
