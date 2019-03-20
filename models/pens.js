const mongoose = require('mongoose');

const PenSchema = mongoose.Schema({
    typeId: String,
	type: String,
	color: String,
	monogram: String,
	quantity: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('pens', PenSchema);