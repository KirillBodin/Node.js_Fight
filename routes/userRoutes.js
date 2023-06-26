import {Router} from "express";
import {userService} from "../services/userService.js";
import {
    createUserValid,
    updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import {responseMiddleware} from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user
router.get("/", (req, res, next) => {
    const users = userService.getAllUsers();
    res.data = users;
    next();
});

router.get("/:id", (req, res, next) => {
    const {id} = req.params;
    const user = userService.search({id});
    if (!user) {
        res.status(404);
        res.error = true;
        res.message = "User not found";
    } else {
        res.data = user;
        res.message = "User is found"
    }
    next();
});

router.post("/", createUserValid, (req, res, next) => {
    try {
        const userData = req.body;
        const createdUser = userService.createUser(userData);
        res.data = createdUser;
        res.message = "User created"
        next();
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message,
        });
    }
});

router.put("/:id", updateUserValid, (req, res, next) => {
    const {id} = req.params;
    const userData = req.body;
    const updatedUser = userService.updateUser(id, userData);
    if (!updatedUser) {
        res.status(404);
        res.error = true;
        res.message = "User not found";
    } else {
        res.data = updatedUser;
        res.message = "User is updated"
    }
    next();
});

router.delete("/:id", (req, res, next) => {
    const {id} = req.params;
    const deletedUser = userService.deleteUser(id);
    if (!deletedUser) {
        res.status(404);
        res.error = true;
        res.message = "User not found";
    } else {
        res.data = deletedUser;
        res.message = "User is deleted"
    }
    next();
});

router.use(responseMiddleware);

export {router};
