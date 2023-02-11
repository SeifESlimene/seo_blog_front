import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { singleBlog, updateBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import { API } from '../../config';

const BlogUpdate = ({ router }) => {
  const [body, setBody] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checked, setChecked] = useState([]); // categories
  const [checkedTag, setCheckedTag] = useState([]); // tags
  const [values, setValues] = useState({
    error: '',
    success: '',
    formData: '',
    title: '',
    body: '',
  });

  const { error, success, formData, title } = values;
  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };

  const setCategoriesArray = (blogCategories) => {
    let ca = [];
    blogCategories.map((c, i) => {
      ca.push(c._id);
    });
    setChecked(ca);
  };

  const setTagsArray = (blogTags) => {
    let ta = [];
    blogTags.map((t, i) => {
      ta.push(t._id);
    });
    setCheckedTag(ta);
  };

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
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
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

  const findOutCategory = (c) => {
    const result = checked.indexOf(c);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const findOutTag = (t) => {
    const result = checkedTag.indexOf(t);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
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
            checked={findOutCategory(c._id)}
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
            checked={findOutTag(t._id)}
          />
          <label className='form-check-label s-cl'>{t.name}</label>
        </li>
      ))
    );
  };

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set('body', e);
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

  const editBlog = (e) => {
    e.preventDefault();
    updateBlog(formData, token, router.query.slug).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          success: `Blog with title "${data.title}" is Updated Successfully`,
        });
        if (isAuth() && isAuth().role === 1) {
          // Router.replace(`/admin/crud/${router.query.slug}`);
          Router.replace(`/admin`);
        } else {
          if (isAuth() && isAuth().role === 0) {
            // Router.replace(`/user/crud/${router.query.slug}`);
            Router.replace(`/user`);
          }
        }
      }
    });
  };

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className='form-group'>
          <label>Title</label>
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
            placeholder='Type something here...'
            onChange={handleBody}
          />
        </div>

        <div>
          <button type='submit' className='btn btn-primary'>
            Update Blog
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className='container-fluid pb-5'>
      <div className='row'>
        <div className='col-md-8'>
          {updateBlogForm()}

          <div className='pt-3'>
            {showSuccess()}
            {showError()}
          </div>

          {body && (
            <img
              src={`${API}/blog/photo/${router.query.slug}`}
              alt={title}
              style={{ width: '100%' }}
            />
          )}
        </div>
        <div className='col-md-4'>
          <div>
            <div className='form-group pb-2'>
              <h5>صورة الموضوع</h5>
              <hr />
              <div className='pb-1'>
                <small className='text-muted'>الحجم الأقصى : 1 ميغا</small>
              </div>
              <label className='btn btn-outline-info'>
                رفع صورة الموضوع
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
            <h5>تصنيفات</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>وسوم</h5>
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

export default withRouter(BlogUpdate);
