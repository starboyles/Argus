import AWS from "aws-sdk";
export async function uploadToS3(file: File) {
  try {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.AWS_BUCKET_NAME,
      },
      region: "ap-southeast-1",
    });

    const file_Key =
      "uploads/" + Date.now().toString() + file.name.replace(" ", "-");

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: file_Key,
      Body: file,
    };
    const upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "uploading to s3...",
          parseInt(((evt.loaded * 100) / evt.total).toString())
        );
      })
      .promise();

    await upload.then((data) => {
      console.log("uploaded successfully to s3", file_Key);
    });

    return Promise.resolve({
      file_Key,
      file_name: file.name,
    });
  } catch (error) {}
}

export function getS3Url(file_Key: string) {
  const url = `https://${process.env.AWS_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/${file_Key}`;
  return url;
}
