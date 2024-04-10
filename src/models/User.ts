import mongoose, { model, Model, Schema } from 'mongoose';
import { hashPassword } from '../utils/helper';
import toJSON from '../lib/toJSON';
import bcrypt from 'bcrypt';
import { UserDocument } from '../types/main';

interface UserModel extends Model<UserDocument> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, UserModel>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    minimize: false,
  },
);

userSchema.plugin(toJSON);

userSchema.static('isEmailTaken', async function (email: string, excludeUserId: mongoose.ObjectId): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
});

userSchema.method('isPasswordMatch', async function (password: string): Promise<boolean> {
  const user = this;
  return bcrypt.compare(password, user.password);
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

const UserModel = model<UserDocument, UserModel>('User', userSchema);

export default UserModel;
