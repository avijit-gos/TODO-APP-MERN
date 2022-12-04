/** @format */

const mongoose = require("mongoose");
const User = require("../../schema/users/usersSchema");

class DBFunctions {
  constructor() {
    console.log("DB function running");
  }
  async findUserBy(username, email) {
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    try {
      return user;
    } catch (error) {
      return false;
    }
  }

  async saveUserInDB(username, email, hash) {
    const saveUser = User({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      email: email,
      password: hash,
    });
    var newUser = await saveUser.save();
    try {
      return newUser;
    } catch (error) {
      return false;
    }
  }

  async findUser(logUser) {
    const user = await User.findOne({
      $or: [{ email: logUser }, { username: logUser }],
    });
    try {
      return user;
    } catch (error) {
      return false;
    }
  }

  async updateUser(name, id) {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { name: name } },
      { new: true }
    );
    try {
      return user;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async updateProfileInfo(name, username, id) {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { name: name, username: username } },
      { new: true }
    );
    console.log(user);
    try {
      return user;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async findUserById(id) {
    const user = await User.findById(id, "-password");
    try {
      return user;
    } catch (error) {
      return false;
    }
  }

  async findUpdateUserProfile(id, url) {
    var user = await User.findByIdAndUpdate(
      id,
      { profilePic: url },
      { new: true }
    );
    try {
      return user;
    } catch {
      return false;
    }
  }
}

module.exports = new DBFunctions();
