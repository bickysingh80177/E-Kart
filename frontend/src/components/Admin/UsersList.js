import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// import "./UsersList.css";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader/Loader";
import Sidebar from "./Sidebar";
import userAction from "../../actions/userAction";
import userConstants from "../../constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isUpdated,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(userAction.clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(userAction.clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      dispatch({ type: userConstants.DELETE_USER_RESET });
      navigate("/admin/users");
    }

    dispatch(userAction.getAllUsers());
  }, [dispatch, error, alert, deleteError, isDeleted, navigate, message]);

  const deleteUserHandler = (id) => {
    dispatch(userAction.deleteUser(id));
  };

  const columns = [
    { field: "id", headerName: "User Id", minwidth: 180, flex: 0.5 },
    { field: "name", headerName: "Name", minwidth: 150, flex: 0.3 },
    {
      field: "email",
      headerName: "Email",
      minwidth: 200,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minwidth: 150,
      flex: 0.3,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      sortable: false,
      minwidth: 150,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteUserHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((user) => {
      rows.push({
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      });
    });

  return (
    <Fragment>
      <Metadata title={"ALL USERS - ADMIN"} />
      <Fragment>
        <div className="dashboard">
          <Sidebar />
          <div className="productListContainer">
            <h1 id="productListHeading">All Users</h1>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              autoHeight={false}
              disableSelectionOnClick
              className="productListTable"
              sx={{ overflowX: "scroll" }}
            />
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

export default UsersList;
