const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid').v1;

const {
    configs: {
        AWS_S3_ACCESS_KEY, AWS_S3_NAME, AWS_S3_REGION, AWS_S3_SECRET_KEY
    }
} = require('../configs');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY
});

const fileNameBuilder = (fileName, itemType, itemId) => {
    const fileExtension = fileName.split('.').pop();

    return `${itemType}/${itemId}/${uuid()}.${fileExtension}`;
};

module.exports = {
    uploadImage: (file, itemType, itemId) => {
        const { name, data, mimetype } = file;
        const uploadPath = fileNameBuilder(name, itemType, itemId.toString());

        return bucket.upload({
            Bucket: AWS_S3_NAME,
            Body: data,
            Key: uploadPath,
            ContentType: mimetype
        }).promise();
    }
};
