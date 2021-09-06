const { Schema, model } = require('mongoose');

const { CONFIRM_TOKEN, USER } = require('../configs/dbTables.enum');

const confirmTokenSchema = new Schema({
    confirm_token: {
        type: String,
        required: true
    },
    [USER]: {
        type: Schema.Types.ObjectId,
        ref: USER,
        required: true

    }
}, { timestamps: true });

module.exports = model(CONFIRM_TOKEN, confirmTokenSchema);
