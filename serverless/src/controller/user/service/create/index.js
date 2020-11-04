// Service Method
const UserCreateService = require('./Create.service');

/* Service dependencies */
const { uuidv4 } = require('../../../../shared/service-util');
/* Service dependencies end */

module.exports = async ({ userDTO }) => {
    const userCreateService = new UserCreateService({ uuidv4 });
    return await userCreateService.execute({ user: userDTO });
};