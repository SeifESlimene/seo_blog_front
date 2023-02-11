const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  publicRuntimeConfig: {
    APP_NAME: process.env.APP_NAME,
    API_DEVELOPEMENT: process.env.API_DEVELOPEMENT,
    API_PRODUCTION: process.env.API_PRODUCTION,
    DOMAIN_DEVELOPEMENT: process.env.DOMAIN_DEVELOPEMENT,
    DOMAIN_PRODUCTION: process.env.DOMAIN_PRODUCTION,
    FB_APP_ID: process.env.FB_APP_ID,
    DISQUS_SHORTNAME: process.env.DISQUS_SHORTNAME,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
});
