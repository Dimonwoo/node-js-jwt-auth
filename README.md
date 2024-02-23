# Node – JWT Authentication / Authorization

## Token Based Authentication

Comparing with Session-based Authentication that need to store Session on Cookie, the big advantage of Token-based Authentication is that we store the JSON Web Token (JWT) on Client side: Local Storage for Browser, Keychain for IOS and SharedPreferences for Android… So we don’t need to build another backend project that supports Native Apps or an additional Authentication module for Native App users.

## Technologies

- Express 4.18.2
- bcryptjs 2.4.3
- jsonwebtoken 9.0.0
- Sequelize 6.32.1
- MySQL

## Methods provided by the API

| Methods | Urls             | Actions                    |
| ------- | ---------------- | -------------------------- |
| POST    | /api/auth/signup | signup new account         |
| POST    | /api/auth/signin | login an account           |
| GET     | /api/all         | retrieve public content    |
| GET     | /api/user        | access User’s content      |
| GET     | /api/mod         | access Moderator’s content |
| GET     | /api/admin       | access Admin’s content     |

## Installation / Usage

- Create a .env file with following content (Update the .env file and config directory information according to your server settings):

```
 SERVER_PORT=8080
 CLIENT_HOST="http://localhost"
 CLIENT_PORT=8081
 MYSQL_HOST="localhost"
 MYSQL_USER="root"
 MYSQL_PASSWORD="YOUR_PASSWORD"
 MYSQL_DATABASE="authdb"
 AUTH_SECRET_KEY="YOUR_SECRET_KEY"
```

```
npm install
```

### Run

```
npm run start
```
