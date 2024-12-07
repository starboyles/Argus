import React from "react";
import { useDropzone } from "react-dropzone";
import { Inbox } from "lucide-react";

const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {"application/pdf": [".pdf"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
        "application/epub+zip": [".epub"],
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".ppt", ".pptx"]  
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
        console.log(acceptedFiles);
    }

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
