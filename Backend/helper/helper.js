/** @format */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class helperFunc {
  constructor() {
    console.log("Helper functions running!!");
  }

  async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    try {
      return hash;
    } catch (error) {
      return false;
    }
  }

  async comparePassword(password, user) {
    const result = await bcrypt.compare(password, user.password);
    try {
      return result;
    } catch (error) {
      return false;
    }
  }

  async generateToken(user) {
    const token = await jwt.sign(
      {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "1d" }
    );
    try {
      return token;
    } catch (error) {
      return false;
    }
  }

  async uploadImage(file) {
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    try {
      return result;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new helperFunc();
