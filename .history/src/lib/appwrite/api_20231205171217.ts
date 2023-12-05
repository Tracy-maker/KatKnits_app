import { INewUser } from "@/types";
import { account } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(ID.unqiue(), user.email);
  } catch (error) {
    console.log(error);
    return error;
  }
}
