const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI || 'mongodb://db');

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async event => {
  let data = [];
  try {
    switch (event.httpMethod) {
      case 'GET':
        data = await getComments(event.queryStringParameters.tvId);
        break;
      case 'POST':
        insertComment(JSON.parse(event.body));
        break;
      default:
        break;
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

async function insertComment(comment) {
  await connect(collection => {
    collection.insertOne(comment);
  });
}

async function getComments(tvId) {
  let data = [];
  await connect(async collection => {
    collection.find({ tvId: tvId }).forEach(comment => data.push(comment));
  });

  return data;
}

async function connect(cb) {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    let collection = await client.db('moviedb').collection('comments');
    cb(collection);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = { handler };
