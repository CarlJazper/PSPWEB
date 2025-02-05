const asyncHandler = require("express-async-handler");
const Branch = require("../model/branch");

const branchController = {
  createBranch: asyncHandler(async (req, res) => {
    try {
      const { name, email, contact, place } = req.body;
      let branch = new Branch({
        name,
        email,
        contact,
        place,
      });

      branch = await branch.save();

      return res.status(201).json({
        success: true,
        message: 'Branch Created Successfully',
        branch
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Error in Creating Branch',
        error: error.message
      });
    }
  }),
  getBranches: asyncHandler(async (req, res) => {
    try {
      const branch = await Branch.find()
      // console.log(exercise)
      res.status(201).json({ message: "Branch fetch successfully", branch });
    } catch (error) {
      console.error("Fetch All Branch Error:", error.message);
      res.status(500).json({ message: "Create Branch Error" });
    }
  }),
};
module.exports = branchController;