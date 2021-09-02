const { Schema, model } = require('mongoose');

const { OAUTH, USER } = require('../configs/dbTables.enum');

const oauthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    [USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(OAUTH, oauthSchema);
