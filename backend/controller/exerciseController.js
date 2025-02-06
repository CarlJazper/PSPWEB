const { cloudinary, secretKey } = require('../config/cloudinaryConfig')
const asyncHandler = require("express-async-handler");
const Exercise = require("../model/exercise");

const exerciseController = {
    createExercise: async (req, res) => {
        try {
            const { name, type, targetMuscle, equipmentUsed, difficulty, instructions } = req.body;

            const images = req.files;

            // console.log(req.body)
            // console.log(req.files)

            let imageData = []

            for (let i = 0; i < images.length; i++) {
                const imagePath = images[i].path;
                try {
                    const result = await cloudinary.uploader.upload(imagePath, {
                        folder: 'PSPCloudinaryData/exercises',
                        width: 150,
                        crop: 'scale'
                    });
                    // console.log('These are the uploaded images:', result);
                    imageData.push({ public_id: result.public_id, url: result.secure_url });
                } catch (error) {
                    console.log(error.message);
                }
            }

            // console.log(imageData)

            const exercise = new Exercise({
                name,
                type,
                targetMuscle,
                equipmentUsed,
                difficulty,
                instructions,
                image: imageData,
            });

            console.log('This is the exercise', exercise)

            // await exercise.save();

            res.status(201).json({
                message: "Exercise created successfully",
                exercise
            });
        } catch (error) {
            console.error("Create Exercise Error:", error);
            res.status(500).json({ message: "Create Exercise Error" });
        }
    },
    getExercise: async (req, res) => {
        try {
            const exercises = await Exercise.find()
            // console.log(exercise)
            res.status(201).json({ message: "Exercise fetch successfully", exercises });
        } catch (error) {
            console.error("Fetch All Exercise Error:", error.message);
            res.status(500).json({ message: "Create Exercise Error" });
        }
    },
};
module.exports = exerciseController;