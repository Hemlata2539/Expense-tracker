const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const protect = require('../middleware/authMiddleware');

// All routes below require a valid login
router.use(protect);

// CREATE a new expense
router.post('/', async (req, res) => {
  try {
    const { amount, category, note, date } = req.body;

    const expense = await Expense.create({
      user: req.userId,
      amount,
      category,
      note,
      date,
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET all expenses for the logged-in user
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// UPDATE an expense
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.userId });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { amount, category, note, date } = req.body;
    expense.amount = amount ?? expense.amount;
    expense.category = category ?? expense.category;
    expense.note = note ?? expense.note;
    expense.date = date ?? expense.date;

    const updated = await expense.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE an expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;