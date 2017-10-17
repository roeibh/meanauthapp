import { verify } from "argon2";
import { User } from "../models/user.model";

export class Verificator {
    public static async verifyUserPassword(hashedPassword: string, password: string): Promise<boolean> {
        return await verify(hashedPassword, password);
    }

    public static async verifyEmailAndUsername(email: string, username: string): Promise<void> {
        if (await User.findUserByEmail(email)) {
            throw new Error("email already exist");
        } else if (await User.findUserByUsername(username)) {
            throw new Error("username already exist");
        }
        return;
    }
}
