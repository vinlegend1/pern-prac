const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middlewares
app.use(cors());
app.use(express.json());

// Routes

// create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1)", [description]);
        res.json(newTodo);
    } catch(e) {
        console.error(e);
    }
})

// get all todos

// get a todo

// update a todo

// delete a todo

app.listen(5000, () => console.log('Listening on port 3000'));