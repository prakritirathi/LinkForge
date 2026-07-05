import { Request, Response } from "express";
import healthService from "../services/health.services";

class HealthController {
  getHealth(req: Request, res: Response) {
    const health = healthService.getHealth();

    res.status(200).json(health);
  }
}

export default new HealthController();