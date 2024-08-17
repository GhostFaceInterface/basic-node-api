const express = require('express');
const { getDevicesByDoctor, deleteDevice, addDevice, updateDevice} = require('../controllers/deviceController');
const protect = require('../middleware/authMiddleware'); // JWT doğrulama middleware'ini ekliyoruz

const router = express.Router();

router.get('/:doctor_user_id', protect, getDevicesByDoctor); // JWT korumalı GET isteği
router.delete('/:device_id', protect, deleteDevice);
router.post('/', protect, addDevice);
router.put('/', protect, updateDevice);
module.exports = router;
