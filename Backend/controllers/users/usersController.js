/** @format */
const {
  findUserBy,
  saveUserInDB,
  findUser,
  updateUser,
  updateProfileInfo,
  findUserById,
  findUpdateUserProfile,
} = require("../../database/user/userDB");
const {
  hashPassword,
  comparePassword,
  generateToken,
  uploadImage,
} = require("../../helper/helper");

class UserController {
  constructor() {
    console.log("User controller running!!");
  }
  // *** 1. Register new user
  async register(req, res) {
    if (
      !req.body.username.trim() ||
      !req.body.email.trim() ||
      !req.body.password.trim()
    ) {
      return res.status(400).json({ msg: "Invalid request parameter" });
    } else {
      const user = await findUserBy(req.body.username, req.body.email);
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      } else {
        // *** hash user password
        const hash = await hashPassword(req.body.password);
        const newUser = await saveUserInDB(
          req.body.username,
          req.body.email,
          hash
        );
        if (!newUser) {
          return res.status(400).json({ msg: "Something went wrong" });
        } else {
          res.status(201).json({ msg: "User registration successfull" });
        }
      }
    }
  }

  // *** 2. Login new user
  async loginUser(req, res) {
    const { logUser, password } = req.body;
    if (!logUser.trim() || !password.trim()) {
      return res.status(400).json({ msg: "Invalid request" });
    } else {
      const user = await findUser(logUser);
      if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
      } else {
        // *** Compare password
        const compPassword = await comparePassword(password, user);
        if (!compPassword) {
          return res.status(400).json({ msg: "Invalid credentials" });
        } else {
          // *** generate token
          const token = await generateToken(user);
          if (!token) {
            return res.status(400).json({ msg: "Something went wrong" });
          } else {
            return res
              .status(200)
              .json({ msg: "Login successfull", user, token });
          }
        }
      }
    }
  }
  // *** 3. Fetch user profile
  async fetchProfile(req, res) {
    const user = await findUserById(req.user._id);
    try {
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }
  // *** 4. Upload user profile image
  async uploadProfilePic(req, res) {
    if (!req.files.image) {
      return res.status(400).json({ msg: "No file has been selected" });
    } else {
      const result = await uploadImage(req.files.image);
      if (!result) {
        return res.status(400).json({ msg: "Something went wrong" });
      } else {
        const user = await findUpdateUserProfile(req.user._id, result.url);
        if (!user) {
          return res.status(400).json({ msg: "Something went wrong" });
        } else {
          const token = await generateToken(user);
          return res
            .status(200)
            .json({ msg: "Profile image has been uploaded", token });
        }
      }
    }
  }
  // *** 5. Edit profile(name, username & password)
  async editProfile(req, res) {
    const { name, username } = req.body;
    if (!name.trim() || !username.trim()) {
      return res.status(400).json({ msg: "Invalid request" });
    } else {
      if (req.user.username === req.body.username) {
        const user = await updateUser(name, req.user._id);
        try {
          const token = await generateToken(user);
          return res.status(200).json({ msg: "Profile updated", user, token });
        } catch (error) {
          return res.status(400).json({ msg: error.message });
        }
      } else {
        const result = await findUserBy(username);
        if (result) {
          return res.status(400).json({ msg: "Username already taken" });
        }
        const user = await updateProfileInfo(name, username, req.user._id);
        try {
          const token = await generateToken(user);
          return res.status(200).json({ msg: "Profile updated", user, token });
        } catch (error) {
          return res.status(400).json({ msg: error.message });
        }
      }
    }
  }
  // *** 6. Updating name of user
  async updateName(req, res) {
    if (!req.body.name) {
      return res.status(400).json({ msg: "Invalid request" });
    } else {
      const user = await updateUser(req.body.name, req.user._id);
      try {
        const token = await generateToken(user);
        return res
          .status(400)
          .json({ msg: "User name has been updated", user, token });
      } catch (error) {
        return res.status(500).json({ msg: "Something went wrong" });
      }
    }
  }
}

module.exports = new UserController();
