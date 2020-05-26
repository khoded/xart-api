const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

// MULTER for upload image
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    );
  }
});

// filefilter for the type of images
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    // store a file
    cb(null, true);
  } else {
    // reject a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const ProductController = require('../controllers/products');

// GET - Retrieve all productsm
// Be accessable publicly
router.get('/', ProductController.products_get_all);

// POST - Add a product
// Be route protected
router.post(
  '/',
  checkAuth,
  upload.single('productImage'),
  ProductController.products_create_product
);

// GET - Retrieve a product
router.get('/:productId', ProductController.products_get_product);

// PATCH - Update a product
router.patch(
  '/:productId',
  checkAuth,
  ProductController.products_update_product
);

// DELETE - Delete a product
router.delete(
  '/:productId',
  checkAuth,
  ProductController.products_delete_product
);

module.exports = router;
