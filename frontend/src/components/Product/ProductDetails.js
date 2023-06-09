import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import "./ProductDetails.css";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import Metadata from "../layout/Metadata";
import cartAction from "../../actions/cartAction";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      const qty = quantity + 1;
      setQuantity(qty);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const qty = quantity - 1;
      setQuantity(qty);
    }
  };

  const addToCartHandler = () => {
    dispatch(cartAction.addItemsToCart(id, quantity));
    alert.success("Item added to cart");
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${product.name} -- E-COMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel
                indicators={false}
                fullHeightHover={false}
                navButtonsProps={{
                  style: {
                    backgroundColor: "cornflowerblue",
                    borderRadius: 0,
                  },
                }}
                navButtonsWrapperProps={{
                  style: {
                    bottom: "0",
                    top: "unset",
                  },
                }}
                animation="fade"
                className="carousel"
              >
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      src={item.url}
                      alt={`${i} Slide`}
                      key={item.url}
                      className="carouselImage"
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>₹ {product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Add To Cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "Out of Stock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: {product.description}
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard review={review} key={review._id} />
                ))}
            </div>
          ) : (
            <p className="noReviews">NO REVIEWS YET</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
