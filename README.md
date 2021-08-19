# Auth Exercise - JWT Token

In this exercise we wanna train to create and verify tokens (=visitor cards) after someone successfully logs into our API. 

We will use JWT as token standard.

This visitor card will help us to identify the user on future calls.

We also wanna setup a route with protected information. And finally place an security guard (=authentication middleware) "in front of it's door", so that only authenticated users can access that route.

The JWT principals are universal and therefore independant from the database that we use under the hood. In this exercise we will focus on the auth flow (without any database or mongoose) to train this workflow. 

## Let's get into it...

- create a file server.js
- install packages express, jsonwebtoken, cookie-parser: `npm i express jsonwebtoken cookie-parser`
- setup body parsing middleware: `app.use( express.json() )`
- setup cookie parsing middleware: `app.use( cookieParser() )`

- create an array of two users before declaring your routes, e.g.:
  - ` let users = [ { username: 'rob', password: 'rob123' }, { username: 'vas', password: 'vas123' } ]`

- create two routes
  - POST /login
    - check here if the received username and the password exists in your users array (`users.find(user => ... )`))
    - if not: reject the call with an error message "Login failed"
    - on success: create a jwt token. Give the token a lifetime of 30 minutes 
    - attach the token to a cookie (`res.cookie('token', jwtToken) `)
    - return the found user with res.json()
  - GET /users
    - return here your array of users
  - Do NOT create any controller files please! Keep the structure plain and simple for now

- create an "auth" middleware: `const auth = (req, res, next) => { ...}`
  - console.log the received cookies. Hint: All received cookies are in the object `req.cookies` (the cookie parser will do this)
  - check for existence of the key "token" in the cookies object
  - if no token was found in cookies: reject the call calling next(error)
  - verify the cookie (do not forget the try...catch around jwt.verify())
  - in case the token is invalid: reject the call calling next(error) 
  - if the token is valid: let the user pass with `next()`

- attach the "auth" middleware as "security guard" to your users route: `app.get('/users', auth, (req, res, next) => {...}`
  - now this route should be protected to authenticated users only!

- to make debugging easier: 
  - write an error handler to handle all errors of your routes globally: `app.use((err, res, res, next) => {...})`

- test the flow with Insomnia
  - call the GET route /users
   - here you should receive an error that you are not allowed to do this
  - call now the POST route /login with valid username & password
  - check if you received back the cookie in the response (in the right response window > Tab "Cookies")
  - now try to call the route /users again!
   - now you should receive the information about all users!

## Bonus: Create a mini frontend

Now we wanna train the big final: a fullstack authentication flow!

- setup CORS in your backend, so you can receive data + cookies from the frontend: 
  - `app.use( cors( { origin: 'http://localhost:3000', credentials: true }) )`
  - the CORS standard does NOT allow that cookies are sent from EVERY frontend. Therefore we explicitly need to whitelist the frontend domain (=origin)

- create a React app into a subfolder: `npx create-react-app client` 
- go into the folder and install axios: `npm install axios`

- create a login form component and import it into App.js
  - provide two input fields: username & password
  - import axios here
  - set an axios baseUrl after import
    - `axios.defaults.baseURL = 'http://localhost:5000'`
    - `axios.defaults.withCredentials = true` 
      - // axios will now attach cookies automatically to every call to the backend
  
  - add a submit handler "handleLogin"
    - call the backend POST route /login with AXIOX here
    - pass in the data login data as an object as second parameter to axios.post() function
    - display an error message below the form if the login failed

- create a new page component "UserList"
  - create an array of users with useState([...])
  - create a useEffect hook
  - import axios
    - set an axios baseUrl after import
      - `axios.defaults.baseURL = 'http://localhost:5000'`
      - `axios.defaults.withCredentials = true` 
      - // axios will now attach cookies automatically to every call to the backend
     - tired of configuration axios in each component again? You might wanna outsource all your axios calls to a separate file now :) but it's not a must here
  - in the effect hook: fetch the users from the backend (route GET /users) using Axios
    - display the returned user list in your JSX (use map to displa)
    - also display any returned error

- add routing
  - install react-router-dom
    - setup a home route which shows your login
    - setup a route /users which shows your page component "UserList"
  - redirect to your route /users if login was successful

- testing
  - now clear the cookie by opening the browser console > tab "Application" > Cookies
  - refresh the /users frontend route
    - instead of receiving the users array, you should get an error

## Bonus: Protect the secret /users route

- after login: store the login result (= returned user) in Context API

- create a PrivateRoute component
  - if the user is logged in, we wanna allow access to the given component
  - if the user is not logged in, we wanna reject / redirect to our login form

- create a private route for the secret route:
  - `<PrivateRoute path="/users" component={UserList} />`

- testing
  - go to frontend route /users
  - check if you receive the users in your JSX
    - if there is an issue: inspect the browser console to see if the API call succeeded
  - works? now clear the cookie in the browser
  - refresh the page /users
  - you should get automatically redirected to /login

We now gained the ability to restrict routes & data access to our backend to authenticated users only! 

We are now able to build a multi user fullstack application with data protection.

Congratulations!
