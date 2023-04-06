import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    role: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', userSchema);
export default User;