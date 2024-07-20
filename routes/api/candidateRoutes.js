const express = require('express');
const { addCandidate, getAllCandidates, getCandidate, updateCandidate, deleteCandidate } = require('../../controllers/candidateController');
const router = express.Router();

router.post('/', addCandidate);
router.get('/', getAllCandidates);
router.get('/:id', getCandidate);
router.put('/:id', updateCandidate);
router.delete('/:id', deleteCandidate);

module.exports = router;
