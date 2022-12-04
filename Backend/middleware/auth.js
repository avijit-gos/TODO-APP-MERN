/** @format */

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    // console.log(token);
    if (!token) {
      return res.status(401).json({ msg: "Invalid token" });
    } else {
      const verify = await jwt.verify(token, process.env.TOKEN_KEY);
      req.user = verify;
      next();
    }
  } catch (error) {
    return res.status(401).json({ msg: "Authentication error" });
  }
};
