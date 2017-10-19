# MEAN Application with Authentication - TypeScript
simple MEAN-like application to practice adding security to application written in TypeScript.

This application was written based on the series "MEAN Stack Front To Back" by [TraversyMedia](http://www.traversymedia.com/) which you can find [here](https://www.youtube.com/playlist?list=PLillGF-RfqbZMNtaOXJQiDebNXjVapWPZ).
I decided i want to write it in TypeScript, becuase I hate JS's errors and never use it since I found about TypeScript.

## Technologies
* [**M**ongoDB](https://www.mongodb.com/) - as database server
* [**E**xpress](https://expressjs.com/) - as api server
* [**A**ngular4](https://angular.io/) - as frontend framework
* [**N**odejs](https://nodejs.org/) - as js runtime environment in the backend

## NPM Packages (other than what's done in the series)
* [argon2](https://github.com/ranisalt/node-argon2): Since argon2 is more secure than bcrypt (hit to parallelism due to the addition of memory requirements) I preffered using argon2 in my application.
* [authenticator](https://git.daplie.com/Daplie/node-authenticator): In order to apply more security for the users, I've added the option to add support to 2fa-totp with Google Authenticator.
* [Typegoose](https://github.com/szokodiakos/typegoose): In order to use mongoose with TypeScript, I used TypeGoose and it sure did my life way easier.

## Usage
In order to use the app you'll need to download _nodejs_, _npm_ and _angular-cli_

### Installation

Install the dependencies

```sh
$ npm install
```
Build server (from ts to js)
```sh
$ tsc
```
Run db
```sh
$ mongod
```
Run server
```sh
$ npm start
```
Go to /angular-src and run the frontend
```sh
$ cd angular-src
$ ng-serve
```
Backend is on http://localhost:3000
Frontend is on http://localhost:4200
