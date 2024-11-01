// controllers/reportingController.js
const Expense = require('../models/expenseModel');
const User = require('../models/userModel');
const moment = require('moment');

// Admin report
const getAdminReport = async (req, res) => {
  try {
    const currentMonth = moment().startOf('month');
    const userCount = await User.countDocuments();
    const expenses = await Expense.find({ date: { $gte: currentMonth } });
    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const averageExpense = totalExpense / userCount;

    res.status(200).json({ userCount, totalExpense, averageExpense });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching report', error });
  }
};

// User report
const getUserReport = async (req, res) => {
  try {
    const userId = req.body.userId;
    const currentMonth = moment().startOf('month');
    const expenses = await Expense.find({ userId, date: { $gte: currentMonth } });
    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const averageExpense = totalExpense / expenses.length;

    res.status(200).json({ totalExpense, averageExpense });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching report', error });
  }
};

// Filtered expenses
const getFilteredExpenses = async (req, res) => {
  try {
    const { userId, expenseName, amount, location, fromDate, toDate } = req.body;
    const filters = { ...(userId && { userId }) };

    if (expenseName) filters.expenseName = new RegExp(expenseName, 'i');
    if (amount) filters.amount = amount;
    if (location) filters.location = new RegExp(location, 'i');
    if (fromDate && toDate) {
      filters.date = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    }

    const expenses = await Expense.find(filters);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching filtered expenses', error });
  }
};

module.exports = { getAdminReport, getUserReport, getFilteredExpenses };
