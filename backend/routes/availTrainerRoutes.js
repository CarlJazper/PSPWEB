const express = require('express');
const router = express.Router();
const availTrainerController = require('../controller/availTrainerController');

router.post('/create-trainer', availTrainerController.createTrainer);
router.get('/get-all-trainers', availTrainerController.getAllTrainers);
router.get('/get-trainer/:id', availTrainerController.getTrainerById);
router.put('/update-trainer/:id', availTrainerController.updateTrainer);
router.delete('/delete-trainer/:id', availTrainerController.deleteTrainer);
router.post('/avail-trainer-payment-intent', availTrainerController.createPaymentIntent);
router.get('/coach/:id', availTrainerController.getByAssignedCoach);
router.get('/client/:id', availTrainerController.getClientsAvailedServices);
router.put('/update/session/:id', availTrainerController.updateSessionSchedule);
router.put('/cancel/session/:id', availTrainerController.cancelSessionSchedule);
router.put('/complete/session/:id', availTrainerController.completeSessionSchedule);
router.get('/has-active/:id', availTrainerController.hasActiveTraining);

module.exports = router;