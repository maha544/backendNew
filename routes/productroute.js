const express = require('express');
const productController = require('../controllers/productcontroller');
const upload = require('../config/upload'); 
const productmodel = require('../models/productmodel'); 
const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const imageUrl = req.file ? req.file.path : '';
    
  
    const newProduct = new productmodel({
      name,
      description,
      price,
      category,
      imageUrl  
    });

    const product = await newProduct.save();
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


router.get('/', productController.Get);


router.put('/:id', productController.Put);


router.delete('/:id', productController.Del);

module.exports = router;
