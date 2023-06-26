import { fightRepository } from "../repositories/fightRepository.js";

class FightersService {
  // OPTIONAL TODO: Implement methods to work with fights
    saveFight(fightData) {
        return fightRepository.create(fightData);
    }

    getAllFights() {
        return fightRepository.getAll();
    }

    getFightById(id) {
        return fightRepository.getOne({ id });
    }
}

const fightersService = new FightersService();

export { fightersService };
