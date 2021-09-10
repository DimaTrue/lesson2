const { Schema, model } = require('mongoose');

const {
    constants, dbTables: { POST, USER }, roles, strings
} = require('../configs');

const userSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => constants.TEXT_REGEXP.test(name),
            message: () => strings.INVALID_NAME
        },
        required: [
            true,
            strings.REQUIRED_NAME
        ],
        trim: true
    },
    age: {
        type: Number,
        min: [
            6,
            strings.INVALID_AGE
        ],
        max: [
            110,
            strings.INVALID_AGE
        ],
        required: [
            true,
            strings.REQUIRED_AGE
        ],
        trim: true
    },
    email: {
        type: String,
        validate: {
            validator: (email) => constants.EMAIL_REGEXP.test(email),
            message: () => strings.INVALID_EMAIL
        },
        required: [
            true,
            strings.REQUIRED_EMAIL
        ],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        validate: {
            validator: (pass) => pass.length > 1,
            message: () => strings.INVALID_PASSWORD
        },
        required: [
            true,
            strings.REQUIRED_PASSWORD
        ],
        trim: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: POST,
    }],
    role: {
        type: String,
        default: roles.USER,
        enum: {
            values: Object.values(roles),
            message: '{VALUE} is not supported'
        },
        trim: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
    }
}, { timestamps: true });

module.exports = model(USER, userSchema);
