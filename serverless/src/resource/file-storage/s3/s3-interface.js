/* Standard and third-party imports */
const AWS = require('aws-sdk');
const fs = require('fs');

/*Class dependencies*/
const config = require('../../../shared/config');
/*Class dependencies end*/

/**
 * @class
 * @description An interface to implemnt methods to use aws-sdk s3 functions
 * @author Douglas Eleutério <douglaseleuterio@gmail.com>
 */
class S3 {
    /**
     * @constructor
     * @description Instantiate a S3 sdk
     * @param {Object} options
     * @param {String} options.bucket - The bucket to operate
     * @param {String} options.key - The key to operate
     */
    constructor({ bucket, key }) {
        this.bucket = bucket;
        this.key = key;

        this.s3 = new AWS.S3();
    }

    /**
     * @description Put object to s3 bucket-key
     * @param {Object} options
     * @param {String} options.filePath - The file path on application storage system
     * @param {String} options.key - The key to upload file including the file name and the file type
     * @param {String} options.mime - The file mime type
     * @returns {Object} An object with operation status code, file url, the s3 key, the s3 bucket, the file size and mime type
     */
    async upload({ filePath, key, mime }) {
        if (config.NODE_ENV === 'local') {
            return { statusCode: 200, key, mime, bucket: this.bucket };
        } else {
            const s3Obj = await this.s3
                .putObject({
                    Bucket: this.bucket,
                    Key: key,
                    Body: fs.createReadStream(filePath),
                    ContentType: mime,
                })
                .promise();

            const { statusCode } = s3Obj.$response.httpResponse;
            return { statusCode, key, mime, bucket: this.bucket };
        }
    }

    async get({ key, filePath }) {
        const file = require('fs').createWriteStream(filePath);
        await s3.getObject({
            Bucket: this,bucket,
            Key: key
        }).createReadStream().pipe(file);

        s3.getObject(params).createReadStream().pipe(file);
    }

    async getJSON({ key }) {
        const data = await s3.getObject({
            Bucket: this,bucket,
            Key: key
        }).promise();
        const json = JSON.parse(Buffer.from(data.Body).toString("utf8"));
        return json;
    }

    createRemotePath(remotePath) {
        if (this.key) {
            return `${this.key}/${remotePath}`;
        } else {
            return remotePath;
        }
    }
}

module.exports = S3;