import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
   client_id: {
       type: String,
       required: true,
       unique: true,
   },

    email: {
       type: String,
        required: true,

    },
    firstName: {
       type: String,
        required: true,
    },
    lastName: {
       type: String,
        required: true,
    },
    username: {
       type: String,
    },
    avatar: {
       type: String,
        required: true,
    },
    followers: {
       type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        default: [],
    },
    following: {
       type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        default: [],
    }


},
    {timestamps: true});

const User = mongoose.model.User || mongoose.model('User', Schema);
export default User;