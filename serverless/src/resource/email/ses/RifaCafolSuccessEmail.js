/*Class dependencies*/
const SES = require('./ses-interface');
const config = require('../../../shared/config');
/*Class dependencies end*/


class RifaCafolSuccessEmail extends SES {
    constructor() {
        super({ templateId: config.SES_EMAIL_TEMPLATE_SUCCESS });
    }
}

module.exports = new RifaCafolSuccessEmail();