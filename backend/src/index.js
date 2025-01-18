const express = require ('express');
const{}
const pool = require('./db');
const { createTodo } = require('./types');
const app= express()
const PORT = process.env.PORT ||3000;
app.use(express.json())

app.get('api/v1/todos',async(req,res)=>{
    try {
        const result = await pool.query(`SELECT * FROM todos`)
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching todos:",err)
        res.status(500).send("Server errro")
    }
})

app.post("/api/v1/create",(req,res)=>{
    const {title,description}=req.body
    const createPayload= req.body;
    const parsedPayload = createTodo.safeParse(createPayload)
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"You sent the wrong inputs"
        })
    }
    else{

    }

})






app.listen(PORT,console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`))
