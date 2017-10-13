import { ExtractJwt, Strategy as jwtStrategy, StrategyOptions } from "passport-jwt";
import { secret } from "../config/database";
import { User } from "../models/user.model";

let options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: secret,
};
export const strategy: jwtStrategy = new jwtStrategy(options, (payload, done) => {
    User.findUserById(payload.id)
        .then((user) => done(null, user))
        .catch((err) => done(err, null));
    // if (user.) { done(null, user); } else { done(new Error("User not found"), null); }
});
// options.jwtFromRequest = ExtractJwt.fromAuthHeader();
// options.secretOrKey = secret;
// export const strategy: jwtStrategy;
// export class PassportJwtStrategy {
//     public strategy: jwtStrategy;
//     private options: StrategyOptions;
//     constructor() {
//         // this.options.algorithms
//         // this.options.audience
//         // this.options.ignoreExpiration
//         // this.options.issuer
//         this.options.jwtFromRequest = ExtractJwt.fromAuthHeader();
//         // this.options.passReqToCallback
//         this.options.secretOrKey = secret;

//         this.strategy = new jwtStrategy(this.options, (payload, done) => {
//             let user = User.findUserById(payload.id);
//             if (user) { done(null, user); } else { done(new Error("User not found"), null); }
//         });
//     }
// }
