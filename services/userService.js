import {userRepository} from "../repositories/userRepository.js";

class UserService {
    // TODO: Implement methods to work with user
    getAllUsers() {
        return userRepository.getAll();
    }

    createUser(userData) {
        const existingUser = this.search({email: userData.email});
        if (existingUser) {
            throw new Error("User with the same email already exists.");
        }

        const existingPhoneNumberUser = this.search({phoneNumber: userData.phoneNumber});
        if (existingPhoneNumberUser) {
            throw new Error("User with the same phone number already exists.");
        }

        return userRepository.create(userData);
    }

    updateUser(id, userData) {
        const existingUser = this.search({email: userData.email});
        if (existingUser && existingUser.id !== id) {
            throw new Error("User with the same email already exists.");
        }

        const existingPhoneNumberUser = this.search({phoneNumber: userData.phoneNumber});
        if (existingPhoneNumberUser && existingPhoneNumberUser.id !== id) {
            throw new Error("User with the same phone number already exists.");
        }

        return userRepository.update(id, userData);

    }

    deleteUser(id) {
        return userRepository.delete(id);
    }

    search(search) {
        const item = userRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }
}

const userService = new UserService();

export {userService};
