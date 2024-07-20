const Cart = require("../models/Cart");

// Create a new cart item
exports.createCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a cart item
exports.updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a cart item
exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart item deleted successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a cart by ID
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id)
      .populate("userId")
      .populate("productId");
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all carts by User ID
exports.getCartsByUser = async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.params.userId })
      .populate("userId")
      .populate("productId");
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
};
