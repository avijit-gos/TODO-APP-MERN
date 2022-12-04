/** @format */

const server = require("./index");
const mocha = require("mocha");
const chai = require("chai");
const chatHttp = require("chai-http");
const should = chai.should();
const User = require("./schema/users/usersSchema");

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

describe("Test /api/user", () => {
  beforeEach((done) => {
    User.deleteMany({}, () => {});
    done();
  });

  afterEach((done) => {
    User.deleteMany({}, () => {});
    done();
  });

  // Test register new user
  it("Register: ", (done) => {
    chai
      .request(server)
      .post("/api/user/")
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.an("object");
        done();
      });
  });

  // Test Login API:
  it("/login", (done) => {
    chai
      .request(server)
      .post("/api/user/")
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.should.have.status(201);
        res.body.should.have.an("object");
        chai
          .request(server)
          .post("/api/user/login")
          .send(user_login)
          .end((err, res) => {
            // console.log(res.body);
            res.should.have.status(200);
            res.body.should.have.an("object");
            res.body.should.have.a.property("user");
            res.body.should.have.a.property("token");
            res.body.user.should.have.a.property("_id");
            done();
          });
      });
  });

  // Test fetch profile API:
  it("/fetch/profile", (done) => {
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
              .get("/api/user/fetch/profile")
              .set("x-access-token", res.body.token)
              .end((err, res) => {
                res.should.have.a.status(200);
                res.body.should.have.a.property("_id");
                res.body.should.have.a.property("username");
                res.body.should.have.a.property("email");
                done();
              });
          });
      });
  });
});
