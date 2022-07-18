import express, {Application, Request, Response} from "express";

const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
    res.json({msg: "Hello World"})
})

app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});