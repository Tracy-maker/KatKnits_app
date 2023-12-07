import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [fileUrl, setFileUrl] = useState("");

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <div>t1</div>
      ) : (
        <div className="file_uploader-box">
          <img src="https://img.icons8.com/?size=64&id=49332&format=png" width={96} />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
