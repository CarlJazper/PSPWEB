// const mongoose = require("mongoose");
// const Logs = require("../model/logs");

// const logsController = {
//  getAllLogs: async (req, res) => {
//         try {
//             const logs = await Logs.find().populate("userId", "name image");
//             // console.log(exercise)
//             res.status(201).json({ message: "Logs fetch successfully", logs });
//         } catch (error) {
//             console.error("Fetch All Logs Error:", error.message);
//             res.status(500).json({ message: "Fetch Logs Error" });
//         }
//     },
// };
// module.exports = logsController;
const moment = require('moment-timezone');
const mongoose = require("mongoose");
const Logs = require("../model/logs");

const logsController = {
    getAllLogs: async (req, res) => {
        try {
            // Use the Philippine timezone
            const timezone = 'Asia/Manila';
            const today = moment.tz(timezone).startOf('day');
            const tomorrow = moment.tz(timezone).startOf('day').add(1, 'day');

            const logs = await Logs.find({
                date: {
                    $gte: today.toDate(),
                    $lt: tomorrow.toDate(),
                },
            }).populate("userId", "name image");

            res.status(201).json({ message: "Logs fetched successfully", logs });
        } catch (error) {
            console.error("Fetch All Logs Error:", error.message);
            res.status(500).json({ message: "Fetch Logs Error" });
        }
    },
};

module.exports = logsController;
