const express = require("express");

const { userController } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .post("/register", userController.userRegistration)
  .post("/login", userController.userLogin)
  .post("/password/forgot", userController.forgotPassword)
  .put("/password/reset/:token", userController.resetPassword)
  .get("/me", isAuthenticatedUser, userController.getUserDetail)
  .put("/password/update", isAuthenticatedUser, userController.updatePassword)
  .put("/profile/update", isAuthenticatedUser, userController.updateProfile)
  .get("/logout", isAuthenticatedUser, userController.userLogout)
  .get(
    "/admin/users",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    userController.getAllUser
  );
router
  .route("/admin/user/:id")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    userController.getSingleUser
  )
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    userController.updateUserRole
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    userController.deleteUser
  );

exports.userRouter = router;

// 1. FIXME: route for reset password
