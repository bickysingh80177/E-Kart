import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { Typography, Slider } from "@mui/material";

import "./Products.css";
import productAction from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "./ProductCard";
import Metadata from "../layout/Metadata";

const categories = [
  "category-1",
  "category-2",
  "category-3",
  "Laptop",
  "Footwear",
  "Bottom",
  "Top",
  "Mobiles",
  "Attire",
  "Camera",
  "T-shirts",
];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 1000000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { keyword } = useParams();
  const {
    products,
    loading,
    error,
    productCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    dispatch(
      productAction.getProducts(keyword, currentPage, price, category, ratings)
    );
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  if (error) {
    alert.error(error);
    dispatch(productAction.clearErrors());
  }

  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="PRODUCTS -- E-COMMERCE" />
          <h2 className="productsHeading">Products</h2>
          <div className="layout">
            {/* Product price filter with slider */}
            {keyword && (
              <div className="filterBox">
                <Typography>Price</Typography>

                <Slider
                  size="small"
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={1000000}
                />

                <Typography>Categories</Typography>
                <ul className="categoryBox">
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>

                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  size="small"
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  min={0}
                  max={5}
                  valueLabelDisplay="auto"
                  className="ratingSlider"
                />
              </div>
            )}
            <div className="products">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
