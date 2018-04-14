const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require("./../models/todo");

beforeEach((done) => { //this runs before every single test case
    Todo.remove({}).then(() => done()); //this will make our database empty before every request
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
            Todo.find().then((todos) => {
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
                expect(todos.length).toBe(0);
                done();
            }).catch((e) => done(e));
        })
    })
});