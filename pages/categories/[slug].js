import Head from 'next/head';
import Layout from '../../components/Layout';
import { singleCategory } from '../../actions/category';
import { DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import Card from '../../components/blog/Card';

const Category = ({ category, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {category && category.name} | {APP_NAME}
      </title>
      <meta name='description' content={`Subjects About ${category.name}`} />
      <link rel='cononical' href={`${DOMAIN}/categories/${query.slug}`} />
      <meta property='og:title' content={`${category.name} | ${APP_NAME}`} />
      <meta
        property='og:description'
        content={`Subjects About ${category.name}`}
      />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={`${DOMAIN}/categories/${query.slug}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />
      <meta
        property='og:image'
        content={`${DOMAIN}/images/Arabic Channel Logo 2 Reverse.png`}
      />
      <meta
        property='og:image:secure_url'
        content={`${DOMAIN}/images/Arabic Channel Logo 2 Reverse.png`}
      />
      <meta property='og:image:type' content='image/png' />
      <meta property='fb:app_id' content={`${FB_APP_ID}`} />
    </Head>
  );
  return (
    <React.Fragment>
      {category && blogs && query && head()}
      <Layout>
        <main>
          <div className='container-fluid text-center'>
            <header>
              <div className='col-md-12 pt-3'>
                {category && (
                  <h1 className='display-4 font-weight-bold'>
                    {category.name}
                  </h1>
                )}
                {blogs &&
                  blogs.map((b, i) => (
                    <div key={i}>
                      <Card blog={b} />
                      <hr />
                    </div>
                  ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then((data) => {
    if (data && data.error) {
      console.log(data.error);
    } else {
      return {
        category: data ? data.category : null,
        blogs: data ? data.blogs : null,
        query,
      };
    }
  });
};

export default Category;
