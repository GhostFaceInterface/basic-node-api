const express = require('express');
const {fetchDoctorDetails, deleteDoctor, addDoctor, updateDoctor} = require('../controllers/doctorController.js');
const protect = require('../middleware/authMiddleware.js');
const router = express.Router();

router.get('/details',protect,fetchDoctorDetails);
router.delete('/:doctor_id', protect, deleteDoctor);
router.post('/', protect, addDoctor);
router.put('/', protect, updateDoctor);

module.exports = router;