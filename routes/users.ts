import { NextFunction, Request, Response, Router } from "express";
import { sign } from "jsonwebtoken";
import { InstanceType } from "typegoose";
import * as config from "../config/database";
// import * as passport from "passport";
import { User } from "../models/user.model";
export let router: Router = Router();

// register
router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user: User = await User.addUser(req.body.email, req.body.password, req.body.username, req.body.name);
    if (!user) { throw new Error("user is null"); }
    res.json({
      msg: "registered user",
      success: true,
    });
  } catch (e) {
    res.json({
      msg: `Error: ${e}`,
      success: false,
    });
  }
});

// Authenticate
router.post("/authenticate", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user: InstanceType<User> | null = await User.findUserByUsername(req.body.username);
    if (!user) { throw new Error("user return null"); }
    let isMatch: boolean = await User.verifyUserPassword(user.password, req.body.password);
    if (isMatch) {
      let token: string = sign(user, config.secret, {
        expiresIn: 86400, // one day
      });
      res.json({
        msg: `User authenticated`,
        success: true,
        token: `JWT ${token}`,
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
    return res.json({ msg: `Cannot find username. Error: ${error}`, success: false });
  }
  // let result = await User.findUserByUsername(req.body.username)
  //   .then((user) => {
  //     if (!user) { throw new Error("user not found"); }
  //     User.verifyUserPassword(user.password, req.body.password)
  //       .then((isMatch) => {
  //         if (isMatch) {
  //           let token = sign(user, config.secret, {
  //             expiresIn: 86400, // one day
  //           });
  //           res.json({
  //             msg: `User authenticated`,
  //             success: true,
  //             token: `JWT ${token}`,
  //             user: {
  //               email: user.email,
  //               id: user._id,
  //               name: user.name,
  //               username: user.username,
  //             },
  //           });
  //         } else {
  //           res.json({ msg: `Wrong password`, success: false });
  //         }
  //       })
  //       .catch((err) => {
  //         return res.json({ msg: `Internal error: ${err}`, success: false });
  //       });
  //   })
  //   .catch((err) => {
  //     return res.json({ msg: `Cannot find username. Error: ${err}`, success: false });
  //   });
});

// Profile
router.get("/profile", (req: Request, res: Response, next: NextFunction) => {
  res.send("PROFILE");
});
