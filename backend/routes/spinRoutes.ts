import { Request, Response, Router } from "express";
import { SpinService } from "../services/spinService";

const router = Router();

router.post("/spin", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await SpinService.executeSpin(true);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/fakeSpin", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await SpinService.executeSpin(false);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/config", async (req: Request, res: Response): Promise<void> => {
  try {
    const config = SpinService.getGameConfig();
    res.json(config);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
