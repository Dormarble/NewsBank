import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = Schema({
    uid: {
        type: String,
        unique: true,
        required: true
    },
    pw: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    username: {
        type: String,
        minlength: 4,
        maxlength: 12
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User