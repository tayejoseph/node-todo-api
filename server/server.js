require("./config/config"); //in the config file we configure different database for testing and development

const _ = require("lodash");
const express = require('express');
const { ObjectID } = require('mongodb'); //this contains all the valid id that mongoose accepts for our database
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose'); //this is the database
// const { User } = require("./../server/models/user");
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require("./middleware/authenticate");

const app = express();
const port = process.env.PORT || 3000; //this uses heroku if heroku is not found the it will use our local port 3000

app.use(bodyParser.json()) //this is the middleware we give to express

//THE CODE BELOW SAVE THINGS TO THE DATABASE
app.post('/todos', authenticate, (req, res) => { //this is for creating todo we the user sends info to be saved in the db
    const todo = new Todo({
        text: req.body.text, //this take in the data the user gave
        _creator: req.user._id //this brings out the todos associated with the authenticated user
    });

    todo.save().then((doc) => {
        res.send(doc); //this send the file that we save to the screen so that the users can see it
    }, (e) => {
        res.status(400).send(e);
    });
}),

//THE CODE BELOW GET THINGS FROM THE DATABASE
app.get("/todos", authenticate, (req, res) => {
    Todo.find({ //this find the todo that the user login created
        _creator: req.user._id //this find the user todo that is associated with that authenticated user
    }).then((todos) => {
        res.send({todos}); //this send the data found in the the screen(to the user)
    }, (e) => {
        res.status(400).send(e); //incase their is an err it is being send to the screen so that the user can read it
    })
});

//GET /todos/databasedataid
app.get("/todos/:id", authenticate, (req, res) => { 
    // res.send(req.params)//this shows the value of the params objects on screen
    const id = req.params.id;
    if(!ObjectID.isValid(id)){ //this check if the id is valid
        return res.status(404).send(`the id ${id} is invalid`);
    }
    Todo.findOne({ //this is used to send the todo data to the user with id is on the todos in the db
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if(!todo) {
             res.status(404).send("The id is valid but not found")//this run if the id is a valid mongoose id but not correct
        }
        res.send({todo}) //this prints the id with its data to the user
    }).catch((err) => { //this run is the id is not a valid mongoose id
        console.log(err) //this catches the error from the isValid func 
    })
});

//REMOVING DATA IN THE DB BY ID
app.delete('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send(`The id ${id} is not valid`)
    }
    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if(!todo){//this run if the todo id in valid but is not found which my be as a result of u deleting it before
            return res.status(404).send()
        }
        res.send({todo}); //this run if a tdo was found and also was deleted
    }).catch((err) => {
        res.status(400).send()
    })
});

//UPDATING OUR TODOS
app.patch("/todos/:id", authenticate, (req, res) => { 
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

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id    
    }, {$set: body}, {new: true  // with new set to be true it will return the updated value not the old one
    }).then((todo) => {
        if(!todo){ //if todo does not exist
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })

});

//Signup a new user with email and passworld
app.post("/users", (req, res) => {
    const body = _.pick(req.body, ['email', 'password']); //this list out the properties we want the users to be able to use for siging up
    const user = new User(body);

    user.save().then(() => {//this save the user email and passworld to the database
        return user.generateAuthToken(); //this returns the user email address and id
    }).then((token) => {
        res.header("x-auth", token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});


//this is used to sign up user 
app.get("/users/me", authenticate, (req, res) => {
    res.send(req.user);
});

//this is used to login users it take that username and password it now compare the password with the hashed passwrd in our db
app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    //the findByCredentials is a method we wrote in user js
    User.findByCredentials(body.email, body.password).then((user) =>{
        //note the generatedAuthToken is defined as a method in the user file
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user); //since the users name and the password match we naw set our respond header to a generated token and return back the user data
        });
    }).catch((e) => {//if the user email and password does not exist in the db
        res.status(400).send();
    });
});

//This is used to log the user out which can be done by deleting the usr token from the header
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        //not the removeToken function is defined in user.js
        res.status(200).send(); //this send a status of 200 if the user is logged out
    }, () => {
        res.status(400).send();
    })
});


app.listen(port, () => {
console.log(`Started up at port ${port}`);
});

module.exports = {app}; //this is being use for testing