const { Schema, model } = require('mongoose');

const { dbTables: { RESET_TOKEN, USER } } = require('../configs');

const resetTokenSchema = new Schema({
    reset_token: {
        type: String,
        required: true
    },
    [USER]: {
        type: Schema.Types.ObjectId,
        ref: USER,
        required: true

    }
}, { timestamps: true });

module.exports = model(RESET_TOKEN, resetTokenSchema);
