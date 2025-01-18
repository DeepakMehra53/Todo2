
const express =require('express');
const { createTodo } = require('./types');
const app =express()
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/api/v1/todos',(req,res)=>{
    
})

app.post("/api/v1/add",(req,res)=>{
    const createbody = req.body
    const parsedPayload = createTodo.safeParse(createbody)
    if(!parsedPayload.success){
       res.status(411).json({
        msg:"Wrong Input"
       })
       return;
    }
    // put in postgres
})

app.put('/api/v1/update',(req,res)=>{
    const updatePayload= req.body;
    const parsedPayload= updatePayload.safeParse(updatePayload)
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "Wrong Input"
        })
        return;
    }
})

app.listen(PORT,console.log(`Server is running on http://localhost:${PORT}`))