import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import Metadata from "../layout/Metadata";
import Sidebar from "./Sidebar";
import userConstants from "../../constants/userConstants";
import userAction from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const userId = params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(userAction.updateUser(userId, myForm));
  };

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(userAction.getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(userAction.clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(userAction.clearErrors());
    }

    if (isUpdated) {
      alert.success("User Profile Updated Successfully");
      dispatch({ type: userConstants.UPDATE_USER_RESET });
      navigate("/admin/users");
    }
  }, [dispatch, alert, error, isUpdated, updateError, navigate, userId, user]);

  return (
    <Fragment>
      <Metadata title="Update User -- Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateUserSubmitHandler}
            >
              <h1
                style={{ borderBottom: "1px solid rgba(167, 162 , 162, 0.9)" }}
              >
                Update User
              </h1>
              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="User Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="sales">Sales</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={!!updateLoading || !!(role === "")}
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
