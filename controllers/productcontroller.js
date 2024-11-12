const productmodel = require("../models/productmodel");

const ProductController = {

  Get: async (req, res) => {
    try {
      const result = await productmodel.find();
      res.status(200).send({
        isSuccessful: true,
        data: result
      });
    } catch (error) {
      res.status(500).send({
        isSuccessful: false,
        data: null,
        message: 'Server Error'
      });
    }
  },


  Post: async (req, res) => {
    const { name, description, price, category } = req.body;

    const newProduct = new productmodel({
      name,
      description,
      price,
      category
    });

    try {
      const result = await newProduct.save();
      res.status(201).send({
        isSuccessful: true,
        data: result
      });
    } catch (err) {
      res.status(400).send({
        isSuccessful: false,
        data: null,
        message: 'Error adding product'
      });
    }
  },


  Put: async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    try {
      const updatedProduct = await productmodel.findByIdAndUpdate(id, {
        name,
        description,
        price,
        category
      }, { new: true });

      if (!updatedProduct) {
        return res.status(404).send({
          isSuccessful: false,
          data: null,
          message: "Product not found"
        });
      }

      res.status(200).send({
        isSuccessful: true,
        data: updatedProduct,
        message: "Product updated successfully"
      });
    } catch (error) {
      res.status(500).send({
        isSuccessful: false,
        data: null,
        message: 'Error updating product'
      });
    }
  },

  
  Del: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedProduct = await productmodel.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).send({
          isSuccessful: false,
          data: null,
          message: "Product not found"
        });
      }

      res.status(200).send({
        isSuccessful: true,
        data: deletedProduct,
        message: "Product deleted successfully"
      });
    } catch (error) {
      res.status(500).send({
        isSuccessful: false,
        data: null,
        message: 'Error deleting product'
      });
    }
  }
};

module.exports = ProductController;
