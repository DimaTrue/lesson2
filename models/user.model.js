const { Schema, model } = require('mongoose');

const roles = require('../configs/user-roles.enum');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        default: []
    }],
    role: {
        type: String,
        default: roles.USER,
        enum: Object.values(roles)
    }
}, { timestamps: true });

module.exports = model('User', userSchema);
