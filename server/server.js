require("./config/config"); //in the config file we configure different database for testing and development

const _ = require("lodash");
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
    Todo.findById(id).then((todo) => {
        if(!todo) {
             res.status(404).send("The id is valid but not found")//this run if the id is a valid mongoose id but not correct
        }
        res.send({todo}) //this prints the id with its data to the user
    }).catch((err) => { //this run is the id is not a valid mongoose id
        console.log(err) //this catches the error from the isValid func 
    })
});

//REMOVING DATA IN THE BD BY ID
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send(`The id ${id} is not valid`)
    }
    Todo.findByIdAndRemove({_id: id}).then((todo) => {
        if(!todo){//this run if the todo id in valid but is not found which my be as a result of u deleting it before
            return res.status(404).send()
        }
        res.send({todo}); //this run if a tdo was found and also was deleted
    }).catch((err) => {
        res.status(400).send()
    })
});

//UPDATING OUR TODOS
app.patch("/todos/:id", (req, res) => { 
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']); //this is used to pick the properties we want the user to be able to update from our database
    if (!ObjectID.isValid(id)) {
        return res.status(404).send(`The id ${id} is not valid`)
    }

    if(_.isBoolean(body.completed) && body.completed){ //this check if the body.completed is a boolean and if it is set to true
        body.completedAt = new Date().getTime() //this creates and set a completedAt props to the current time if our completed value is true
    } else { //this runs if completed is false
        body.completed = false;
        body.completedAt = null; //this removes the completed at value from the database
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true  // with new set to be true it will return the updated value not the old one
    }).then(() => {
        if(!todo){ //if todo does not exist
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })

});




app.listen(port, () => {
console.log(`Started up at port ${port}`);
});

module.exports = {app}; //this is being use for testing