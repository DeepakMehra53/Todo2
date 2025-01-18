const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgresql://postgres:deepak@localhost:5432/postgres",
});

const createSchema = async () => {
    const client = await pool.connect(); // Properly await the connection
    try {
        await client.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT
      );
    `);
        console.log("TODO table created successfully!");
    } catch (error) {
        console.error("Error while creating table:", error);
    } finally {
        client.release(); // Release the client properly
    }
};

createSchema();

module.exports = pool;
