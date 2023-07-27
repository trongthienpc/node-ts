import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hi there!");
});

app.listen("5000", () => {
  console.log("Server listening on port 5000");
});

export default app;
