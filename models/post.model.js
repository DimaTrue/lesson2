const { Schema, model } = require('mongoose');

const { INVALID_CONTENT, INVALID_TITLE } = require('../configs/stringConstants');
const { POST, USER } = require('../configs/dbTables.enum');

const postSchema = new Schema({
    title: {
        type: String,
        validate: {
            validator: (title) => title.length > 1 && title.length <= 30,
            message: () => INVALID_TITLE
        },
        required: true,
        trim: true
    },
    content: {
        type: String,
        validate: {
            validator: (content) => content.length > 1,
            message: () => INVALID_CONTENT
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
