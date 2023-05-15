import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";

import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import userAction from "../../actions/userAction";
import userConstants from "../../constants/userConstants";
import Metadata from "../layout/Metadata";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordVisibility, setNewPassVisibility] = useState(false);
  const [newPasswordType, setNewPasswordType] = useState(true);
  const [confPassVisibility, setConfPassVisibility] = useState(false);
  const [confPasswordType, setConfPasswordType] = useState(true);

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

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(userAction.forgotPassword(params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(userAction.clearError());
    }

    if (success) {
      alert.success("Password Updated successfully");
      navigate("/login");
      dispatch({ type: userConstants.UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, navigate, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Update Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Password</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
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
                    <button onClick={toggleNewPassword} className="togglePass">
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
                  value="Update Password"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
