import { json } from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as mongoose from "mongoose";
import * as passport from "passport";
import { join } from "path";
import { database } from "./config/database";
import { strategy } from "./config/passport";
import { router as twofactorauthRouter } from "./routes/twofactorauthentication";
import { router as usersRouter } from "./routes/users";

export class App {
    public readonly expressApp: express.Express = express();
    constructor() {
        passport.use(strategy);

        this.initDb();
        this.initServer();
    }
    private initDb(): void {
        // avoid deprecation warning
        (mongoose as any).Promise = global.Promise;
        // connect To Database
        mongoose.connect(database, {
            useMongoClient: true,
        });

        // on Connection
        mongoose.connection.on("connected", () => {
            console.log("[*] Connected to database " + database);
        });

        // on Error
        mongoose.connection.on("error", (err: Error): void => {
            console.log("[-] Database error: " + err);
        });
    }

    private initServer(): void {

        // set Static Folder
        this.expressApp.use(express.static(join(__dirname, "public")));

        this.addMiddleware();

        // users router
        this.expressApp.use("/users", usersRouter);

        // 2fa router
        this.expressApp.use("/twofactorauth", twofactorauthRouter);
    }

    private addMiddleware(): void {
        // cors Middleware
        this.expressApp.use(cors());
        // body Parser Middleware
        this.expressApp.use(json());
        // passport Middleware
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    }
}
