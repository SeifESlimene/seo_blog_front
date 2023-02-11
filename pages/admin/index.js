import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import Link from 'next/link';

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12 pt-5 pb-5'>
              <h2>Admin Dashboard</h2>
            </div>
            <div className='col-md-4'>
              <ul className='list-group'>
                <li className='list-group-item'>
                  <Link href='/admin/crud/category-tag'>
                    <a>Add Category</a>
                  </Link>
                </li>
                <li className='list-group-item'>
                  <Link href='/admin/crud/category-tag'>
                    <a>Add Tag</a>
                  </Link>
                </li>
                <li className='list-group-item'>
                  <a href='/admin/crud/blog'>Add Post</a>
                </li>
                <li className='list-group-item'>
                  <Link href='/admin/crud/blogs'>
                    <a>Edit / Delete Post</a>
                  </Link>
                </li>
                <li className='list-group-item'>
                  <Link href='/user/update'>
                    <a>Edit Personal Informations</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='col-md-8'></div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
