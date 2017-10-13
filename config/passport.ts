import { ExtractJwt, Strategy as jwtStrategy, StrategyOptions, VerifiedCallback } from "passport-jwt";
import { InstanceType } from "typegoose";
import { secret } from "../config/database";
import { User } from "../models/user.model";

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
};
export const strategy: jwtStrategy = new jwtStrategy(options, async (payload: any, done: VerifiedCallback): Promise<void> => {
    try {
        const user: InstanceType<User> | null = await User.findUserById(payload.id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
