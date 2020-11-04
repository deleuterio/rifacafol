class UserCreateService {
    constructor({rifaDatalakeRawFileStorage, uuidv4}) {
        this.rifaDatalakeRawFileStorage = rifaDatalakeRawFileStorage;
        this.uuidv4 = uuidv4;
        this.remoteKey = 'user';
    }

    async execute({ user }) {
        const userId = this.uuidv4();
        const userDTO = { userId, ...user };
        return { ok: true, user: userDTO };
    }
}

module.exports = UserCreateService;