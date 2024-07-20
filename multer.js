const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/", // Folder for uploaded PDFs
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate unique filename
  },
});

const upload = multer({ storage });
