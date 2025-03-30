//here i have used blackblaze instead of aws s3

import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  endpoint: "https://s3.us-east-005.backblazeb2.com",
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: 'us-east-005',
  signatureVersion: 'v4',
  s3ForcePathStyle: true,
  sslEnabled: true,
});

const s3Bucket = process.env.S3_BUCKET;

export { s3, s3Bucket };