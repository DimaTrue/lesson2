const { Schema, model } = require('mongoose');

const { INVALID_CONTENT, INVALID_TITLE } = require('../configs/stringConstants');

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
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = model('Post', postSchema);
