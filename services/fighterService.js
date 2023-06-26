import {fighterRepository} from "../repositories/fighterRepository.js";


class FighterService {
    // TODO: Implement methods to work with fighters
    getAllFighters() {
        return fighterRepository.getAll();
    }

    getFighterById(id) {
        return fighterRepository.getOne({id});
    }

    createFighter(fighterData) {
        const existingFighter = this.search({name: fighterData.name});
        if (existingFighter) {
            throw new Error("Fighter with the same name already exists.");
        }

        return fighterRepository.create(fighterData);
    }

    updateFighter(id, fighterData) {
        const existingFighter = this.search({name: fighterData.name});
        if (existingFighter && existingFighter.id !== id) {
            throw new Error("Fighter with the same name already exists.");
        }

        return fighterRepository.update(id, fighterData);

    }


    deleteFighter(id) {
        return fighterRepository.delete(id);
    }

    search(search) {
        const item = fighterRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }
}

const fighterService = new FighterService();

export {fighterService};
