import { Schema, model, connect } from "mongoose";
import { TUser } from "./modules/user/user.interface";

// Define the order schema
const orderSchema = new Schema({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

// Define the user schema
const userSchema = new Schema<TUser>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: { type: String, required: true },
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
});


const UserModel = model<TUser>('User', userSchema);

export default UserModel;