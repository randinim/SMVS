import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const formatCardNumber = (cardNumber) => {
  return cardNumber.replace(/.(?=.{4})/g, "*");
};

const CartItem = ({ item, onUpdate, onRemove, onRemoveItem }) => {
  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      console.log(item.quantity - 1);
      onRemoveItem(item._id, item.quantity - 1);
    }
  };

  // Handler to increase the quantity
  const increaseQuantity = () => {
    onUpdate(item._id, item.quantity + 1);
  };

  return (
    <div className="flex justify-between items-center border-b py-4">
      <div className="flex items-center space-x-4">
        {/* Product details */}
        <div>
          <h3 className="text-lg font-semibold">{item.productId?.name}</h3>
          <p className="text-gray-500">Brand: {item.productId?.brand}</p>
          <p className="text-gray-500">
            Price: LKR{item.productId?.price.toFixed(2)}
          </p>
        </div>
      </div>

      <div>
        <button
          onClick={decreaseQuantity}
          className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
        >
          -
        </button>
        <input
          type="number"
          className="w-16 border text-center rounded-md"
          value={item.quantity}
          readOnly
        />
        <button
          onClick={increaseQuantity}
          className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
        >
          +
        </button>
      </div>
      {/* Item total price */}
      <div>
        <p className="font-semibold">{`LKR${(
          item.productId?.price ?? 0 * item.quantity
        ).toFixed(2)}`}</p>
      </div>
      {/* Remove button */}
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState("");

  // Form state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiration: "",
    ccv: "",
  });

  const fetchCartItems = async () => {
    try {
      const res = await axios.get(
        "/api/cart/user/" + localStorage.getItem("userId")
      );
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  const generatePDF = (details) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);

    // Customer Details
    doc.text(`Customer Name: ${details.customerName}`, 14, 42);
    doc.text(`Billing Address: ${details.billingAddress}`, 14, 52);
    doc.text(`Contact Number: ${details.contactNumber}`, 14, 62);

    // Table for Items
    autoTable(doc, {
      startY: 72,
      head: [["Item Name", "Price", "Quantity", "Amount"]],
      body: details.items.map((item) => [
        item.itemName,
        item.price.toFixed(2),
        item.quantity,
        item.amount.toFixed(2),
      ]),
      theme: "striped",
    });

    // Subtotal and Total
    let finalY = doc.lastAutoTable.finalY; // Get the final Y position from the table
    doc.text(`Subtotal: LKR${details.subtotal.toFixed(2)}`, 14, finalY + 10);
    doc.text(`Total: LKR${details.total.toFixed(2)}`, 14, finalY + 20);

    // Save the PDF
    doc.save("invoice.pdf");
  };

  const fetchCards = async () => {
    try {
      const res = await axios.get(
        "/api/cards/user/" + localStorage.getItem("userId")
      );
      setCards(res.data?.cards);
    } catch (err) {}
  };

  useEffect(() => {
    fetchCartItems();
    fetchCards();
  }, []);

  const handleUpdateItem = async (itemId, newQuantity) => {
    try {
      await axios.put("/api/cart/" + itemId, { quantity: newQuantity });

      await fetchCartItems();
    } catch (err) {
      console.error("Error updating cart item:", err);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete("/api/cart/" + itemId);
      await fetchCartItems();
    } catch (err) {
      console.error("Error removing cart item:", err);
    }
  };

  const calculateTotal = (items) => {
    return items?.reduce(
      (acc, item) => acc + (item.productId?.price ?? 0) * item.quantity,
      0
    );
  };

  useEffect(() => {
    if (cards.length > 0) {
      const firstCard = cards[0];
      setSelectedCardId(firstCard._id);
      setCardDetails({
        cardNumber: firstCard.cardNumber,
        nameOnCard: firstCard.nameOnCard,
        expiration: firstCard.expiration,
        ccv: firstCard.ccv,
      });
    }
  }, [cards]);
  const handleCardSelection = (e) => {
    const cardId = e.target.value;
    const card = cards.find((c) => c._id === cardId);
    if (card) {
      setSelectedCardId(cardId);
      setCardDetails({
        cardNumber: card.cardNumber,
        nameOnCard: card.nameOnCard,
        expiration: card.expiration,
        ccv: card.ccv,
      });
    }
  };

  //invoice

  const [invoiceDetails, setInvoiceDetails] = useState({
    customerName: "",
    billingAddress: "",
    contactNumber: "",
    items: [], // This will be populated with cartItems transformed into the required shape
    subtotal: 0,
    total: 0,
  });

  const totalCost = calculateTotal(cartItems);

  useEffect(() => {
    const invoiceItems = cartItems.map((item) => ({
      itemName: item.productId?.name,
      price: item.productId?.price,
      quantity: item.quantity,
      amount: (item.productId?.price ?? 0) * item.quantity,
    }));

    const newSubtotal = calculateTotal(cartItems);
    const newTotal = newSubtotal; // Add taxes, shipping costs, or discounts as needed

    setInvoiceDetails((prevDetails) => ({
      ...prevDetails,
      items: invoiceItems,
      subtotal: newSubtotal,
      total: newTotal,
    }));
  }, [cartItems]);

  // Handle form inputs for customer details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const submitInvoice = async () => {
    try {
      const response = await axios.post("/api/invoices", invoiceDetails);
      console.log("Invoice submitted successfully", response.data);
      alert("Invoice submitted successfully");
      generatePDF(invoiceDetails);
      setInvoiceDetails({
        customerName: "",
        billingAddress: "",
        contactNumber: "",
        items: [],
        subtotal: 0,
        total: 0,
      });
    } catch (error) {
      console.error("Error submitting invoice:", error);
      alert("Error submitting invoice");
    }
  };
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <Navbar />
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                {cartItems.length} Items
              </h2>
            </div>
            <div className="flex items-start justify-start mt-10 mb-5">
              <h3 className="font-semibold  text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Price
              </h3>
            </div>
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onUpdate={() => {
                  handleUpdateItem(item._id, item.quantity + 1);
                }}
                onRemoveItem={() => {
                  handleUpdateItem(item._id, item.quantity - 1);
                }}
                onRemove={() => {
                  handleRemoveItem(item._id);
                }}
              />
            ))}
          </div>

          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>LKR {totalCost}</span>
              </div>
              <div>
                <label
                  htmlFor="cardSelection"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select a card
                </label>
                <select
                  id="cardSelection"
                  value={selectedCardId}
                  onChange={handleCardSelection}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  {cards.map((card) => (
                    <option key={card._id} value={card._id}>
                      {formatCardNumber(card.cardNumber)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                {/* Customer Name */}
                <label
                  htmlFor="customerName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  placeholder="Customer Name"
                  onChange={handleInputChange}
                  className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={invoiceDetails.customerName}
                />

                {/* Billing Address */}
                <label
                  htmlFor="billingAddress"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Billing Address
                </label>
                <input
                  type="text"
                  id="billingAddress"
                  name="billingAddress"
                  placeholder="Billing Address"
                  onChange={handleInputChange}
                  className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={invoiceDetails.billingAddress}
                />

                {/* Contact Number */}
                <label
                  htmlFor="contactNumber"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Contact Number"
                  onChange={handleInputChange}
                  className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={invoiceDetails.contactNumber}
                />

                {/* Issued Date - if you need to allow users to change this, otherwise it should be set programmatically */}
                {/* The component assumes that `issuedDate` is being handled internally and is not shown here. */}

                {/* Subtotal - Calculated from Cart Items */}
                <label
                  htmlFor="subtotal"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Subtotal
                </label>
                <input
                  type="text"
                  id="subtotal"
                  name="subtotal"
                  readOnly
                  className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={invoiceDetails.subtotal.toFixed(2)}
                />

                {/* Total - Calculated from Cart Items */}
                <label
                  htmlFor="total"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Total
                </label>
                <input
                  type="text"
                  id="total"
                  name="total"
                  readOnly
                  className="bg-gray-50 border mb-8 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={invoiceDetails.total.toFixed(2)}
                />
              </div>

              <button
                onClick={submitInvoice}
                className="text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 :bg-primary-600 :hover:bg-primary-700 focus:outline-none :focus:ring-primary-800"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
