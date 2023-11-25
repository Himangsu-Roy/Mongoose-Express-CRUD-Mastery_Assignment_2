import { Model } from "mongoose";
// Define the order type
type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

// Define the user type
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: TOrder[];
  isDeleted: boolean;
};


// for creating instance constructor function user is exist or not type
export type TUserMethods = {
  isUserExists(userId: number): Promise<TUser | null>;
};

export type TUserModel = Model<
  TUser,
  Record<string, never>,
  TUserMethods
>;