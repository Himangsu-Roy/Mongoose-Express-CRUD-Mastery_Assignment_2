import UserModel from "../../user.model";
import { TUser } from "./user.interface";


const createUser = async (user: TUser) => {
    return await UserModel.create(user);
}


export const UserService = {
    createUser,
}