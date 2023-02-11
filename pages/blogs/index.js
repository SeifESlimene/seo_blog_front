import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import Card from '../../components/blog/Card';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogsSkip,
  router,
}) => {
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);
  const head = () => (
    <Head>
      <title>Tech For All | {APP_NAME}</title>
      <meta name='description' content='Blog That Teaches Your Right!' />
      <link rel='cononical' href={`${DOMAIN}${router.pathname}`} />
      <meta
        property='og:title'
        content={`Latest Technology News | ${APP_NAME}`}
      />
      <meta property='og:description' content='Blog That Teaches Your Right' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={`${DOMAIN}${router.pathname}`} />
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

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className='btn btn-outline-primary btn-lg'>
          Show More
        </button>
      )
    );
  };

  const showAllBlogs = () => {
    return (
      blogs &&
      blogs.map((blog, i) => {
        return (
          <article key={i}>
            <Card blog={blog} />
            <hr />
          </article>
        );
      })
    );
  };

  const showAllCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <Link key={i} href={'/categories/[slug]'} as={`/categories/${c.slug}`}>
          <a className='btn btn-primary mr-1 ml-1 mt-3'>{c.name}</a>
        </Link>
      ))
    );
  };

  const showAllTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <Link key={i} href={'/categories/[slug]'} as={`/categories/${t.slug}`}>
          <a className='btn btn-outline-primary mr-1 ml-1 mt-3'>{t.name}</a>
        </Link>
      ))
    );
  };

  const showLoadedBlogs = () => {
    return (
      loadedBlogs &&
      loadedBlogs.map((blog, i) => {
        return (
          <article key={i}>
            <Card blog={blog} />
          </article>
        );
      })
    );
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className='container-fluid'>
            <header>
              <div className='col-md-12 pt-3'>
                <h1 className='display-4 font-weight-bold text-center'>
                  All Posts Here
                </h1>
              </div>
            </header>
            <section>
              <div className='pb-5 text-center'>
                {showAllCategories()}
                <br />
                {showAllTags()}
              </div>
            </section>
          </div>
          <div className='container-fluid'>{showAllBlogs()}</div>
          <div className='container-fluid'>{showLoadedBlogs()}</div>
          <div className='text-center pt-5 pb-5'>{loadMoreButton()}</div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data && data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data && data.blogs,
        categories: data && data.categories,
        tags: data && data.tags,
        blogsLimit: limit,
        blogsSkip: skip,
        totalBlogs: data && data.size,
      };
    }
  });
};

export default withRouter(Blogs); // getInitialProps
