const {Client}= require('pg')
const client = new Client({
    connectionString:"postgresql://postgres:deepak@localhost:5432/postgres"
})

const createSchema=async()=>{
    try {
        await client.connect();
        await pool.query(
            `CREATE TABLE todos(
                id SERIAL PRIMARY KEY,
                title VARCHAR (255) NOT NULL,
                description TEXT
            
            );`
        );
        console.log("Todos schema created successfully ");

    } catch (error) {
        console.error("Error while create schema", error.message)
    }
    finally{
        await client.end()
    }
   
};
createSchema();
module.exports=client;