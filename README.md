# meanauthapp
simple MEAN-like application to practice adding security to application written in TypeScript.
I use MongoDB as database, nodejs with Express as my api server and Angular as frontend framework.

This application was written based on the series "MEAN Stack Front To Back" which you can find [here](https://www.youtube.com/playlist?list=PLillGF-RfqbZMNtaOXJQiDebNXjVapWPZ).
I decided i want to write it in TypeScript, becuase I hate JS's errors and never use it since I found about TypeScript.

I use several packages other than the ones in the series
* [Typegoose](https://github.com/szokodiakos/typegoose): In order to use mongoose with TypeScript, I used TypeGoose and it sure did my life way easier.
* [argon2](https://github.com/ranisalt/node-argon2): Since argon2 is more secure than bcrypt (hit to parallelism due to the addition of memory requirements) I preffered using argon2 in my application.
* [authenticator](https://git.daplie.com/Daplie/node-authenticator): In order to apply more security for the users, I've added the option to add support to 2fa-totp with Google Authenticator.

## Structure
You can find the server in the home folder, and the client in "angular-src" folder.

## Install
In order to install and test the app, you need npm, nodejs and abgular cli. run "npm install" to install all dependencies, and then go to /angular-src and run ng-serve to run angular app. 
