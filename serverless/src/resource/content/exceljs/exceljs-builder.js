const Exceljs = require('exceljs');

module.exports = () => {
    return new Exceljs.Workbook();
};
