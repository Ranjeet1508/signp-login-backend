const { Router } = require("express");
const { FeeModel } = require('../Models/feeModel')
const feeRouter = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Route to get all fee structures
feeRouter.get('/', async (req, res) => {
    try {
        const feeData = await FeeModel.find(); // Get all fee structures
        res.status(200).json(feeData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


// Route to update or add fee structures
feeRouter.put('/', async (req, res) => {
    const feeUpdates = req.body; // Expecting an array of fee structures

    try {
        // Loop through each fee structure and update or add if it doesn't exist
        for (const fee of feeUpdates) {
            const { timing, fees, availability } = fee;
            await FeeModel.findOneAndUpdate(
                { timing }, // Find based on timing
                { fees, availability }, // Update the fee and availability
                { upsert: true, new: true } // Upsert: true creates a new entry if it doesn't exist
            );
        }
        res.status(200).json({ message: 'Fees updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating fees', error });
    }
});


module.exports = {
    feeRouter
}

