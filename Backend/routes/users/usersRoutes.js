/** @format */

const router = require("express").Router();
const {
  register,
  loginUser,
  updateName,
  fetchProfile,
  editProfile,
  uploadProfilePic,
} = require("../../controllers/users/usersController");
const auth = require("../../middleware/auth");

// *** 1. Register new user
router.post("/", register);
// *** 2. Login new user
router.post("/login", loginUser);
// *** 3. Fetch user profile
router.get("/fetch/profile", auth, fetchProfile);
// *** 4. Upload user profile image
router.post("/upload/profile/image", auth, uploadProfilePic);
// *** 5. Edit profile(name, username & password)
router.post("/edit/profile", auth, editProfile);
// *** 6. Updating name of user
router.put("/update/name", auth, updateName);

module.exports = router;
