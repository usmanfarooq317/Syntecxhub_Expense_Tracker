const mongoose = require('mongoose');


const incomeSchema = new mongoose.Schema({
title: String,
amount: Number,
userId: mongoose.Schema.Types.ObjectId
});


module.exports = mongoose.model('Income', incomeSchema);