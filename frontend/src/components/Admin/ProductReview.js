import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";

import "./ProductReview.css";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader/Loader";
import Sidebar from "./Sidebar";
import reviewConstants from "../../constants/reviewConstants";
import reviewAction from "../../actions/reviewAction";

const ProductReview = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [productId, setProductId] = useState("");

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );

  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(reviewAction.clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(reviewAction.clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      dispatch({ type: reviewConstants.DELETE_REVIEW_RESET });
      navigate("/admin/reviews");
    }

    if (productId.length === 24) {
      dispatch(reviewAction.getAllReviews(productId));
    }
  }, [dispatch, error, alert, deleteError, isDeleted, navigate, productId]);

  const deleteProductHandler = (id) => {
    // dispatch(productAction.deleteProduct(id));
  };

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(reviewAction.getAllReviews(productId));
  };

  const columns = [
    { field: "id", headerName: "Review Id", minWidth: 200, flex: 0.5 },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 270,
      flex: 0.4,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      sortable: false,
      minWidth: 150,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => deleteProductHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((rating) => {
      rows.push({
        id: rating._id,
        rating: rating.rating,
        comment: rating.comment,
        user: rating.name,
      });
    });

  return (
    <Fragment>
      <Metadata title={"ALL REVIEWS - ADMIN"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <Sidebar />
            <div className="productReviewsContainer">
              <form
                className="productReviewsForm"
                onSubmit={productReviewSubmitHandler}
              >
                <h1 id="productReviewsFormHeading">All Reviews</h1>
                <div>
                  <StarIcon />
                  <input
                    type="text"
                    placeholder="Product Id"
                    required
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </div>
                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading ? true : !!(false || productId === "")}
                >
                  Search
                </Button>
              </form>
              {reviews && reviews.length > 0 ? (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  autoHeight={false}
                  disableSelectionOnClick
                  className="productListTable"
                  sx={{ overflowX: "scroll" }}
                />
              ) : (
                <h1 className="productReviewsFormHeading">No Reviews Found</h1>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductReview;
