const mongoose = require('mongoose');

const LineItemSchema = mongoose.Schema({
    itemId: String,
	purchaseOrderId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('lineItems', LineItemSchema);