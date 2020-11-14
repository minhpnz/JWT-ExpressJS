# JWT-ExpressJS

## This simple application is designed to demonstrate the principle of using JWT (JSON Web Tokens) as access tokens to protect an API.
##Using It
Run the application:

	node server.js
  
## Database 
  Mongo Cloud

To get a token, make a `POST` request to:

	http://localhost:3001/api/user/login
  
You'll need to set the **body**:

`email` : `minh812@gmail.com`

`password` : `123456`

Paste the token to the header on `GET` request on: 

	http://localhost:3001/api/user/posts
