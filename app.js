import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors({origin: 'http://localhost:3000'}));

app.listen(port, () => {
  console.log(`The chat server is listening on port ${port}`)
})
