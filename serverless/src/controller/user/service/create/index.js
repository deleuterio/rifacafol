// Service Method
const UserCreateService = require('./Create.service');

/* Service dependencies */
const rifaDatalakeRawFileStorage = require('../../../../resource/file-storage/s3/RifaDatalakeRawFileStorage');
const { uuidv4 } = require('../../../../shared/service-util');
/* Service dependencies end */

module.exports = async ({ userDTO }) => {
    const userCreateService = new UserCreateService({ rifaDatalakeRawFileStorage, uuidv4 });
    return await userCreateService.execute({ user: userDTO });
};