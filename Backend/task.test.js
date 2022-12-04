/** @format */

const Task = require("./schema/tasks/tasksSchema");
const mocha = require("mocha");
const chai = require("chai");
const chatHttp = require("chai-http");
const should = chai.should();
const expect = chai.expect();
const server = require("./index");
chai.use(chatHttp);

const user = {
  name: "Peter Borrow",
  username: "peter_123",
  email: "peter_123@test.com",
  password: "123",
};
const user_login = {
  logUser: "peter_123@test.com",
  password: "123",
};
const task = {
  title: "Title for task one",
  body: "Body for task one",
};

describe("Testing task api", () => {
  beforeEach((done) => {
    Task.deleteMany({}, (err) => {});
    done();
  });
  afterEach((done) => {
    Task.deleteMany({}, (err) => {});
    done();
  });

  // Test Register API:
  it("create task", (done) => {
    chai
      .request(server)
      .post("/api/user/")
      .send(user)
      .end((err, res) => {
        chai
          .request(server)
          .post("/api/user/login")
          .send(user_login)
          .end((err, res) => {
            chai
              .request(server)
              .post("/api/task/create")
              .set({ "x-access-token": res.body.token })
              .send(task)
              .end((err, res) => {
                res.should.have.status(201);
                res.body.task.should.have.a.property("_id");
                res.body.task.should.be.an("object");
                res.body.task.should.have.a.property("title");
                res.body.task.title.should.be.a("string");

                res.body.task.should.have.a.property("body");
                res.body.task.body.should.be.a("string");

                res.body.task.should.have.a.property("status");
                res.body.task.status.should.be.a("Boolean");

                res.body.task.should.have.a.property("user");
                res.body.task.user.should.be.a("string");

                res.body.task.should.have.a.property("pin");
                res.body.task.pin.should.be.a("Boolean");
                done();
              });
          });
      });
  });

  // Fetch all tasks
  it("fetch task", (done) => {
    chai
      .request(server)
      .post("/api/user/")
      .send(user)
      .end((err, res) => {
        chai
          .request(server)
          .post("/api/user/login")
          .send(user_login)
          .end((err, res) => {
            chai
              .request(server)
              .get("/api/task/fetch")
              .set({ "x-access-token": res.body.token })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("array");
                done();
              });
          });
      });
  });
});
