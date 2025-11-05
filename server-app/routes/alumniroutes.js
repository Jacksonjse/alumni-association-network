const express = require('express');
const router = express.Router();
const Alumni = require('../models/alumni');

// Insert record
router.post('/add', async (req, res) => {
    const alumni = new Alumni(req.body);
    await alumni.save();
    res.json({ message: "Record inserted" });
});

// Fetch all records
router.get('/', async (req, res) => {
    const data = await Alumni.find();
    res.json(data);
});

// Delete record
router.delete('/:id', async (req, res) => {
    await Alumni.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted" });
});

module.exports = router;
