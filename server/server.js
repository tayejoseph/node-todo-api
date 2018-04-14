const express = require('express');
const bodyParser = require('body-parser');

const {mangoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {user} = require('./models/user');

const app = express();

app.use(bodyParser.json()) //this is the middleware we give to express

//THE CODE BELOW SAVE THINGS TO THE DATABASE
app.post('/todos', (req, res) => { //this is for creating todo we the user sends info to be saved in the db
    const todo = new Todo({
        text: req.body.text //this take in the data the user gave
    });

    todo.save().then((doc) => {
        res.send(doc); //this send the file that we save to the screen so that the users can see it
    }, (e) => {
        res.status(400).send(e);
    });
}),

//THE CODE BELOW GET THINGS FROM THE DATABASE
app.get("/todos", (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos}); //this send the data found in the the screen(to the user)
    }, (e) => {
        res.status(400).send(e); //incase their is an err it is being send to the screen so that the user can read it
    })
})



app.listen(3000, () => {
console.log("Started on port 3000")
});

module.exports = {app}; //this is being use for testing