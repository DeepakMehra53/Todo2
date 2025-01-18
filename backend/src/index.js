const express = require ('express');
const client = require('./db');
const app = express()
const PORT =process.env.PORT || 3000 ;

app.use(express.json())

app.get('/api/v1/todos',async(req,res)=>{
    try {
        const result = await client.query(`SELECT * FROM todos`)
    } catch (error) {
        
    }
})

app.listen(PORT, console.log(`SERVER IS RUNNING ON http://localhost/${PORT}`));