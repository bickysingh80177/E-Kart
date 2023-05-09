import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Profile.css";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader/Loader";

const Profile = () => {
  const navigate = useNavigate();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        isAuthenticated === true && (
          <Fragment>
            <Metadata title={`${user?.name}'s Profile`} />
            <div className="profileContainer">
              <div>
                <h1>{`${user?.name}'s Profile`}</h1>
                <img src={user?.avatar?.url} alt={user?.name} />
                <Link to="/profile/update">Edit Profile</Link>
              </div>
              <div>
                <div>
                  <h4>Full Name</h4>
                  <p>{user?.name}</p>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <h4>Joined On</h4>
                  <p>{String(user?.createdAt).substr(0, 10)}</p>
                </div>
                <div>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/password/update">Change Password</Link>
                </div>
              </div>
            </div>
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default Profile;
