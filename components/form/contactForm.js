import { useState } from 'react';
import Link from 'next/link';
import { emailContactForm } from '../../actions/form';

const ContactForm = ({ authorEmail }) => {
  const [values, setValues] = useState({
    message: '',
    name: '',
    email: '',
    sent: false,
    buttonText: 'Send',
    success: false,
    error: false,
  });

  const { message, name, email, buttonText, success, error } = values;

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: 'Loading...' });
    emailContactForm({ authorEmail, name, email, message }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          sent: true,
          name: '',
          email: '',
          message: '',
          buttonText: 'Message Sent',
          success: data.success,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      buttonText: 'Send',
    });
  };

  const showSuccessMessage = () =>
    success && <div className='alert alert-info'>Thank You!</div>;

  const showErrorMessage = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const contactForm = () => {
    return (
      <form
        onSubmit={clickSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div
          className='form-group'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <label className='lead'>Message:</label>
          <textarea
            className='form-control'
            value={message}
            rows='10'
            onChange={handleChange('message')}
            required
          ></textarea>
        </div>
        <div
          className='form-group'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <label className='lead'>Fullname:</label>
          <input
            type='text'
            className='form-control'
            values={name}
            onChange={handleChange('name')}
          />
        </div>
        <div
          className='form-group'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <label className='lead'>Email:</label>
          <input
            type='email'
            className='form-control'
            values={email}
            onChange={handleChange('email')}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button className='btn btn-primary'>{buttonText}</button>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showSuccessMessage()}
      {showErrorMessage()}
      {contactForm()}
    </React.Fragment>
  );
};

export default ContactForm;
