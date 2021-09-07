const { Schema, model } = require('mongoose');

const { dbTables: { POST, USER }, strings } = require('../configs');

const postSchema = new Schema({
    title: {
        type: String,
        validate: {
            validator: (title) => title.length > 1 && title.length <= 30,
            message: () => strings.INVALID_TITLE
        },
        required: true,
        trim: true
    },
    content: {
        type: String,
        validate: {
            validator: (content) => content.length > 1,
            message: () => strings.INVALID_CONTENT
        },
        required: true,
        trim: true
    },
    [USER]: {
        type: Schema.Types.ObjectId,
        ref: USER,
        required: true
    }
}, { timestamps: true });

module.exports = model(POST, postSchema);
