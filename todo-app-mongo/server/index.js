import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import connectDB from "./db/index.js"
import todoRoutes from "./routes/index.js"

dotenv.config()
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

app.get('/', (req , res)=> {
  res.send("<h1>Hello World</h1>")
})

//routes
app.use('/api/v1' , todoRoutes)




connectDB()
  .then(() => {
    app.listen(8000, () => {
      console.log(`Server is running at port : 8000`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });