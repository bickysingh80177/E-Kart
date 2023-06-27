const model = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/asyncError");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

const Product = model.productModel;

//Create product -- Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  const imagesLinks = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  // console.log(req.body);
  const product = await Product.create(req.body);
  res.status(200).json({ success: true, product });
});

// Get All Products
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query);

  let products = await apiFeature.search().filter().query;
  const filteredProductsCount = products.length;
  products = await apiFeature.pagination(resultPerPage).query.clone();

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Products - Admin
const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  // console.log(products);

  res.status(200).json({
    success: true,
    products,
  });
});

// Get product details
const getProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  res.status(200).json({
    success: false,
    product,
  });
});

// Update Product -- Admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).send({
    success: true,
    product,
  });
});

// Delete products -- Admin
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  // deleting the images from Cloudinary
  for (let i = 0; i < product.images.length; ++i) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    product,
  });
});

// Create new Review or update the review
const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // finding the average rating of the product
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get all reviews of a single product
const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.query;
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete product review
const deleteProductReview = catchAsyncErrors(async (req, res, next) => {
  const { id, productId } = req.query;
  const product = await Product.findById(productId);

  if (!product) return next(new ErrorHandler("Product not found!!", 404));

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== id.toString()
  );

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({ success: true });
});

exports.productController = {
  getAllProducts,
  getAdminProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteProductReview,
};
