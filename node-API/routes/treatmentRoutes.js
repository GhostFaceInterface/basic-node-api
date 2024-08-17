const express = require('express');
const { getTreatmentByPatient, deleteTreatment,addTreatment, updateTreatment } = require('../controllers/treatmentController.js');
const protect = require('../middleware/authMiddleware.js');

const router = express.Router();
router.get('/:patient_id',protect,getTreatmentByPatient);
router.delete('/:treatment_id', protect, deleteTreatment);
router.post('/', protect, addTreatment);
router.put('/', protect, updateTreatment);

module.exports = router;
