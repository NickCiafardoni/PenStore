const mongoose = require('mongoose');

const PurchaseOrderSchema = mongoose.Schema({
    customerId: String,
	shippingAddress: String
}, {
    timestamps: true
});

module.exports = mongoose.model('purchaseOrders', PurchaseOrderSchema);