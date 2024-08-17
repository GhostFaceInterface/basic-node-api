const express = require('express');
const { deleteAgent, addAgent,updateAgent} = require('../controllers/agentController.js');
const protect = require('../middleware/authMiddleware.js'); // JWT doğrulama middleware'ini ekliyoruz

const router = express.Router();

router.delete('/:agent_id', protect, deleteAgent); // JWT korumalı DELETE isteği
router.post('/', protect, addAgent); // JWT korumalı POST isteği
router.put('/', protect, updateAgent); // JWT korumalı PUT isteği

module.exports = router;
