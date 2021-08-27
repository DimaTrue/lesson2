const { Schema, model } = require('mongoose');

const { validTextRegExp, validEmailRegExp, validPasswordRegExp } = require('../helpers/stringValidation');
const roles = require('../configs/user-roles.enum');
const {
    INVALID_AGE, INVALID_EMAIL, INVALID_NAME, INVALID_PASSWORD, REQUIRED_AGE, REQUIRED_EMAIL, REQUIRED_NAME, REQUIRED_PASSWORD
} = require('../configs/stringConstants');

const userSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => validTextRegExp.test(name),
            message: () => INVALID_NAME
        },
        required: [
            true,
            REQUIRED_NAME
        ],
        trim: true
    },
    age: {
        type: Number,
        min: [
            6,
            INVALID_AGE
        ],
        max: [
            110,
            INVALID_AGE
        ],
        required: [
            true,
            REQUIRED_AGE
        ],
        trim: true
    },
    email: {
        type: String,
        validate: {
            validator: (email) => validEmailRegExp.test(email),
            message: () => INVALID_EMAIL
        },
        required: [
            true,
            REQUIRED_EMAIL
        ],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        validate: {
            validator: (pass) => validPasswordRegExp.test(pass),
            message: () => INVALID_PASSWORD
        },
        required: [
            true,
            REQUIRED_PASSWORD
        ],
        trim: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
    role: {
        type: String,
        default: roles.USER,
        enum: {
            values: Object.values(roles),
            message: '{VALUE} is not supported'
        }
    }
}, { timestamps: true });

module.exports = model('User', userSchema);
