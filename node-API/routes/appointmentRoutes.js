const express = require('express');
const { deleteAppointment, addAppointment,updateAppointment } = require('../controllers/appointmentController');
const protect = require('../middleware/authMiddleware'); // JWT doğrulama middleware'ini ekliyoruz

const router = express.Router();

router.delete('/:appointment_id', protect, deleteAppointment); // JWT korumalı DELETE isteği
router.post('/', protect, addAppointment); // JWT korumalı POST isteği
router.put('/', protect, updateAppointment); // JWT korumalı PUT isteği

module.exports = router;
