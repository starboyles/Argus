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

    const file_Key = `uploads/${Date.now()}-${file.name.replace(/ /g, "-")}`;

    const params = {
      Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
      Key: file_Key,
      Body: file,
      ContentType: file.type, 
    };

    const upload = await s3.upload(params).promise();

    console.log("Uploaded successfully:", upload);

    return {
      file_Key,
      file_name: file.name,
      url: upload.Location 
    };
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw error; 
  }
}
