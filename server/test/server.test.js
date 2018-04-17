const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require("./../models/todo");

const todos = [{
    _id: new ObjectID(),
    text: "First test todo"
}, {
     _id: new ObjectID(),
    text: "Second test todo"
}];

beforeEach((done) => { //this runs before every single test case
    Todo.remove({}).then(() => {
// Todo.remove({}).then(() => done()); //this will make our database empty before every request
    return  Todo.insertMany(todos); //this insert some text bo our todo
    }).then(() => done());
});

describe("POST /todos", () => {
    it("Should create a new todo", (done) => {
        const text = "Test todo text";
        request(app)
        .post('/todos')
        .send({text})//this is the data we send to the db
        .expect(200) ///this is expect the status to be 200 
        .expect((res) => {
            expect(res.body.text).toBe(text); //this expect the response test body to be equal to text that was sent to the db
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }
            //this check if the value was actually saved in the database
            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });

    it("Should not create todo with invalid body data", (done) => {
        request(app)
        .post("/todos")
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err) {
                return done(err);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        })
    })
});


describe("GET /todos", () => {
    it("Should get all todos", (done) => {
        request(app)
        .get("/todos")
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.lenght).toBe(2);
        })
        .end(done);
    });
});

describe("GEt /todos/:id", () => {
    it("Should return todo doc", (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`) //the .toHexString() converts the objects id to a string
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
        });

        it("Should return 404 if todo not found", (done) => {
            const hexId = new ObjectID.toHexString() //this convert our id value to a string
            request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
        });

        it("Shoud return 404 for non object IDs", (done) => {
            request(app)
            .get("/todos/123abc")
            .expect(404)
            .end(done);
        });
});

describe("DELETE /todos/:id", () => {
    it('Should remove a todo', (done) => {
        const hexId = todos[1]._id.toHexString(); //this is used to get the second todo id above
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
            if(err){
                return done(err)
            }
            Todo.findById(hexId).then((todo) => { //note by this time todo is already set to be null
                expect(todo).toNotExist();
                done();
            }).catch((e) => done(e));
        })
    });

    it("Should return 404 if todo not found", (done) => {
        const hexId = new ObjectID.toHexString() //this convert our id value to a string
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it("Should return 404 if the object id is invalid", (done) => {
        request(app)
            .delete("/todos/123abc")
            .expect(404)
            .end(done);
    });
    
})