const { ObjectID } = require('mongodb'); //this contains all the valid id that mongoose accepts for our database
const express = require('express');
const bodyParser = require('body-parser');

const {mangoose} = require('./db/mongoose'); //this is the database
// const { User } = require("./../server/models/user");
const {Todo} = require('./models/todo');
const { User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000; //this uses heroku if eroku is not found the it will use our local port 3000

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

//GET /todos/databasedataid
app.get("/todos/:id", (req, res) => { 
    // res.send(req.params)//this shows the value of the params objects on screen
    const id = req.params.id;
    if(!ObjectID.isValid(id)){ //this check if the id is valid
        return res.status(404).send(`the id ${id} is invalid`);
    }
    User.findById(id).then((user) => {
        if(!user) {
            return res.status(404).send("The id is valid but not found")//this run if the id is a valid mongoose id but not correct
        }
        res.send({user}) //this prints the id with its data to the user
    }).catch((err) => { //this run is the id is not a valid mongoose id
        console.log(err) //this catches the error from the isValid func 
    })
});


app.listen(port, () => {
console.log(`Started up at port ${port}`);
});

module.exports = {app}; //this is being use for testing