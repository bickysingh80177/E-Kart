import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import "./Home.css";
import ProductCard from "../Product/ProductCard.js";
import Metadata from "../layout/Metadata";
import productAction from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(productAction.getProducts());
  }, [dispatch]);

  if (error) {
    alert.error(error);
    dispatch(productAction.clearErrors());
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="E-COMMERCE" />
          <div className="banner">
            <p>Welcome to E-COMMERCE</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <div key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
