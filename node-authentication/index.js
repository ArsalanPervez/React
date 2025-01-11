import express from "express";
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();
const PORT = 3000;  
const app = express();
const jwtTokenExample = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyc2FsYW5wZXJ2ZXoyMTNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkQ1RyNFRwbmY4ZVpULlNjZkhLQzQ5dVgxTkZhWWtWS0wyTzUuazZ1RHJKaW1VUE50L2QvaGkiLCJpYXQiOjE3MzUzNzA5MzksImV4cCI6MTczNTM3NDUzOX0.scT3Lwq0s-A8CK0I2NReb2fkDCMlz3DPjqaXw4nz-Mw";

app.use(cookieParser())
app.use(cors())

app.get('/hash-password', (req, res)=> {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("arsalan123", salt, function(err, hash) {
            res.send(hash)
        });
    });
})

app.get("/check-password", (req, res) => {
    bcrypt.compare("arsalan123", "$2b$10$CTr4Tpnf8eZT.ScfHKC49uX1NFaYkVKL2O5.k6uDrJimUPNt/d/hi", function (err, result) {
        console.log(result)
        const cookie = req.cookies
        console.log(cookie)
        res.send(result)
    });
})


app.get('/create-token', (req, res) => {
    let token = jwt.sign({
        email: 'arsalanpervez213@gmail.com',
        password: "$2b$10$CTr4Tpnf8eZT.ScfHKC49uX1NFaYkVKL2O5.k6uDrJimUPNt/d/hi"
    }, 'ljfdlskjfkldsfjkldsjfklsd', { expiresIn: '1h' });

    console.log("token ==>", token)
    res.send(token)
})

app.get("/verify-token", (req, res) => {
    jwt.verify(jwtTokenExample, 'ljfdlskjfkldsfjkldsjfklsd', function (err, decoded) {
        if (!err) {
            console.log(decoded)
            res.send(decoded)
            return
        }
        res.send("error occured")
    });
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });