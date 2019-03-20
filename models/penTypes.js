const mongoose = require('mongoose');

const PenTypeSchema = mongoose.Schema({
    name: String,
	allowedColors: [String],
	maxLines: Number,
	maxCharsPerLine: Number,
	inStock: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('penTypes', PenTypeSchema);