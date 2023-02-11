import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog } from '../../actions/blog';
// import renderHTML from 'react-render-html';
import moment from 'moment';
// moment.locale('ar-tn');

const BlogRead = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const token = getCookie('token');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list(username).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const deleteBlog = (slug) => {
    removeBlog(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm('Are You Sure?');
    if (answer) {
      deleteBlog(slug);
    }
  };

  const showUpdateButton = (blog) => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href='/user/crud/[slug]' as={`/user/crud/${blog.slug}`}>
          <a className='mr-2 btn btn-sm btn-warning'>Edit</a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href='/admin/crud/[slug]' as={`/admin/crud/${blog.slug}`}>
          <a className='mr-2 btn btn-sm btn-warning'>Edit</a>
        </Link>
      );
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div key={i} className='pb-5'>
          <h3>{blog.title}</h3>
          <p className='mark'>
            Posted By {blog.postedBy.name} | {moment(blog.updatedAt).fromNow()}
          </p>
          <button
            className='btn-sm btn-danger'
            onClick={() => deleteConfirm(blog.slug)}
          >
            Delete
          </button>
          {showUpdateButton(blog)}
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <div className='row'>
        <div className='col-md-12'>
          {message && <div className='alert alert-warning'>{message}</div>}
          {showAllBlogs()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default BlogRead;
