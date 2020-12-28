const api = require('./api');

const handler = async function () {
  try {
    const res = await api.get('/configuration');
    const baseUrl = res.data.images.base_url;
    const posterSizes = res.data.images.poster_sizes;
    const bgSizes = res.data.images.backdrop_sizes;
    console.log(baseUrl, posterSizes, bgSizes);
    return {
      statusCode: 200,
      body: JSON.stringify({
        baseUrl: baseUrl,
        posterSizes: posterSizes,
        bgSizes: bgSizes,
      }),
    };
  } catch (error) {
    // output to netlify function log
    console.log(error);
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
