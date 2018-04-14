const express = require('express');
const bodyParser = require('body-parser');

const {mangoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {user} = require('./models/user');

const app = express();

app.use(bodyParser.json()) //this is the middleware we give to express
app.post('/todos', (req, res) => { //this is for creating todo we the user sends info to be saved in the db
    const todo = new Todo({
        text: req.body.text //this take in the data the user gave
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
}),

app.listen(3000, () => {
console.log("Started on port 3000")
});

module.exports = {app}; //this is being use for testing