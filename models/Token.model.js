const mongoose = require('mongoose');
var TokenSchema = mongoose.Schema({
    token: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    is_deleted: { type: Boolean, default: false },
}, { timestamps: true });


module.exports = mongoose.model('Token', TokenSchema, 'tokens');