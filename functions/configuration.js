const api = require('./_api');

const handler = async function () {
  try {
    const res = await api.get('/configuration');
    return {
      statusCode: 200,
      body: JSON.stringify(res.data.images),
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
