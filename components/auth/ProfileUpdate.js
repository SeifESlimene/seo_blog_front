import { useState, useEffect } from 'react';
import { getCookie, updateUser } from '../../actions/auth';
import { getProfile, update, getPhoto } from '../../actions/user';

// import { API } from '../config';
// src={`${API}/user/photo/${username}` || '/images/defaultUser.png'}

const ProfileUpdate = () => {
  // const [photoUrl, setPhotoUrl] = useState(null);
  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    error: '',
    success: '',
    loading: false,
    photo: '',
    userData: '',
    about: '',
  });
  const token = getCookie('token');
  const {
    username,
    name,
    email,
    password,
    error,
    success,
    loading,
    userData,
    about,
  } = values;
  const init = () => {
    getProfile(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
        });
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  // useEffect(() => {
  //   if (username) {
  //     getPhoto(username).then((data) => {
  //       if (data) {
  //         // const photo = data.toString('base64')
  //         const photo = btoa(String.fromCharCode.apply(null, data)
  //         console.log("data:image/png;base64" + photo)
  //         // setPhotoUrl("data:image/png;base64" + photo)
  //       }
  //     });
  //   }
  // }, [username]);

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    let userFormData = new FormData();
    userFormData.set(name, value);
    setValues({
      ...values,
      [name]: value,
      userData: userFormData,
      error: false,
      success: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    update(token, userData).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            username: data.username,
            name: data.name,
            email: data.email,
            about: data.about,
            success: true,
            loading: false,
          });
        });
      }
    });
  };

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='btn btn-outline-info'>
          Personal Photo
          <input
            type='file'
            onChange={handleChange('photo')}
            accept='image/*'
            hidden
          />
        </label>
      </div>
      <div className='form-group'>
        <label className='text-muted'>User Name</label>
        <input
          type='text'
          onChange={handleChange('username')}
          className='form-control'
          value={username}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Full Name</label>
        <input
          type='text'
          onChange={handleChange('name')}
          className='form-control'
          value={name}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          onChange={handleChange('email')}
          className='form-control'
          value={email}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          onChange={handleChange('password')}
          className='form-control'
          value={password}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Informations About The User</label>
        <textarea
          onChange={handleChange('about')}
          className='form-control'
          value={about}
        />
      </div>
      <div>
        <button type='submit' className='btn btn-primary'>
          Save
        </button>
      </div>
    </form>
  );

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ display: success ? '' : 'none' }}
    >
      Informations Updated Successfully!
    </div>
  );
  const showLoading = () => (
    <div
      className='alert alert-info'
      style={{ display: loading ? '' : 'none' }}
    >
      Loading...
    </div>
  );

  return (
    <React.Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'>
            <img
              alt={`Profile ${username}`}
              src={'/images/defaultUser.png'}
              // src={photoUrl ? photoUrl : '/images/defaultUser.png'}
              style={{ maxHeight: '40%', width: '100%', objectFit: 'cover' }}
              className='img img-fluid img-thumbnail mb-3'
            />
          </div>
          <div className='col-md-9 mb-5'>
            {showSuccess()}
            {showError()}
            {showLoading()}
            {profileUpdateForm()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileUpdate;
