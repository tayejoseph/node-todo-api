
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken')
const {Todo} = require("./../../models/todo")
const {User} = require("./../../models/user");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: new ObjectID(),
    email: "andrew@example.com",
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: "jen@example.com",
    password: "userTwoPass"
}];
 

const todos = [{
    _id: new ObjectID(),
    text: "First test todo"
}, {
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => { //this runs before every single test case
    Todo.remove({}).then(() => {
        // Todo.remove({}).then(() => done()); //this will make our database empty before every request
        return Todo.insertMany(todos); //this insert some text bo our todo
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done())
};

module.exports = {todos, populateTodos, users, populateUsers};