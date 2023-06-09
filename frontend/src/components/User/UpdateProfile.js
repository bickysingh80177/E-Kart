import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import userAction from "../../actions/userAction";
import userConstants from "../../constants/userConstants";
import Metadata from "../layout/Metadata";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(userAction.updateProfile(myForm));
    alert.success(`${name}'s profile updated successfully`);
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");

    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user?.avatar?.url);
    }

    if (error) {
      alert.error(error);
      dispatch(userAction.clearError);
    }

    if (isUpdated) {
      dispatch(userAction.loadUser());
      navigate("/account");
      dispatch({ type: userConstants.UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, alert, navigate, isUpdated, user, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        isAuthenticated === true && (
          <Fragment>
            <Metadata title="Update Profile" />
            <div className="updateProfileContainer">
              <div className="updateProfileBox">
                <h2 className="updateProfileHeading">Update Profile</h2>
                <form
                  className="updateProfileForm"
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <div className="updateProfileName">
                    <TagFacesIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="updateProfileEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="updateProfileImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/"
                      onChange={updateProfileDataChange}
                      style={{ padding: "0", display: "flex" }}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="updateProfileBtn"
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

export default UpdateProfile;
