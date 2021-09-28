// IMPORTS ------------------------------------
import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();
// --------------------------------------------


// MIDDLEWARES --------------------------------
app.use( express.json() );

app.use( cookieParser() );

app.use( cors({
    origin: "http://localhost:3000",
    credentials: true
}));

const authenticate = (req, res, next) => {
    
    console.log(req.cookies);

    if (!req.cookies.token) {
        throw new createError(404, "Must have token to access.")
    }

    try {
        const decodedData = jwt.verify( req.cookies.token, JWT_SECRET );
        console.log("Data decoded from JWT --> ", decodedData);
        next();
    } catch (error) {
        next( error );
    };
};
// --------------------------------------------


// DUMMY DATA ---------------------------------
const users = [];

const JWT_SECRET = "mySuperDuperSecret";
// --------------------------------------------


// ROUTES -------------------------------------
app.get("/", (req, res) => {
    res.send("<h1>Authentication Station</h1>")
});


app.post("/login", (req, res, next) => {
    const { username, password } = req.body;
    
    try {
        let userFound = users.find(user => user.username === username);
        
        if (!userFound) {
            throw new createError("Login failed");
        } else {
            const successfulLogin = bcrypt.compareSync( password, userFound.password );

            if(!successfulLogin) {
                return next( new Error("Passwords do not match"))
            }
            const token = jwt.sign( userFound, JWT_SECRET, { expiresIn: "30m" })
            res.cookie("token", token, { httpOnly: true });
            delete userFound.password;
            res.json( userFound );
        };
    } catch (error) {
        next( error );
    };
});


app.post("/signup", async (req, res, next) => {
    const userData = { ...req.body };
    userData.password = bcrypt.hashSync( userData.password, 10);
    userData.id = Math.random().toString(36).substr(2, 10);

    users.push(userData);
    res.json(userData);
})


app.get("/users", authenticate, (req, res) => {
    res.json( users );
});


app.use((err, req, res, next) => {
    res.status(err.status || 404).json({ error: err.message })
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
// --------------------------------------------