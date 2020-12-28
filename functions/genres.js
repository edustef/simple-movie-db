const api = require('./api');

const handler = async function () {
  try {
    const res = await api.get('/genre/tv/list');

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
