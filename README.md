# My Custom authentication method based on email, username, password the serial key of the operating system of the device

## Why my own authentication strategy ?

Many authentication strategy method already exist like : Auth-basic, JWT Token, Oauth, OpenID. Then you may be wondering : Why another authentication method ? and What is the goal of this new authentication method ?
The answer is that, in fact i wanted to build my own authentication method wich use username and password but also serialnumber of operating system of the device.

## How it works ?

When a user signin, user informations (username, password, email address, auth token) is saved into database. The auth token is generated from the serial number of the operating system of the device encrypted (hash) wich `bcryptjs`. On user login, the user_token is refreshed. After signin or login, a cookie is setted with the name of `auth_token` and the value of `the user authentication token`. To know if the user if connected, on each request that require autentication, we can write a middleware function that verify that the cookie `user_token` value is compared with the device serial number encrypted in bcryptjs; if in a request we can't verify the authenticity of the token, the the user isn't logged hand we can handle this case.

## How its secure ?

Its secure for many reason :

- We can't modified the serial number of the device

- When token is generated, even if somebody else copie the user_token cookie and paste it in his own cookie the user_token will be incorrect because auth_token is generated from device serial number encrypted in bcryptjs : no user can take the identity of another user

- We can very easily check the validity of the authentication token and detect an error

## Api Routes are

- `POST`  /api/v1/user/login    [`email    , password`]
- `POST`  /api/v1/user/signin   [`name(min 4 caracters)    , email, password(min 8 caracters)`]
- `POST`  /api/v1/user/reset-password   [`No field required`]
- `POST`  /api/v1/user/update-password  [`password (old password)    , password_confirmation (new password)`]
-   `POST` /api/v1/reset-password/code [`email (The email where the password reset code was sent), code (the code that was sent by email)`]
- `POST`  /api/v1/reset-password/new-credentials [`email, code, password (new password), confirmPassword (password confirmation)`]
- `POST`  /api/v1/user/is-authenticated [`No field required`]
- `POST`  /api/v1/user/logout   [`No field required`]

## The issues if this authentication method

To get the operating system info, we use a npm package called `systeminformation`. The author of this package says that this package supports Linux, macOS, partial Windows, FreeBSD, OpenBSD, NetBSD, SunOS and Android; Apple os for phone isn't mentioned here.

## Local development

- clone the repository

- npm install

- `npm run dev` or `npm run prod`

## Test This Api with Thunder client vscode extension or any other api tester

- The file named test-api.json provide collection of request (in json format) that you can import into your api tester to quickly test the api

## the technologies used for this project

- Nodejs

- ExpressJS

- Typescript

- NPM

- Docker

## Tools for this mini project

- Visual studio code

- Thunder client vscode extension

made by : `JudaristFullstack - judearist@gmail.com`
