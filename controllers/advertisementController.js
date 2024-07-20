const Advertisement = require('../models/Advertisement');

exports.createAdvertisement = async (req, res) => {
  try {
    const advertisement = new Advertisement(req.body);
    const savedAdvertisement = await advertisement.save();
    res.status(201).json(savedAdvertisement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.find();
    res.json(advertisements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdvertisement = async (req, res) => {
  try {
    const advertisement = await Advertisement.findById(req.params.id);
    if (advertisement) {
      res.json(advertisement);
    } else {
      res.status(404).json({ message: "Advertisement not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAdvertisement = async (req, res) => {
  try {
    const updatedAdvertisement = await Advertisement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAdvertisement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAdvertisement = async (req, res) => {
  try {
    await Advertisement.findByIdAndDelete(req.params.id);
    res.json({ message: "Advertisement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
