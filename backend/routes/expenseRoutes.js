const router = require('express').Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, async (req, res) => {
  res.json(await Expense.find({ userId: req.user }));
});

router.post('/', auth, async (req, res) => {
  res.json(await Expense.create({ ...req.body, userId: req.user }));
});

router.delete('/:id', auth, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

module.exports = router;
