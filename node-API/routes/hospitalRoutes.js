const express = require('express');
const { getHospitalDevices,getHospitalDoctors,getPatientByHospitalId,deleteHospital, addHospital, updateHospital } = require('../controllers/hospitalController.js');
const protect = require('../middleware/authMiddleware.js');

const router = express.Router();
router.get('/devices/:hospital_id',protect,getHospitalDevices); 
router.get('/doctors/:hospital_id',protect,getHospitalDoctors);
router.get('/patients/:hospital_id',protect,getPatientByHospitalId);
router.delete('/:hospital_id', protect, deleteHospital); 
router.post('/', protect, addHospital);
router.put('/', protect, updateHospital);
module.exports = router; 