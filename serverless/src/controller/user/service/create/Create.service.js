class UserCreateService {
    constructor({rifaDatalakeRawFileStorage, uuidv4}) {
        this.rifaDatalakeRawFileStorage = rifaDatalakeRawFileStorage;
        this.uuidv4 = uuidv4;
        this.remoteKey = 'user';
    }

    async execute({ user }) {
        const userId = this.uuidv4();
        const userDTO = { userId, ...user };
        await this._createUser({ filename: userId, data: userDTO });
        return { ok: true, user: userDTO };
    }

    /**
     * @private
     * @description Upload user to s3
     * @param {Object} options 
     */
    async _createUser({ filename, data }) {
        const mime = 'json';

        try {
            const filePath = await this.rifaDatalakeRawFileStorage.createJSONFile(`${filename}.${mime}`, data);
            return await this.rifaDatalakeRawFileStorage.upload({ filePath, key: this.remoteKey, mime });
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            this.rifaDatalakeRawFileStorage.deleteJSONfile(filename);
        }
    }
}

module.exports = UserCreateService;