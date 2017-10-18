import { argon2id, hash } from "argon2";
import { Model as mongooseModel } from "mongoose";
import { InstanceType, prop, Typegoose } from "typegoose";
// creating db model for user and adding functionality
export class User extends Typegoose {

    @prop({ required: true })
    public email: string;

    @prop({ required: false })
    public name?: string;

    @prop({ required: true })
    public password: string;

    @prop({ required: true })
    public twoFactorEnabled: boolean;

    @prop({ required: true })
    public twoFactorSecret: string;

    @prop({ required: true })
    public username: string;

    public static async addUser(email: string, password: string, username: string, name?: string): Promise<User> {
        const user: User = new User();
        user.email = email;
        user.name = name;
        user.password = await hash(password, { type: argon2id });
        user.twoFactorEnabled = false;
        user.twoFactorSecret = "null";
        user.username = username;
        await Model.create(user);
        return user;
    }

    public static async findUserById(id: string): Promise<InstanceType<User> | null> {
        return Model.findById(id);
    }

    public static async findUserByUsername(username: string): Promise<InstanceType<User> | null> {
        return Model.findOne({ username });
    }

    public static async findUserByEmail(email: string): Promise<InstanceType<User> | null> {
        return Model.findOne({ email });
    }

    public static async updateProperty(user: InstanceType<User>, property: string, value: string | boolean): Promise<InstanceType<User> | null> {
        // const user: InstanceType<User> | null = await Model.findById(id);
        if (!user) { throw new Error("User not found"); }
        return this.findOneAndUpdatePromise(user._id, property, value);
    }

    // helper functions
    public static plainObjectUser(user: InstanceType<User>): object {
        return {
            email: user.email,
            id: user._id,
            name: user.name,
            password: user.password,
            twoFactorEnabled: user.twoFactorEnabled,
            twoFactorSecret: user.twoFactorSecret,
            username: user.username,
        };
    }

    private static async findOneAndUpdatePromise(id: string, property: string, value: string | boolean): Promise<InstanceType<User>> {
        return new Promise(
            (
                resolve: (value: InstanceType<User> | PromiseLike<InstanceType<User>> | undefined) => void,
                reject: (reason: any) => void,
            ): void => {
            const setObject: { $set: { [key: string]: string | boolean } } = { $set: {} };
            setObject.$set[property] = value;
            Model.findOneAndUpdate(
                { _id: id },
                setObject,
                { new: true },
                (err: any, updatedUser: InstanceType<User>, res: any) => {
                    return err ? reject(err) : resolve(updatedUser);
                });
        });
    }
}

// The model we'll use to create db objects
const Model: mongooseModel<InstanceType<User>> & User & typeof User =
    new User().getModelForClass(User, { schemaOptions: { timestamps: true } });
