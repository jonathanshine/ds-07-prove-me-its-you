# Auth Exercise - Password Hashing

Now we wanna add signups of new users with hashed passwords

- install package bcryptjs: `npm i bcryptjs` 
  - (documentation for usage: https://www.npmjs.com/package/bcryptjs)

- clear the entries in your users array `let users = []`
  - We don't wanna use that plain passwords anymore :)

- add a POST route /signup
  - receive here username & password in req.body
  - hash the given password
  - create a new user object with username and the hashed password
    - optional: generate some random ID too 
  - store the user in your array with users.push()
  - return the created user with res.json

- test with insomnia to signup against your POST /signup route

- adapt your login route
  - compare the received password with the stored password hash
  - on match: send the user back
  - no match: reject login
  - disclaimer: on each restart, your signed-up user(s) gets lost
    - in this case: signup a user with Insomnia again and retry your login


## Bonus

Now hide the password field when sending back the user at the end of your signup route.

