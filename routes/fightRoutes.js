import {Router} from "express";
import {fightersService} from "../services/fightService.js";
import {
    createUserValid,
    updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import {responseMiddleware} from "../middlewares/response.middleware.js";

const router = Router();

// OPTIONAL TODO: Implement route controller for fights
router.get("/", (req, res, next) => {
    const fights = fightersService.getAllFights();
    res.data = fights;
    next();
});

router.get("/:id", (req, res, next) => {
    const {id} = req.params;
    const fight = fightersService.getFightById(id);
    if (!fight) {
        res.status(404);
        res.error = true;
        res.message = "Fight not found";
    } else {
        res.data = fight;
    }
    next();
});

router.post("/", (req, res, next) => {
    const fightData = req.body;
    const createdFight = fightersService.saveFight(fightData);
    res.data = createdFight;
    next();
});
export {router};
