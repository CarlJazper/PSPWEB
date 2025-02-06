const express = require("express");
const exerciseController = require("../controller/exerciseController");
const isAuthenticated = require("../middlewares/isAuth");
const upload = require('../utils/multer')

const router = express.Router();
router.post('/create-exercise', upload.array('image[]'), exerciseController.createExercise);
router.get('/get-exercise', exerciseController.getExercise);


module.exports = router;