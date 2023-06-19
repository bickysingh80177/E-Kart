const express = require("express");

const { productController } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .get("/products", productController.getAllProducts)
  .post(
    "/admin/product/new",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    productController.createProduct
  );

router
  .route("/admin/product/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    productController.updateProduct
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    productController.deleteProduct
  );

router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.getAdminProduct
);
router.put(
  "/review",
  isAuthenticatedUser,
  productController.createProductReview
);

router
  .route("/reviews")
  .get(productController.getProductReviews)
  .delete(isAuthenticatedUser, productController.deleteProductReview);
router.get("/products/:id", productController.getProduct);

exports.productRouter = router;
