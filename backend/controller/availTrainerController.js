const AvailTrainer = require('../model/availTrainer');
const User = require('../model/user')
const stripe = require('stripe')(process.env.STRIPE_SECRET);

// Create payment intent
exports.createPaymentIntent = async (req, res) => {
    try {
        const { amount, userId } = req.body;
        // Create the payment intent 
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const customerId = user.stripeCustomerId;
            // console.log(customerId)

            if (!customerId) {
                return res.status(400).json({ message: 'No Stripe customer ID found for this user' });
            }
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100,
                currency: 'php',
                customer: customerId,
            });
            res.send({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            console.error('Error creating payment intent:', error);
            res.status(500).json({ message: 'Error creating payment intent', error: error.message });
        }
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ message: 'Error creating payment intent' });
    }
};

// Create a new trainer
exports.createTrainer = async (req, res) => {
    try {

        req.body.schedule = [];
        for (let i = 0; i < req.body.sessions; i++) {

            req.body.schedule.push({
                index: i + 1,
                dateAssigned: null, // Placeholder for date
                timeAssigned: null, // Placeholder for time
                status: 'pending',
            });

        }

        const trainer = new AvailTrainer(req.body);

        await trainer.save();

        res.status(201).json({ message: 'Trainer created successfully', trainer });

    } catch (error) {
        res.status(400).json({ message: 'Error creating trainer', error: error.message });
    }
};

// Get all trainers
exports.getAllTrainers = async (req, res) => {
    try {
        const trainers = await AvailTrainer.find().populate({
            path: 'userId',
            model: 'users'
        }).populate({
            path: 'coachID',
            model: 'users'
        })
        res.status(200).json(trainers);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching trainers', error: error.message });
    }
};

// Get a specific trainer by ID
exports.getTrainerById = async (req, res) => {
    try {
        const trainer = await AvailTrainer.findById(req.params.id).populate({
            path: 'userId',
            model: 'users'
        }).populate({
            path: 'coachID',
            model: 'users'
        })
        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }
        res.status(200).json(trainer);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trainer', error: error.message });
    }
};

// Update a trainer by ID
exports.updateTrainer = async (req, res) => {
    try {
        const trainer = await AvailTrainer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }
        res.status(200).json({ message: 'Trainer updated successfully', trainer });
    } catch (error) {
        res.status(400).json({ message: 'Error updating trainer', error: error.message });
    }
};

// Delete a trainer by ID
exports.deleteTrainer = async (req, res) => {
    try {
        const trainer = await AvailTrainer.findByIdAndDelete(req.params.id);
        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }
        res.status(200).json({ message: 'Trainer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting trainer', error: error.message });
    }
};

exports.getByAssignedCoach = async (req, res,) => {

    try {
        const trainers = await AvailTrainer.find({ coachID: req.params.id }).populate({
            path: 'userId',
            model: 'users'
        }).populate({
            path: 'coachID',
            model: 'users'
        })

        // console.log(trainers)

        res.status(200).json(trainers);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching trainers', error: error.message });
    }

}

exports.getClientsAvailedServices = async (req, res,) => {

    try {
        // console.log(req.params)

        const trainers = await AvailTrainer.find({ userId: req.params.id }).populate({
            path: 'userId',
            model: 'users'
        }).populate({
            path: 'coachID',
            model: 'users'
        })

        // console.log(trainers)

        res.status(200).json(trainers);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching trainers', error: error.message });
    }

}

exports.updateSessionSchedule = async (req, res,) => {

    try {
        const servicesAvailed = await AvailTrainer.findById(req.params.id);

        servicesAvailed.schedule = servicesAvailed.schedule.map(session => {
            if (session._id.toString() === req.query.sessionId) {
                return {
                    ...session._doc,  // Ensures document properties are spread correctly
                    dateAssigned: req.body.date,
                    timeAssigned: req.body.time,
                    status: 'waiting',
                };
            }
            return session;
        });

        await servicesAvailed.save();

        res.status(200).json({
            message: "Session schedule updated",
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching trainers', error: error.message });
    }

}

exports.cancelSessionSchedule = async (req, res,) => {

    try {
        const servicesAvailed = await AvailTrainer.findById(req.params.id);

        servicesAvailed.schedule = servicesAvailed.schedule.map(session => {
            if (session._id.toString() === req.query.sessionId) {
                return {
                    ...session._doc,  // Ensures document properties are spread correctly
                    dateAssigned: null,
                    timeAssigned: null,
                    status: 'pending',
                };
            }
            return session;
        });

        await servicesAvailed.save();

        res.status(200).json({
            message: "Session schedule cancelled",
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching trainers', error: error.message });
    }

}

exports.completeSessionSchedule = async (req, res,) => {

    try {
        const servicesAvailed = await AvailTrainer.findById(req.params.id);

        servicesAvailed.schedule = servicesAvailed.schedule.map(session => {
            if (session._id.toString() === req.query.sessionId) {
                return {
                    ...session._doc,  // Ensures document properties are spread correctly
                    status: 'completed',
                };
            }
            return session;
        });

        await servicesAvailed.save();

        res.status(200).json({
            message: "Session completed",
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching trainers', error: error.message });
    }

}

exports.hasActiveTraining = async (req, res) => {
    try {

        const trainer = await AvailTrainer.findOne({ userId: req.params.id, status: 'active' });
        // console.log("Trainer found:", trainer);

        if (trainer) {
            return res.status(200).json({
                message: 'User has active training',
                training: trainer,
                hasActive: true,
            });
        }

        return res.status(404).json({ message: 'User does not have active training', hasActive: false });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'System failure, please try again later',
            error: err.message
        });
    }
}