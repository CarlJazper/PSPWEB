const express = require('express');
const branchController = require('../controller/branchController');


const router = express.Router();
router.post("/create-branch", branchController.createBranch);
router.get('/get-branches', branchController.getBranches);


module.exports = router;