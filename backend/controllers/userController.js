const crypto = require("crypto");
const cloudinary = require("cloudinary");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/asyncError");
const model = require("../models/userModel");
const { setToken } = require("../utils/jwtToken");
const { sendEmail } = require("../utils/sendEmail");

const User = model.userModel;

// user Registration
const userRegistration = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password, role = "user" } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  setToken(user, 201, res);
});

// user login
const userLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //   checking if user password and email are both present
  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and Password"));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  setToken(user, 200, res);
});

// user Logout
const userLogout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: `${req.user.name} logged out successfully`,
  });
});

// Forget Password
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ErrorHandler("User Not found", 404));

  // Get reset password token
  const resetToken = user.getResetPasswordToken();

  // as user was already created then we have to save the reset token in the user again
  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/password/reset/${resetToken}`;

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is:- \n\n ${resetPasswordUrl} \n\n if you not requested this email, then please ignore this message`;

  try {
    await sendEmail({
      email: user.email,
      subject: "E-commerce password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(err.message, 500));
  }
});

// reset password
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user)
    return next(
      new ErrorHandler(
        "Reset Password token is invalid or has been expired",
        400
      )
    );

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords did not match", 400));
  }
  console.log(req.body.password);
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  setToken(user, 200, res);
});

//Get User Detail
const getUserDetail = catchAsyncErrors(async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Update User password
const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findById(id).select("+password");

  const passwordMatch = await user.comparePassword(req.body.oldPassword);
  if (!passwordMatch) {
    return next(new ErrorHandler("Invalid Old Password", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password didn't match", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  setToken(user, 200, res);
});

// Update User Profile
const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const id = req.user.id;
  const newUserDetail = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== " ") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserDetail.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(id, newUserDetail, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

// Get all users -- Admin
const getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get Single user detail -- Admin
const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user)
    return next(
      new ErrorHandler(`User does not exists with provided id - ${id}`)
    );

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user -- Admin
const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });

  console.log(user);

  res.status(200).json({
    success: true,
    user,
  });
});

// delete user -- Admin
const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user)
    return next(new ErrorHandler(`User doesn't exists with id- ${id}`, 404));

  await user.deleteOne();

  res.status(200).json({
    success: true,
  });
});

exports.userController = {
  userRegistration,
  userLogin,
  userLogout,
  forgotPassword,
  resetPassword,
  getUserDetail,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
};
