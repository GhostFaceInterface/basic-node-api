const express = require('express');
const { getUserRole, fetchUserDetails } = require('../controllers/userController.js');
const protect = require('../middleware/authMiddleware.js'); 

const router = express.Router();
router.get('/role/:auth_id',protect,getUserRole); // JWT korumalı GET isteği
router.get('/details/:user_type',protect,fetchUserDetails); // http://localhost:5000/api/user/details/Doctor (örneğin)


module.exports = router; // router nesnesini dışa aktarıyoruz