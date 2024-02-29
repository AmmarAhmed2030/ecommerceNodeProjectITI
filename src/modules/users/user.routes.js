import express from "express";

import {
  activateUser,
  addUser,
  deactivateUser,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getAllUsersSorted,
  resetPass,
  resetPassword,
  searchByAge,
  searchByNameAge,
  searchUserById,
  signIn,
  updateUser,
  verifyAccount,
} from "./controller/user.controller.js";
import { validation } from "../../middleware/validation.js";
import {
  activateUserSchema,
  addUserSchema,
  deactivateUserSchema,
  deleteUserSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  searchUserSchema,
  signInSchema,
  updateUserValidation,
} from "./user.validation.js";
import { auth } from "../../../src/middleware/auth.js";

const userRoutes = express.Router();
//get All Users
userRoutes.get("/", getAllUsers);
//get All Users sorted Alphabetically
userRoutes.get("/sortedUsers", getAllUsersSorted);
//Add user
userRoutes.post("/user/signUp", validation(addUserSchema), addUser);
// login
userRoutes.post("/user/signIn", validation(signInSchema), signIn);
//UPDATE USER BY EMAIL
userRoutes.patch(
  "/user/:userId",
  auth,
  validation(updateUserValidation),
  updateUser
);
//reset password
userRoutes.post(
  "/user/resetPassword/:id/:token",
  validation(resetPasswordSchema),
  resetPassword
);
userRoutes.get("/user/resetPassword/:id/:token", resetPass);
//forget password
userRoutes.post(
  "/user/forgetPassword",
  validation(forgetPasswordSchema),
  forgetPassword
);
//deactivate user
userRoutes.post(
  "/user/deactivate/:id",
  validation(deactivateUserSchema),
  deactivateUser
);
//activate user
userRoutes.post(
  "/user/activate/:id",
  validation(activateUserSchema),
  activateUser
);
//Delete User by id
userRoutes.delete("/user/:id", validation(deleteUserSchema), deleteUser);
// search user by id
userRoutes.get("/user/:id", validation(searchUserSchema), searchUserById);
userRoutes.get("/user/verify/:token", verifyAccount);
userRoutes.get("/user/searchNameAge/:startWith/:maxAge", searchByNameAge);

userRoutes.get("/user/searchAge/:minAge/:maxAge", searchByAge);
export default userRoutes;
