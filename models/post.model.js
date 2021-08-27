const { Schema, model } = require('mongoose');

const { validTextRegExp } = require('../helpers/stringValidation');
const { INVALID_CONTENT, INVALID_TITLE } = require('../configs/stringConstants');

const postSchema = new Schema({
    title: {
        type: String,
        validate: {
            validator: (title) => validTextRegExp.test(title),
            message: () => INVALID_TITLE
        },
        required: true,
        trim: true
    },
    content: {
        type: String,
        validate: {
            validator: (content) => validTextRegExp.test(content),
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
