const express = require("express");
const router = express.Router();
const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getCartsByUser,
} = require("../..//controllers/cartController");

// CRUD operations
router.post("/", createCart); // Create a cart item
router.put("/:id", updateCart); // Update a cart item by ID
router.delete("/:id", deleteCart); // Delete a cart item by ID
router.get("/:id", getCart); // Get a cart item by ID
router.get("/user/:userId", getCartsByUser); // Get all cart items for a specific user

module.exports = router;
