import Link from 'next/link';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';

const CreateBlog = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else {
      return false;
    }
  };
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checked, setChecked] = useState([]); // categories
  const [checkedTag, setCheckedTag] = useState([]); // tags
  const [body, setBody] = useState(blogFromLS());
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false,
  });

  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };
  const initTags = () => {
    getTags().then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const { error, sizeError, success, formData, title, hidePublishButton } =
    values;

  const publishBlog = (e) => {
    e.preventDefault();
    createBlog(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          error: '',
          success: `A Post By The Title "${data.title}" Was created`,
        });
        setBody('');
        setCategories([]);
        setTags([]);
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set('body', e);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
    }
  };

  const handleToggle = (c) => () => {
    setValues({ ...values, error: '' });
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    setChecked(all);
    formData.set('categories', all);
  };

  const handleTagsToggle = (t) => () => {
    setValues({ ...values, error: '' });
    // return the first index or -1
    const clickedTag = checkedTag.indexOf(t);
    const all = [...checkedTag];
    if (clickedTag === -1) {
      all.push(t);
    } else {
      all.splice(clickedTag, 1);
    }
    setCheckedTag(all);
    formData.set('tags', all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className='list-unstyled'>
          <input
            onChange={handleToggle(c._id)}
            type='checkbox'
            className='mr-2'
          />
          <label className='form-check-label s-cl'>{c.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className='list-unstyled'>
          <input
            onChange={handleTagsToggle(t._id)}
            type='checkbox'
            className='mr-2'
          />
          <label className='form-check-label s-cl'>{t.name}</label>
        </li>
      ))
    );
  };

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
      {success}
    </div>
  );

  const CreateBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className='form-group'>
          <label>Title Of The Post</label>
          <input
            type='text'
            className='form-control'
            onChange={handleChange('title')}
            value={title}
          />
        </div>
        <div className='form-group'>
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder='Write Something Here...'
            onChange={handleBody}
          />
        </div>

        <div>
          <button type='submit' className='btn btn-primary'>
            Post
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className='container-fluid pb-5'>
      <div className='row'>
        <div className='col-md-8'>
          {CreateBlogForm()}{' '}
          <div className='pt-3'>
            {showError()}
            {showSuccess()}
          </div>
        </div>
        <div className='col-md-4'>
          <div>
            <div className='form-group pb-2'>
              <h5>Post Photo </h5>
              <hr />
              <div className='pb-1'>
                <small className='text-muted'>Maximum Size: 1Mb</small>
              </div>
              <label className='btn btn-outline-info'>
                Upload Post Photo
                <input
                  type='file'
                  onChange={handleChange('photo')}
                  accept='image/*'
                  hidden
                />
              </label>
            </div>
          </div>
          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateBlog);
