const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

/*
    in db.js ...
    const Pool = require("pg").Pool;

    const pool = new Pool({
        user: "...",
        password: "...",
        host: "...", // usually "localhost"
        port: 5432,
        database: "..." // name of database
    });

    module.exports = pool;
*/

// Middlewares
app.use(cors());
app.use(express.json());

// Routes

// create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING * ", [description]);
        res.json(newTodo.rows[0]);
    } catch(e) {
        console.error(e);
    }
})

// get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch(e) {
        console.error(e);
    }
})

// get a todo
app.get('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch(e) {
        console.error(e);
    }
})

// update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("todo was updated");
    } catch(e) {
        console.error(e);
    }
});

// delete a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = pool.query("DELETE from todo WHERE todo_id = $1", [id]);

        res.json("todo was deleted");
    } catch(e) {
        console.error(e);
    }
});

app.listen(5000, () => console.log('Listening on port 3000'));