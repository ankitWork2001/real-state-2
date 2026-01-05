import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number'],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },

    createdAt: {
      type: Date,
      default: Date.now, // current date automatically
    },
  },
  {
    timestamps: false, // we already added createdAt manually
  }
);

const User = mongoose.model('User', userSchema);

export default User;