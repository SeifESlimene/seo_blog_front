import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () => {
  return (
    <Layout>
      <article>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <h1 className='display-4 font-weight-bold'>
                Tutorials, Courses, Podcasts For Web Nerds
              </h1>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center pt-4 pb-5'>
              <p className='lead'>
                Best Articles About Popular Frameworks And Libraries
              </p>
            </div>
          </div>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-4 text-center'>
              <div className='flip flip-horizantal'>
                <div
                  className='front'
                  style={{
                    backgroundImage:
                      'url(' +
                      'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
                      ')',
                  }}
                >
                  <h2 className='text-shadow text-center h1'>React.js</h2>
                </div>
                <div className='back text-center'>
                  <Link href='/categories/[slug]' as='/categories/react'>
                    <a>
                      <h3 className='h1'>React</h3>
                    </a>
                  </Link>
                  <p className='lead'>Javascript Library</p>
                </div>
              </div>
            </div>
            <div className='col-md-4 text-center'>
              <div className='flip flip-horizantal'>
                <div
                  className='front'
                  style={{
                    backgroundImage:
                      'url(' +
                      'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
                      ')',
                  }}
                >
                  <h2 className='text-shadow text-center h1'>Node.js</h2>
                </div>
                <div className='back text-center'>
                  <Link href='/categories/[slug]' as='/categories/node'>
                    <a>
                      <h3 className='h1'>Node.js</h3>
                    </a>
                  </Link>
                  <p className='lead'> Javascript Runtime</p>
                </div>
              </div>
            </div>
            <div className='col-md-4 text-center'>
              <div className='flip flip-horizantal'>
                <div
                  className='front'
                  style={{
                    backgroundImage:
                      'url(' +
                      'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
                      ')',
                  }}
                >
                  <h2 className='text-shadow text-center h1'>Next.js</h2>
                </div>
                <div className='back text-center'>
                  <Link href='/categories/[slug]' as='/categories/nextjs'>
                    <a>
                      <h3 className='h1'>React Framework For Production</h3>
                    </a>
                  </Link>
                  <p className='lead'> Popular Framework For Production</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Index;
