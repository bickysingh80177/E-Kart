import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import "./Header.css";
import userAction from "../../../actions/userAction";

function UserOptions({ user }) {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  const adminDashboard = () => navigate("/dashboard");
  const userAccount = () => {
    if (isAuthenticated) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };
  const userOrders = () => navigate("/orders");
  const userLogout = () => {
    dispatch(userAction.userLogout());
    navigate("/");
    alert.success("Logout Successfully");
  };

  const options = [
    {
      icon: <ListAltIcon />,
      name: "Orders",
      func: userOrders,
    },
    {
      icon: <PersonIcon />,
      name: "Profile",
      func: userAccount,
    },
    {
      icon: <ExitToAppIcon />,
      name: "Logout",
      func: userLogout,
    },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: adminDashboard,
    });
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "./Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item?.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
}

export default UserOptions;
