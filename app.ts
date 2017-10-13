import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as mongoose from "mongoose";
import { initialize, Passport, session, Strategy } from "passport";
import * as path from "path";
import * as config from "./config/database";
import { strategy } from "./config/passport";
import { router as usersRouter } from "./routes/users";

export class App {
    public readonly app: express.Express = express();
    private passport: Passport;

    constructor() {
        this.passport.use(strategy);

        this.initDb();
        this.initServer();
    }
    private initDb(): void {
        // avoid deprecation warning
        (<any> mongoose).Promise = global.Promise;
        // connect To Database
        mongoose.connect(config.database, {
            useMongoClient: true,
        });

        // on Connection
        mongoose.connection.on("connected", () => {
            console.log("[*] Connected to database " + config.database);
        });

        // on Error
        mongoose.connection.on("error", (err: Error): void => {
            console.log("[-] Database error: " + err);
        });
    }

    private initServer(): void {
        // cors Middleware
        this.app.use(cors());

        // set Static Folder
        this.app.use(express.static(path.join(__dirname, "public")));

        // body Parser Middleware
        this.app.use(bodyParser.json());

        // passport Middleware
        this.app.use(initialize());
        this.app.use(session());

        // users router
        this.app.use("/users", usersRouter);
    }
}
