import {Router} from "express";
import {fighterService} from "../services/fighterService.js";
import {responseMiddleware} from "../middlewares/response.middleware.js";
import {
    createFighterValid,
    updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";


const router = Router();

// TODO: Implement route controllers for fighter
router.get("/", (req, res, next) => {
    const fighters = fighterService.getAllFighters();
    res.data = fighters;
    res.message = "Fighters is found"
    next();
});

router.get("/:id", (req, res, next) => {
    const {id} = req.params;
    const fighter = fighterService.getFighterById(id);
    if (!fighter) {
        res.status(404);
        res.error = true;
        res.message = "Fighter not found";
    } else {
        res.data = fighter;
        res.message = "Fighter is found"
    }
    next();
});

router.post("/", createFighterValid, (req, res, next) => {
    try {
        const userData = req.body;
        const createdUser = fighterService.createFighter(userData);
        res.data = createdUser;
        res.message = "Fighter created";
        next();
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message,
        });
    }
});

router.put("/:id", updateFighterValid, (req, res, next) => {
    const {id} = req.params;
    const fighterData = req.body;
    const updatedFighter = fighterService.updateFighter(id, fighterData);
    if (!updatedFighter) {
        res.status(404);
        res.error = true;
        res.message = "Fighter not found";
    } else {
        res.data = updatedFighter;
        res.message = "Fighter is updated"
    }
    next();
});

router.delete("/:id", (req, res, next) => {
    const {id} = req.params;
    const deletedFighter = fighterService.deleteFighter(id);
    if (!deletedFighter) {
        res.status(404);
        res.error = true;
        res.message = "Fighter not found";
    } else {
        res.data = deletedFighter;
        res.message = "Fighter is deleted"
    }
    next();
});

router.use(responseMiddleware);

export {router};
