const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Initializing 10 users if they don't exist 
router.post('/initialize-users', async (req, res) => {
    try {
        const initialUsers = ["Rahul", "Kamal", "Sanak", "Priya", "Amit", "Sneha", "Rajesh", "Pooja", "Vikas", "Anjali"]; // Example users [cite: 15]
        for (const userName of initialUsers) {
            await User.findOneAndUpdate(
                { name: userName },
                { $setOnInsert: { name: userName, points: 0 } },
                { upsert: true, new: true }
            );
        }
        res.status(200).json({ message: 'Users initialized successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all users and their rankings [cite: 12, 23]
router.get('/leaderboard', async (req, res) => {
    try {
        const users = await User.find().sort({ points: -1 }); // Sort by points in descending order [cite: 23]
        const rankedUsers = users.map((user, index) => ({
            _id: user._id,
            name: user.name,
            points: user.points,
            rank: index + 1
        }));
        res.json(rankedUsers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Claim points for a user [cite: 8, 20, 21]
router.post('/claim-points/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const randomPoints = Math.floor(Math.random() * 10) + 1; // Random points from 1 to 10 [cite: 8, 20, 21, 22]
        user.points += randomPoints;
        await user.save();

        // Create claim history [cite: 10, 11, 41]
        const claimHistory = new ClaimHistory({
            userId: user._id,
            pointsClaimed: randomPoints
        });
        await claimHistory.save();

        res.json({ message: 'Points claimed successfully', user, pointsAwarded: randomPoints });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new user 
router.post('/add-user', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'User name is required' });
        }

        const existingUser = await User.findOne({ name: name });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this name already exists' });
        }

        const newUser = new User({ name, points: 0 });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;