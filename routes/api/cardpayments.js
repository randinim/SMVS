const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const CardPaymentModle = require("../../models/CardPayment");
const CardPayment = require("../../models/CardPayment");

// @route POST api/cardpayment
// Route to create a new card
router.post("/", async (req, res) => {
  try {
    const { amount, order, address } = req.body;
    const { orderId, nameOnCard, cardNumber, month, year, ccv } = order;

    // Construct expiration string in the format "MM/YY"
    const expiration = `${month.toString().padStart(2, "0")}/${year
      .toString()
      .slice(-2)}`;

    // Mask the credit card number
    const maskedCardNumber = maskCreditCard(cardNumber);

    // Determine card type
    const cardType = getCardType(cardNumber);

    // Create a new card payment object
    const newCardPayment = new CardPayment({
      amount,
      order: {
        // Include order object directly
        cardType,
        nameOnCard,
        cardNumber: maskedCardNumber,
        expiration,
        ccv,
      },
      address,
    });

    // Save the card payment details to the database
    await newCardPayment.save();

    res
      .status(201)
      .json({ message: "Payment successful!", card: newCardPayment });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Payment Failed!. Please contact support." });
  }
});

// // Route to update a card
// router.put("/:id", async (req, res) => {
//   try {
//     const {amount,cardType, nameOnCard, cardNumber, expiration, ccv } = req.body;
//     const cardId = req.params.id;

//     // Find the card by ID
//     const card = await Card.findById(cardId);

//     if (!card) {
//       return res.status(404).json({ message: "Card not found" });
//     }

//     // Update card fields
//     card.nameOnCard = nameOnCard;
//     card.cardNumber = cardNumber;
//     card.expiration = expiration;
//     card.ccv = ccv;

//     // Save the updated card to the database
//     await card.save();

//     res.json({ message: "Card updated successfully", card });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });
// Route to delete a card
router.delete("/:id", async (req, res) => {
  try {
    const cardId = req.params.id;

    // Find the card by ID and delete it
    const deletedCard = await CardPayment.findByIdAndDelete(Id);

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json({ message: "Card deleted successfully", card: deletedCard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Function to determine card type based on card number
function getCardType(cardNumber) {
  // Regular expressions for different card types
  const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const mastercardRegex = /^5[1-5][0-9]{14}$/;

  // Check card number against regular expressions
  if (visaRegex.test(cardNumber)) {
    return "Visa";
  } else if (mastercardRegex.test(cardNumber)) {
    return "Mastercard";
  } else {
    return "Other";
  }
}

// Function to mask the credit card number
function maskCreditCard(cardNumber) {
  const visibleDigits = 4; // Number of visible digits at the beginning and end
  const maskedDigits = cardNumber.length - 2 * visibleDigits; // Number of masked digits
  const maskedPart = "*".repeat(maskedDigits); // Create a string of asterisks with the same length as masked digits
  const visiblePart =
    cardNumber.substring(0, visibleDigits) +
    maskedPart +
    cardNumber.substring(cardNumber.length - visibleDigits);
  return visiblePart;
}

module.exports = router;
