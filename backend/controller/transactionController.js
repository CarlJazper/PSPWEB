const asyncHandler = require("express-async-handler");
const Transaction = require("../model/transaction");

const transactionController = {
    getAllTransactions: asyncHandler(async (req, res) => {
    try {
      const transactions = await Transaction.find()
      // console.log(exercise)
      res.status(201).json({ message: "Transactions fetch successfully", transactions });
    } catch (error) {
      console.error("Fetch All Transactions Error:", error.message);
      res.status(500).json({ message: "Fetch Transactions Error" });
    }
  }),
};
module.exports = transactionController;