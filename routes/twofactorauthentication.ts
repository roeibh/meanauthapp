import { NextFunction, Request, Response, Router } from "express";
import { authenticate } from "passport";
import { InstanceType } from "typegoose";
import { User } from "../models/user.model";
import { TwoFactorAuth } from "../security/two-factor-auth";
export let router: Router = Router();

// enrolment
router.get("/enroll", authenticate("jwt", { session: false }), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: InstanceType<User> | null = await User.findUserById(req.user._id);
        if (!user) { throw new Error("User not found"); }
        const imageURL: string = await TwoFactorAuth.generateQRCode(user);
        res.json({ imageURL, success: true });
    } catch (error) {
        res.json({
            msg: `${error}`,
            success: false,
        });
    }
});

// verify
router.post("/verify", authenticate("jwt", { session: false }), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: InstanceType<User> | null = await User.findUserById(req.user._id);
        if (!user) { throw new Error("User not found"); }
        const verified: boolean = await TwoFactorAuth.verifyEnrollment(user, req.body.userToken);
        res.json({ verified });
    } catch (error) {
        res.json({
            msg: `${error}`,
            success: false,
        });
    }
});
