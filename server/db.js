const { Client } = require('pg');

// Create a new PostgreSQL client
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432, // Default PostgreSQL port
});

// Function to connect to the PostgreSQL server
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to the PostgreSQL database!');

    // Query to select data from a table
    // const result = await client.query('SELECT * FROM todos');
    // console.log('Result:', result.rows);
    // You can execute queries or perform other operations here
  } catch (error) {
    console.error('Error connecting to the PostgreSQL database:', error);
  // } finally {
  //   await client.end();
  //   console.log('Disconnected from the PostgreSQL database.');
  }
};

// Call the connectToDatabase function
connectToDatabase();

module.exports = client;
