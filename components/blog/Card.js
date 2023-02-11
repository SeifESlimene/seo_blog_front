import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';
// moment.locale('ar-tn');

const Card = ({ blog }) => {
  const showBlogCategories = (blog) =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className='btn btn-primary mr-1 ml-1 mt-1 mb-1'>{c.name}</a>
      </Link>
    ));

  const showBlogTags = (blog) =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className='btn btn-outline-primary mr-1 ml-1 mt-1 mb-1'>{t.name}</a>
      </Link>
    ));

  return (
    <div className='lead'>
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className='pt-3 pb-3 font-weight-bold'>{blog.title}</h2>
          </a>
        </Link>
      </header>
      <section>
        <p className='mark ml-1 pt-2 pb-2 s-pb'>
          Written By
          {` `}
          <Link href={`/profile/${blog.postedBy.username}`}>
            <a>{blog.postedBy.username}</a>
          </Link>
          {` `}|{` `}
          {` ${moment(blog.updatedAt).fromNow()}`}
        </p>
      </section>
      <section>
        {showBlogCategories(blog)}
        {showBlogTags(blog)}
        <br />
      </section>
      <div className='row pt-2'>
        <div className='col-md-4'>
          <section>
            <img
              alt={blog.title}
              src={`${API}/blog/photo/${blog.slug}`}
              className='img img-fluid'
              style={{ maxHeight: '250px', width: '100%', objectFit: 'cover' }}
            />
          </section>
        </div>
        <div className='col-md-8'>
          <section>
            <div className='pb-3'>{renderHTML(blog.excerpt)}</div>
            <Link href='/blogs/[slug]' as={`/blogs/${blog.slug}`}>
              <a className='btn btn-primary pt-2'>Read More </a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
