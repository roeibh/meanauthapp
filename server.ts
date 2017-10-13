import { App } from "./app";

let server = new App();

// Start the server
server.app.listen(3000, () => {
    // tslint:disable-next-line:no-console
    console.log(`[*] server started on port 3000`);
});
