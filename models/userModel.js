const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: { type: String, required: [true, "Please add the name of the userName"] },
    email: { type: String, required: [true, "Please add the email address of the user"], unique: [true, "This email is already taken"] },
    password: { type: String, required: [true, "Please add the password of the user"] }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema);