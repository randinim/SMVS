require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware");
const cartRoutes = require("./routes/api/cartRoutes");
const invoiceRoutes = require("./routes/api/invoice");
const app = express();
app.use(cors()); // Use this after the variable declaration

// Connect MongoDB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

// Define Routes

//Maleen
app.use("/api/vehicleOwner", require("./routes/api/vehicleOwner"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

app.use("/api/products", require("./routes/api/products"));
app.use("/api/inquiries", require("./routes/api/inquiries"));
app.use("/api/cardpayments", require("./routes/api/cardpayments"));
app.use("/api/invoice", require("./routes/api/invoice"));
app.use("/api/cards", require("./routes/api/card"));
app.use("/api/rentalVehicles", require("./routes/api/rentalVehicles"));

//chamiG
app.use("/api/jobs", require("./routes/api/jobRoutes"));
app.use("/api/candidates", require("./routes/api/candidateRoutes"));
app.use("/api/advertisements", require("./routes/api/advertisementRoutes"));

//savinda
app.use("/api/reservation", require("./routes/api/reservation"));
//app.use('/api/serviceCenter', require('./routes/api/serviceCenter'));

//randi
app.use("/api/cart", cartRoutes);
app.use("/api/invoices", invoiceRoutes);

app.use(
  "/api/rentalVehicleReport",
  require("./routes/api/rentalVehicleReport")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
