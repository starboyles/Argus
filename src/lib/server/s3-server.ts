import AWS from "aws-sdk";
import fs from "fs";

export async function downloadFromS3(file_key: string) {
  try {
    AWS.config.update({
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3({
      region: "ap-southeast-1",
    });
    const params = {
      Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
      Key: file_key,
    };
    const obj = await s3.getObject(params).promise();
    const file_name = '/tmp/pdf-${Date.now()}.pdf'
    fs.writeFileSync(file_name, obj.Body as Buffer);
  } catch (error) {
    console.error(error);
    return null;
  }
}
