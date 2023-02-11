import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';
// moment.locale('ar-tn');

const SmallCard = ({ blog }) => {
  return (
    <div className='card'>
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              alt={blog.title}
              src={`${API}/blog/photo/${blog.slug}`}
              style={{ height: '250px', width: '100%' }}
              className='img img-fluid'
            />
          </a>
        </Link>
      </section>
      <div className='card-body'>
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h5 className='card-title'>{blog.title}</h5>
            </a>
          </Link>
          <p className='card-text'>{renderHTML(blog.excerpt)}</p>
        </section>
      </div>
      <div className='card-body'>
        Posted By {moment(blog.updatedAt).fromNow()}{' '}
        <Link href={`/profile/${blog.postedBy.username}`}>
          <a className='float-left'>{blog.postedBy.username}</a>
        </Link>
      </div>
    </div>
  );
};

export default SmallCard;
