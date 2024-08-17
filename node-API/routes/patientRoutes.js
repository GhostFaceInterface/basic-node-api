const express = require('express');
const { deletePatient, addPatient, updatePatient } = require('../controllers/patientController');
const protect = require('../middleware/authMiddleware'); // JWT doğrulama middleware'ini ekliyoruz

const router = express.Router();

router.delete('/:patient_id', protect, deletePatient); // JWT korumalı DELETE isteği
router.post('/', protect, addPatient); // JWT korumalı POST isteği
router.put('/', protect, updatePatient); // JWT korumalı PUT isteği
module.exports = router;
