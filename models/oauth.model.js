const { Schema, model } = require('mongoose');

const { dbTables: { OAUTH, USER } } = require('../configs');

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
        ref: USER,
        required: true

    }
}, { timestamps: true });

module.exports = model(OAUTH, oauthSchema);
