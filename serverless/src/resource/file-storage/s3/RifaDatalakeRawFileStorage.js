// Third party dependencies
const fsPromises = require('fs').promises;

/*Class dependencies*/
const S3 = require('./s3-interface');
const config = require('../../../shared/config');
/*Class dependencies end*/

/**
 * @class
 * @description
 * @author Douglas Eleutério <douglaseleuterio@lett.digital>
 */
class RifaDatalakeRawFileStorage extends S3 {
    /**
     * @constructor
     * @description Set the default bucket and the default keys
     */
    constructor() {
        super({ bucket: config.BUCKET_RIFA_DATALAKE_RAW });
        this.tempFolder = '/tmp';
    }

    /**
     * @description Generetes a json file to upload to file storage
     * @param {String} filename - The file name without type
     * @param {Object} json - The json data to write on new file
     * @returns {String} The path of the recent created file
     */
    async createJSONFile(filename, json) {
        const data = JSON.stringify(json);
        const path = `${this.tempFolder}/${filename}`;
        await fsPromises.writeFile(path, data, { encoding: 'utf8' });
        return path;
    }

    /**
     * @description Deletes file from application storge
     * @param {String} filename - The file name without type
     * @returns {Boolean} A boolean representing the operation success
     */
    async deleteJSONfile(filename) {
        const path = `${this.tempFolder}/${filename}`;
        try {
            await fsPromises.unlink(path);
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = new RifaDatalakeRawFileStorage();