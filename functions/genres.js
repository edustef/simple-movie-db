const api = require('./api');

const handler = async function () {
  try {
    const ids = [10759, 35, 80, 9648, 10765];

    const res = await api.get('/genre/tv/list');

    const data = res.data.genres.filter(genre => ids.includes(genre.id));

    return {
      statusCode: 200,
      body: JSON.stringify(data),
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
