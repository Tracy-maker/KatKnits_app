import { INewUser } from "@/types";
import { account } from "./config";
import { ID } from "appwrite";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
        ID.unqiue(), 
        user.email,
        user.password,
        user.name
  } catch (error) {
    console.log(error);
    return error;
  }
}
