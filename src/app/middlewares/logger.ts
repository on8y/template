import { Request, Response } from "express";

var myLogger = function (req: Request, res: Response, next: Function) {
  console.log("LOGGED");
  next();
};

export default myLogger;
