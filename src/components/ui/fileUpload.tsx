import { useDropzone } from "react-dropzone";
import { Inbox } from "lucide-react";
import { uploadToS3 } from "../../lib/server/s3";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const FileUpload = () => {
  const { mutate } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/v1/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/epub+zip": [".epub"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".ppt", ".pptx"],
    },
    multiple: true,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("File is too big! Max file size is 10MB. Compress!");
        return;
      }

      try {
        const data = await uploadToS3(file);
        if (!data.file_Key || !data.file_name) {
          alert("Sth went wrong -- check your uploads");
          return;
        }
        mutate({
            file_key: data.file_Key,
            file_name: data.file_name,
          },{
          onSuccess: (data) => {
            console.log(data);
          },
          onError: (err) => {
            console.log(err);
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="p-2 rounded-xl border-dashed border-2 cursor-pointer bg-white py-8 flex justify-center items-center flex-col">
      <div
        {...getRootProps([
          {
            className:
              "border-dashed border-2 rounded-xl bg-white py-8 flex justify-center items-center flex-col",
          },
        ])}
      >
        <input {...getInputProps()} />
        <>
          <div className="flex flex-col items-center justify-center">
            <Inbox className="w-10 h-10 text-blue-500 " />
            <p className="mt-4 text-sm text-slate-600">
              Drag & drop some files here, or click to select files.
            </p>
          </div>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
