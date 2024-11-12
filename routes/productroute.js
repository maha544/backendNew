const express = require('express');
const productController = require('../controllers/productcontroller');
const upload = require('../config/upload');  // Multer middleware to handle file uploads
const productmodel = require('../models/productmodel');  // Your product model
const router = express.Router();

// POST route to create a product with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const imageUrl = req.file ? req.file.path : '';  // Save the file path if uploaded
    
    // Create a new product with the details and image URL
    const newProduct = new productmodel({
      name,
      description,
      price,
      category,
      imageUrl  // Store the image file path or URL
    });

    const product = await newProduct.save();  // Save the product to the database
    res.status(201).send({
      isSuccessful: true,
      data: product
    });
  } catch (err) {
    res.status(400).send({
      isSuccessful: false,
      message: 'Error creating product',
      error: err.message
    });
  }
});

// GET all products route
router.get('/', productController.Get);

// PUT (update) product route
router.put('/:id', productController.Put);

// DELETE product route
router.delete('/:id', productController.Del);

module.exports = router;
