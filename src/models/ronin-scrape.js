const { MongoClient } = require('mongodb');

// Connection URL
const url = process.env.CONNECTION_STRING;
const client = new MongoClient(url)

// Database Name
const dbName = 'axies'

const addToDatabase = async (data) => {
  // Use connect method to connect to the server
  await client.connect()
  console.log('Connected successfully to server')
  const db = client.db(dbName)
  const collection = db.collection('ronin-scrape')

  collection.insertOne(data);

  client.close();

}

module.exports = { addToDatabase }