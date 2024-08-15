const connection = require('../database/connections');
const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');
const ScheduleController = require('../controllers/ScheduleController');
const AuthController = require('../controllers/AuthController');

router.get('/clients', ClientController.index);
router.post('/clients', ClientController.create);
router.delete('/clients/:id', ClientController.delete);

router.get('/schedule', ScheduleController.index);
router.post('/schedule', ScheduleController.create);
router.delete('/schedule/:id', ScheduleController.delete);

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
