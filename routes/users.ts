import { NextFunction, Request, Response, Router } from "express";
import { sign } from "jsonwebtoken";
import * as passport from "passport";
import { InstanceType } from "typegoose";
import * as config from "../config/database";
import { User } from "../models/user.model";
import { Verificator } from "../security/verificator";
export let router: Router = Router();

// register
router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Verificator.verifyEmailAndUsername(req.body.email, req.body.username);
    const user: User = await User.addUser(req.body.email, req.body.password, req.body.username, req.body.name);
    if (!user) { throw new Error("user is null"); }
    res.json({
      msg: "You are now registered and can log in to your account",
      success: true,
    });
  } catch (error) {
    res.json({
      msg: `${error}`,
      success: false,
    });
  }
});

// Authenticate
router.post("/authenticate", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: InstanceType<User> | null = await User.findUserByUsername(req.body.username);
    if (!user) { throw new Error("User not found"); }

    // const isMatch: boolean = await User.verifyUserPassword(user.password, req.body.password);
    if (await Verificator.verifyUserPassword(user.password, req.body.password)) {
      const token: string = sign(User.plainObjectUser(user), config.secret, {
        expiresIn: 604800, // one week
      });
      res.json({
        msg: `Welcome back, ${user.name}`,
        success: true,
        token: `Bearer ${token}`,
        user: {
          email: user.email,
          id: user._id,
          name: user.name,
          username: user.username,
        },
      });
    } else {
      res.json({ msg: `Wrong password`, success: false });
    }
  } catch (error) {
    return res.json({ msg: `${error}`, success: false });
  }
});

// Profile
router.get("/profile", passport.authenticate("jwt", { session: false }), (req: Request, res: Response, next: NextFunction) => {
  res.json({ user: req.user });
});

// Test
// router.get("/test", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // await TwoFactorAuth.testSpeackEasy();
//     const user: InstanceType<User> | null = await User.findUserByEmail("test@email.com");
//     if (!user) { throw new Error("User not found"); }
//     const imageURL: string = await TwoFactorAuth.generateQRCode(user);
//     const verify: boolean = await TwoFactorAuth.verifyEnrollment(user, "572288");
//     res.json({ verify });
//   } catch (error) {
//     res.json({ res: `${error}` });
//   }
// });
