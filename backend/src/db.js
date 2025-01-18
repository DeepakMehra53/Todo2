// db.js
const { Pool } = require('pg'); // Import the Pool class from the 'pg' package

// Create a pool of connections to the PostgreSQL database
const pool = new Pool({
  connectionString:"postgresql://postgres:deepak@localhost:5432/postgres"                // Default PostgreSQL port
});

// Create the 'todos' schema (table)
const createSchema = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log("Todos schema created successfully or already exists.");
    } catch (err) {
        console.error("Error creating schema:", err);
    } finally {
        client.release();
    }
};

// Connect to the database and create the schema
createSchema();

module.exports = pool; // Export the pool for use in other files
