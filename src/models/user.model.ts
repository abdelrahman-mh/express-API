import mongoose, { model, Schema } from 'mongoose';
import { hashPassword } from '../utils/helper';
import toJSON from '../lib/toJSON';
import bcrypt from 'bcrypt';
import { UserDocument, UserSchemaModel, ROLES } from '../types/user.types';

const userSchema = new Schema<UserDocument, UserSchemaModel>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    minimize: false,
  }
);

userSchema.plugin(toJSON);

userSchema.static('isEmailTaken', async function (email: string, excludeUserId: mongoose.ObjectId): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
});

userSchema.method('isPasswordMatch', async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await hashPassword(this.password);
    } catch (error) {
      next(new Error('Error when setting a password'));
      return;
    }
  }
  next();
});

const UserModel = model<UserDocument, UserSchemaModel>('User', userSchema);

export default UserModel;
