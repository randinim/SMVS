const express = require('express');
const { createAdvertisement, getAllAdvertisements, getAdvertisement, updateAdvertisement, deleteAdvertisement } = require('../../controllers/advertisementController');
const router = express.Router();

router.post('/', createAdvertisement);
router.get('/', getAllAdvertisements);
router.get('/:id', getAdvertisement);
router.put('/:id', updateAdvertisement);
router.delete('/:id', deleteAdvertisement);

module.exports = router;
