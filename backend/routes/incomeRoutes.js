const router = require('express').Router();
const Income = require('../models/Income');
const auth = require('../middleware/authMiddleware');


router.get('/', auth, async (req, res) => {
res.json(await Income.find({ userId: req.user }));
});


router.post('/', auth, async (req, res) => {
res.json(await Income.create({ ...req.body, userId: req.user }));
});


router.delete('/:id', auth, async (req, res) => {
await Income.findByIdAndDelete(req.params.id);
res.json({ msg: 'Deleted' });
});


module.exports = router;