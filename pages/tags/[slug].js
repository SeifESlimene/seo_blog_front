import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { singleTag } from '../../actions/tag';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
// moment.locale('ar-tn');
import Card from '../../components/blog/Card';

const Tag = ({ tag, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {tag.name} | {APP_NAME}
      </title>
      <meta name='description' content={`Posts About ${tag.name}`} />
      <link rel='cononical' href={`${DOMAIN}/tags/${query.slug}`} />
      <meta property='og:title' content={`${tag.name} | ${APP_NAME}`} />
      <meta property='og:description' content={`Posts About  ${tag.name}`} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={`${DOMAIN}/tags/${query.slug}`} />
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
      {head()}
      <Layout>
        <main>
          <div className='container-fluid text-center'>
            <header>
              <div className='col-md-12 pt-3'>
                <h1 className='display-4 font-weight-bold'>{tag.name}</h1>
                {blogs.map((b, i) => (
                  <div key={b}>
                    <Card key={i} blog={b} />
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

Tag.getInitialProps = ({ query }) => {
  return singleTag(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { tag: data.tag, blogs: data.blogs, query };
    }
  });
};

export default Tag;
