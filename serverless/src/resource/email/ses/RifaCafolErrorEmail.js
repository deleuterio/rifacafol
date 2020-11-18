/*Class dependencies*/
const SES = require('./ses-interface');
const config = require('../../../shared/config');
/*Class dependencies end*/


class RifaCafolErrorEmail extends SES {
    constructor() {
        super({ templateId: config.SES_EMAIL_TEMPLATE_ERROR });
    }
}

module.exports = new RifaCafolErrorEmail();