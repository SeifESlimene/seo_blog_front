import { useState, useEffect } from 'react';
import { isAuth, preSignup } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };
    preSignup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          loading: false,
          message: data.message,
          showForm: false,
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

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            value={name}
            onChange={handleChange('name')}
            type='text'
            className='form-control'
            placeholder='Fullname'
          ></input>
        </div>
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
          <button className='btn btn-primary'>Register</button>
        </div>
      </form>
    );
  };
  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
      <br />
      <Link href='/auth/password/forgot'>
        <a className='btn btn-outline-danger btn-sm'>Forget Password</a>
      </Link>
    </React.Fragment>
  );
};

export default SignupComponent;
