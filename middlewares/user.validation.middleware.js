import {USER} from "../models/user.js";


const isValidEmail = (email) => {
    return email.endsWith("@gmail.com");
};

const isValidPhoneNumber = (phoneNumber) => {
    return /^\+380\d{9}$/.test(phoneNumber);
};

const isValidPassword = (password) => {
    return password.length >= 3;
};


const createUserValid = (req, res, next) => {
    // TODO: Implement validator for USER entity during creation
    const userData = req.body;
    const {id, ...rest} = userData;
    const requiredFields = Object.keys(USER).filter((field) => field !== 'id');

    const missingFields = requiredFields.filter((field) => !(field in rest));

    if (missingFields.length > 0) {
        res.status(400).json({
            error: true,
            message: `Missing required field(s): ${missingFields.join(', ')}`,
        });
    } else if (!isValidEmail(rest.email)) {
        res.status(400).json({
            error: true,
            message: "Invalid email. Only @gmail domain is allowed",
        });
    } else if (!isValidPhoneNumber(rest.phoneNumber)) {
        res.status(400).json({
            error: true,
            message: "Invalid phone number. Format should be +380xxxxxxxxx",
        });
    } else if (!isValidPassword(rest.password)) {
        res.status(400).json({
            error: true,
            message: "Invalid password. Minimum password length is 3",
        });
    } else {
        next();
    }
};


const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    const userData = req.body;
    const fieldsToUpdate = Object.keys(userData);
    const isValid = fieldsToUpdate.some((field) => field in USER);

    if (!isValid || Object.keys(userData).includes("id")) {
        res.status(400);
        res.error = true;
        res.message = "User entity to update isn't valid";
    } else if (
        (userData.email && !isValidEmail(userData.email)) ||
        (userData.phoneNumber && !isValidPhoneNumber(userData.phoneNumber)) ||
        (userData.password && !isValidPassword(userData.password))
    ) {
        res.status(400);
        res.error = true;
        res.message = "Invalid format of User entity fields";
    }
    next();
};

export {createUserValid, updateUserValid};
