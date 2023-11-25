import { Schema, model } from 'mongoose';
import { TUser, TUserMethods, TUserModel } from './modules/user/user.interface';
import bcrypt from 'bcrypt';
import config from './config';

// Define the order schema
const orderSchema = new Schema({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

// Define the user schema
const userSchema = new Schema<TUser, TUserModel, TUserMethods>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: {
    type: String,
    required: [true, 'password is required'],
    maxlength: [20, 'password must be at most 20 characters long'],
  },
  fullName: {
    firstName: { type: String },
    lastName: { type: String },
  },
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: { type: [String] },
  address: {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
  orders: { type: [orderSchema] },
  isDeleted: { type: Boolean, default: false },
});

// password hashing and save into DB
userSchema.pre('save', function (this: TUser, next) {
  bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds), (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// aggregation
userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: { isDeleted: { $ne: true } },
  });
  next();
});

// user is exists or not
userSchema.methods.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};


const UserModel = model<TUser, TUserModel>('User', userSchema);

export default UserModel;
