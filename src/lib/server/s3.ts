import AWS from "aws-sdk";

export async function uploadToS3(file: File) {
  try {
    AWS.config.update({
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    });

    const s3 = new AWS.S3({
      region: "ap-southeast-1",
    });

    const file_key = `uploads/${Date.now()}-${file.name.replace(/ /g, "-")}`;
    console.log("Generated File key in S3:", file_key);

    const params = {
      Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
      Key: file_key,
      Body: file,
      ContentType: file.type,
    };

    const upload = await s3.upload(params).promise();

    console.log("Uploaded successfully:", upload);

    const returnData = {
      file_key: file_key,
      file_name: file.name,
      url: upload.Location,
    };
    console.log("S3 return data:", returnData);
    return returnData;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw error;
  }
}

export function getS3Url(file_key: string) {
  if (!process.env.VITE_AWS_BUCKET_NAME) {
    throw new Error("VITE_AWS_BUCKET_NAME is not defined");
  }
  const url = `https://${process.env.VITE_AWS_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/${file_key}`;
  return url
}
