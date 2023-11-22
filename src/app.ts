import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

    

// routes
app.get("/", (req: Request , res: Response) => {
    res.send("Hello World!");
}
);

export default app;