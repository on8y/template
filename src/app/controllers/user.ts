import { Router } from "express";
import { Request, Response } from "express";

const router = Router();
router.get("/", (req: Request, res: Response, next: Function) => {
  res.send("aaaa");
});

router.get("/bbb", (req: Request, res: Response, next: Function) => {
  res.send("bbb");
});

router.get("/ccc", (req: Request, res: Response, next: Function) => {
  res.send("ccc");
});

export default router;
