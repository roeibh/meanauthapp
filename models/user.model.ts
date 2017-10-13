import { argon2id, hash, verify } from "argon2";
import { Model as mongooseModel } from "mongoose";
import { InstanceType, prop, Typegoose } from "typegoose";

export class User extends Typegoose {

    public static async addUser(email: string, password: string, username: string, name?: string): Promise<User> {
        password = await hash(password, { type: argon2id });
        let user: User = new User();
        user.email = email;
        user.name = name;
        user.password = password;
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

    public static async verifyUserPassword(hashedPassword: string, password: string): Promise<boolean> {
        try {
            return await verify(hashedPassword, password);
        } catch (err) {
            throw err;
        }
    }

    @prop({ required: true })
    public email: string;

    @prop({ required: false })
    public name?: string;

    @prop({ required: true })
    public password: string;

    @prop({ required: true })
    public username: string;

}

const Model: mongooseModel<InstanceType<User>> & User & typeof User =
    new User().getModelForClass(User, { schemaOptions: { timestamps: true } });
