const express = require('express');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const app = express();
const port = 3000;

const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ todos: [] })
    .write()
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => res.render('index', { title: 'Hey', message: 'Hello Cuong!' }));

app.get('/todos', (req, res) => res.render('todos/index', { todos: db.get('todos').value() }));

app.get('/todos/:id/delete', (req, res) => {
    let id = parseInt(req.params.id);
    let todo = db.get('todos').find({ id: id }).value();
    db.get('todos').remove({id: id}).write();
    res.redirect('/todos')
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));