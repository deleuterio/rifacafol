// Service Method
const RaffleCreateReportService = require('./CreateReport.service');

/* Service dependencies */
const rifaDatalakeRawFileStorage = require('../../../../resource/file-storage/s3/RifaDatalakeRawFileStorage');
const workbookBuilder = require('../../../../resource/content/exceljs/exceljs-builder');
const rifaCafolReportEmail = require('../../../../resource/email/ses/RifaCafolReportEmail');
/* Service dependencies end */

module.exports = async ({ date }) => {
    const raffleCreateReportService = new RaffleCreateReportService({
        rifaDatalakeRawFileStorage,
        workbook: workbookBuilder(),
        rifaCafolReportEmail,
    });
    return await raffleCreateReportService.execute({ date });
};
