// import * as otplib from "otplib";
import * as authenticator from "authenticator";
import { toDataURL } from "qrcode";
import { InstanceType } from "typegoose";
import { User } from "../models/user.model";

export class TwoFactorAuth {

    public static async generateQRCode(user: InstanceType<User>): Promise<string> {
        return new Promise(async (resolve: (value?: string | PromiseLike<string> | undefined) => void, reject: (reason?: any) => void): Promise<void> => {
            const formattedKey: string = authenticator.generateKey();
            User.updateProperty(user, "twoFactorSecret", formattedKey);
            const opathUrl: string = authenticator.generateTotpUri(formattedKey, user.email, "MEANAuthApp");
            // example to how make a promise from callback :-)
            toDataURL(opathUrl, (error: Error, url: string) => {
                return error ? reject(error) : resolve(url);
            });
        });
    }

    public static async testSpeackEasy(): Promise<boolean> {
        const formattedKey: string = authenticator.generateKey();
        const formattedToken: string = authenticator.generateToken(formattedKey);
        const verified: object | null = authenticator.verifyToken(formattedKey, formattedToken);
        return verified === null;
    }
    public static async verifyEnrollment(user: InstanceType<User>, userToken: string): Promise<boolean> {
        const verified: object | null = authenticator.verifyToken(user.twoFactorSecret, userToken);
        if (verified !== null) {
            await User.updateProperty(user, "twoFactorEnabled", true);
        } else {
            await User.updateProperty(user, "twoFactorSecret", "null");
            await User.updateProperty(user, "twoFactorEnabled", false);
        }
        return verified !== null;
    }
}
