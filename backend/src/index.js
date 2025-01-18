const express = require ('express');

const pool = require('./db');
const { createTodo } = require('./types');
const app= express()
const PORT = process.env.PORT ||3000;
app.use(express.json())

app.get('/api/v1/todos',async(req,res)=>{
    try {
        const result = await pool.query(`SELECT * FROM todos`)
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching todos:",err)
        res.status(500).send("Server errro")
    }
})

app.post("/api/v1/create",async(req,res)=>{
    const {title,description}=req.body
    const createPayload= req.body;
    const parsedPayload = createTodo.safeParse(createPayload)
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"You sent the wrong inputs"
        })
    }
   else{
        try {
            const result =await pool.query(
                `INSERT INTO todos(title,description) VALUES($1,$2) RETURNING *`,
                [title,description]
            )
            res.status(201).json(result.rows[0]);
            res.json({msg:'Todo created'})
        } catch (err) {
            console.error("Error inserting todo:", err);
            res.status(500).send("Server error");

        }
    }

})

app.put("/api/v1/update/:id",(req,res)=>{

    const{id}=req.params
    const{title,description}=req.body

    const updateparse = req.body
    const parsedPayload = updateparse.safeParse(updateparse)
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
    }
    try {
        const result= pool.query(
            `UPDATE todos 
            SET title = $1,
            description= $2
            RETUNRING *`,
            [title,description,id]
        );
        if(result.rows.length>0){
            res.json(result.rows[0])
        }else{
            res.status(404).send("Todo not found")
        }
    } catch (err) {
        console.error("Error updating todo:",err)
        res.status(500).send("Server error")
    }
    
})

app.delete('/api/v1/todos/:id',async(req,res)=>{
    const{id}=req.params;
    try{
        const result=await pool.query(`
            DELETE FROM todos WHERE id = $1 RETURNING *
            `,[id])
        if(result.rows.length>0){
            res.json({ msg:"Todo deleted successfully"})
        }else{
            res.status(404).send("Todo not found")
        }
    }catch(err){
        console.error("Error deleting todo:",err)
        res.status(500).send("Server error")
    }
})






app.listen(PORT,console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`))
