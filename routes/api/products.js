// const express = require('express');
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const config = require("config");

// const Product = require("../../models/product");

// // @route GET api/products
// // @desc Test route
// // @access Public

// http://localhost:8070/product/add

// //add product

// router.route("/add").post((req,res)=>{
//     const name = req.body.name;
//     const brand = req.body.brand;
//     const model = req.body.model;
//     const description = req.body.description;
//     const price = Number(req.body.price);
//     const stock = Number(req.body.stock);

//     const newProduct = new Product({
//         name,
//         brand,
//         model,
//         description,
//         price,
//         stock
//     })
//     newStudent.save().then(()=>{
//         res.json("Product Added Successfully !")
//     }).catch((err)=>{
//         console.log(err);
//     })
// })

// //display products

// router.route("/").get((req,res)=>{
//     product.find().then((products)=>{
//         res.json(products)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

// //update product

// http://localhost:8070/student/update
// router.route("/update/:id").put(async (req,res)=> {
//     let productId = req.params.id;
//     const {name, brand, model, description, price, stock} = req.body;

//     const updateProduct = {
//         name,
//         brand,
//         model,
//         description,
//         price,
//         stock
//     }
//     const update = await product.findByIdAndUpdate(productId, updateProduct).then(()=>{
//         res.status(200).send({status: "product updated", user: update})
//     }).catch((err)=>{
//         console.log(err);
//         res.status(500).send({status: "Error with updating data", error: err.message});
//     })
// })

// //delete

// router.route("/delete/:id").delete(async (req,res) => {
//     let productId = req.params.id;

//     await product.findByIdAndDelete(productId).then(()=>{
//         res.status(200).send({status: "Product deleted"})
//     }).catch((err)=>{
//         console.log(err.message);
//         res.status(500).send({status: "error with delete product", error: err.message});
//     })
// })

// // router.get('/', (req, res) => res.send('Products route'));
// // [
// //     check("name", "Product name is required!").not().isEmpty(),
// //     check("brand", "Product brand is required!").not().isEmpty(),
// //     check("model","Pro duct model is required!").not().isEmpty(),
// //     check("description","Product description is required!").not().isEmpty(),
// //     check("price","Product price is required!").not().isEmpty(),
// // ],

// module.exports = router;

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Product = require("../../models/product");
const product = require("../../models/product");

// @route   POST api/products/add
// @desc    Add a new product
// @access  Public
router.post(
  "/add",
  [
    check("name", "Product name is required").not().isEmpty(),
    check("brand", "Product brand is required").not().isEmpty(),
    check("model", "Product model is required").not().isEmpty(),
    check("description", "Product description is required").not().isEmpty(),
    check("price", "Product price must be a number").isNumeric(),
    check("stock", "Product stock must be a number").isNumeric(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, brand, model, description, price, stock } = req.body;

      const newProduct = new Product({
        name,
        brand,
        model,
        description,
        price,
        stock,
      });

      await newProduct.save();
      res.json({ message: "Product added successfully", product: newProduct });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//get single product from the database

router.get("/get/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      // If product with the given ID is not found
      return res.status(404).json({ status: "Product not found" });
    }

    // If product is found, return it in the response
    res.status(200).json({ status: "Product Fetched", product: product });
  } catch (err) {
    // Handle errors during product retrieval
    console.error(err.message);
    res.status(500).json({ status: "Error with getting product" });
  }
});

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/products/update/:id
// @desc    Update a product by ID
// @access  Public
router.put("/update/:id", async (req, res) => {
  try {
    const { name, brand, model, description, price, stock } = req.body;
    const productId = req.params.id;

    const updatedProduct = {
      name,
      brand,
      model,
      description,
      price,
      stock,
    };

    const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/products/delete/:id
// @desc    Delete a product by ID
// @access  Public
router.delete("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/products/feedback
// @desc    PUT a product feedback
// @access  Private

router.put(
  "/feedback/:id",
  [
    [
      check("userName", "Name is required").not().isEmpty(),
      check("email", "Email is required").not().isEmpty(),
      check("comment", "Feedback is required").not().isEmpty(),
      check("rating", "Rating is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const pID = req.params.id;

    const { userName, email, comment, rating } = req.body;

    const newFeedback = {
      userName,
      email,
      comment,
      rating,
    };

    try {
      const product = await Product.findById(pID);

      product.feedback.unshift(newFeedback);

      await product.save();

      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!!");
    }
  }
);

// @route   DELETE api/products/:p_ID/feedback:fb_id
// @desc    Delete a product feedback
// @access  Private
router.delete("/feedback/:p_ID/:fb_id", async (req, res) => {
  const pID = req.params.p_ID;

  try {
    const product = await Product.findById(pID);

    // Get remove index of feedback
    const removeIndex = product.feedback
      .map((item) => item.id)
      .indexOf(req.params.fb_id);

    product.feedback.splice(removeIndex, 1);
    await product.save();

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
