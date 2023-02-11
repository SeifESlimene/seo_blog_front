import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Link from 'next/link';

const UserIndex = () => {
  const { username } = process.browser && JSON.parse(localStorage.getItem('user'))
  return (
    <Layout>
      <Private>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12 pt-5 pb-5'>
              <h2>{`${username}'s Dashboard`}</h2>
            </div>
            <div className='col-md-4'>
              <ul className='list-group'>
                <li className='list-group-item'>
                  <a href='/user/crud/blog'>Add Post</a>
                </li>
                <li className='list-group-item'>
                  <Link href='/user/crud/blogs'>
                    <a>Edit / Delete Post</a>
                  </Link>
                </li>
                <li className='list-group-item'>
                  <a href='/user/update'>Edit Personal Informations</a>
                </li>
              </ul>
            </div>
            <div className='col-md-8'></div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserIndex;
