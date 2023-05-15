import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import userAction from "../../actions/userAction";
import userConstants from "../../constants/userConstants";
import Metadata from "../layout/Metadata";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordVisibility, setOldPassVisibility] = useState(false);
  const [oldPasswordType, setOldPasswordType] = useState(true);
  const [newPasswordVisibility, setNewPassVisibility] = useState(false);
  const [newPasswordType, setNewPasswordType] = useState(true);
  const [confPassVisibility, setConfPassVisibility] = useState(false);
  const [confPasswordType, setConfPasswordType] = useState(true);

  const toggleOldPassword = (e) => {
    e.preventDefault();
    setOldPassVisibility((x) => !x);
    setOldPasswordType((x) => !x);
  };

  const toggleNewPassword = (e) => {
    e.preventDefault();
    setNewPassVisibility((x) => !x);
    setNewPasswordType((x) => !x);
  };

  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    setConfPassVisibility((x) => !x);
    setConfPasswordType((x) => !x);
  };

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(userAction.updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(userAction.clearError());
    }

    if (isUpdated) {
      alert.success("Password Updated successfully");
      navigate("/account");
      dispatch({ type: userConstants.UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, navigate, isUpdated, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        isAuthenticated === true && (
          <Fragment>
            <Metadata title="Update Password" />
            <div className="updatePasswordContainer">
              <div className="updatePasswordBox">
                <h2 className="updatePasswordHeading">Update Password</h2>
                <form
                  className="updatePasswordForm"
                  onSubmit={updatePasswordSubmit}
                >
                  <div className="registerPassword">
                    <VpnKeyIcon />
                    <input
                      type={oldPasswordType ? "password" : "text"}
                      placeholder="Old Password"
                      required
                      name="oldPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    {oldPassword && (
                      <button
                        onClick={toggleOldPassword}
                        className="togglePass"
                      >
                        {oldPasswordVisibility ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </button>
                    )}
                  </div>
                  <div className="registerPassword">
                    <LockOpenIcon />
                    <input
                      type={newPasswordType ? "password" : "text"}
                      placeholder="New Password"
                      required
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {newPassword && (
                      <button
                        onClick={toggleNewPassword}
                        className="togglePass"
                      >
                        {newPasswordVisibility ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </button>
                    )}
                  </div>
                  <div className="registerPassword">
                    <LockIcon />
                    <input
                      type={confPasswordType ? "password" : "text"}
                      placeholder="Confirm Password"
                      required
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPassword && (
                      <button
                        onClick={toggleConfirmPassword}
                        className="togglePass"
                      >
                        {confPassVisibility ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </button>
                    )}
                  </div>
                  <input
                    type="submit"
                    value="Change Password"
                    className="updatePasswordBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default UpdatePassword;
