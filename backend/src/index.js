// index.js
const express = require('express');
const pool = require('./db'); // Import the pool from db.js

const app = express();
const PORT = 5000;

app.use(express.json()); // Middleware to parse JSON bodies

// Get all todos
app.get('/todos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos');
        res.json(result.rows); // Send todos as JSON response
    } catch (err) {
        console.error("Error fetching todos:", err);
        res.status(500).send("Server error");
    }
});

// Create a new todo
app.post('/todos', async (req, res) => {
    const { title, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *',
            [title, description]
        );
        res.status(201).json(result.rows[0]); // Respond with the created todo
    } catch (err) {
        console.error("Error inserting todo:", err);
        res.status(500).send("Server error");
    }
});

// Update a todo by ID
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const result = await pool.query(
            `UPDATE todos
       SET title = $1, description = $2, completed = $3, updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
            [title, description, completed, id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Respond with the updated todo
        } else {
            res.status(404).send("Todo not found");
        }
    } catch (err) {
        console.error("Error updating todo:", err);
        res.status(500).send("Server error");
    }
});

// Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.json({ message: 'Todo deleted successfully' });
        } else {
            res.status(404).send("Todo not found");
        }
    } catch (err) {
        console.error("Error deleting todo:", err);
        res.status(500).send("Server error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
