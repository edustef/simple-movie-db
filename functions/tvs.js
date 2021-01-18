const api = require('./_api');

const handler = async function (event) {
  let genreId = event.queryStringParameters.genreId;
  let page = event.queryStringParameters.page;
  try {
    const res = await api.get('/discover/tv', {
      params: {
        with_genres: genreId,
        page: page,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
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
