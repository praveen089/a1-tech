const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CardSchema = new Schema({
    name: {type: String, required: true, max: 100},
    card_no: {type: Number, required: true},
    card_limit: {type: Number, required: true},
    isactive: Number,
	createdAt: { type: Date },
	updatedAt: { type: Date }
});


// Export the model
module.exports = mongoose.model('Card', CardSchema);