import { FIGHTER } from "../models/fighter.js";


const isValidEmail = (email) => {
  return email.endsWith("@gmail.com");
};

const isValidPhoneNumber = (phoneNumber) => {
  return /^\+380\d{9}$/.test(phoneNumber);
};

const isValidPower = (power) => {
  return power >= 1 && power <= 100;
};

const isValidDefense = (defense) => {
  return defense >= 1 && defense <= 10;
};

const isValidHealth = (health) => {
  return health >= 80 && health <= 120;
};

const isValidPassword = (password) => {
  return password.length >= 3;
};

const createFighterValid = (req, res, next) => {
  // TODO: Implement validator for FIGHTER entity during creation
  const fighterData = req.body;
  const { id, health, ...rest } = fighterData;
  const requiredFields = Object.keys(FIGHTER).filter((field) => field !== 'id' && field !== 'health');

  const missingFields = requiredFields.filter((field) => !(field in rest));

  if (missingFields.length > 0) {
    res.status(400).json({
      error: true,
      message: `Missing required field(s): ${missingFields.join(', ')}`,
    });
  } else if (
      (rest.power && !isValidPower(rest.power)) ||
      (rest.defense && !isValidDefense(rest.defense)) ||
      (health && (typeof health !== "number" || health < 80 || health > 120))
  ) {
    res.status(400).json({
      error: true,
      message: "Invalid format of Fighter entity fields",
    });
  } else {


    const fighter = { ...rest, id, health: health || 100 };
    req.body = fighter

    next();
  }
};




const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  const fighterData = req.body;
  const fieldsToUpdate = Object.keys(fighterData);
  const isValid = fieldsToUpdate.some((field) => field in FIGHTER);

  if (!isValid || Object.keys(fighterData).includes("id")) {
    res.status(400);
    res.error = true;
    res.message = "Fighter entity to update isn't valid";
  } else if (
      (fighterData.email && !isValidEmail(fighterData.email)) ||
      (fighterData.phoneNumber && !isValidPhoneNumber(fighterData.phoneNumber)) ||
      (fighterData.power && !isValidPower(fighterData.power)) ||
      (fighterData.defense && !isValidDefense(fighterData.defense)) ||
      (fighterData.health && !isValidHealth(fighterData.health)) ||
      (fighterData.password && !isValidPassword(fighterData.password))
  ) {
    res.status(400);
    res.error = true;
    res.message = "Invalid format of Fighter entity fields";
  }


  next();
};

export { createFighterValid, updateFighterValid };
