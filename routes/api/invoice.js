const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const invoiceModle = require("../../models/Invoice");
const Invoice = require("../../models/Invoice");

// @route POST api/cardpayment
// Route to create a new card
router.post("/", async (req, res) => {
  try {
    const {
      invoiceId,
      customerName,
      billingAddress,
      issuedDate,
      contactNumber,
      items,
      subtotal,
      total,
    } = req.body;
    const { itemName, price, quantity, amount } = items;

    // Create a new card payment object
    const newInvoice = new Invoice({
      invoiceId,
      customerName,
      billingAddress,
      issuedDate,
      contactNumber,
      items: {
        itemName,
        price,
        quantity,
        amount,
      },
      subtotal,
      total,
    });

    // Save the card payment details to the database
    await newInvoice.save();

    res
      .status(201)
      .json({ message: "Invoice created successfully!", invoice: newInvoice });
  } catch (err) {
    if (
      err.code === 11000 &&
      err.keyPattern &&
      err.keyPattern.invoiceId === 1
    ) {
      // Duplicate key error for invoiceId
      return res.status(400).json({ message: "Invoice ID already exists" });
    }
    console.error(err);
    res.status(500).json({ message: "Can't issue Invoice" });
  }
});
// Route to delete an invoice by ID
router.delete("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    await invoice.remove();
    res.json({ message: "Invoice deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Can't delete Invoice" });
  }
});

// @route   GET api/invoices
// @desc    Get all invoices
// @access  Private
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ date: -1 });
    res.json(invoices);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
