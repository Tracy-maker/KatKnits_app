import { convertFileToUrl } from "@/lib/utils";
import { Files } from "lucide-react";
import React, { useCallback, useState } from "react";

type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPaths[]) => {
   setFile(acceptedFiles);
   fieldChange(acceptedFiles);
   setFile(convertFileToUrl(acceptedFiles[0]))
  }, [file]);

  return <div>ProfileUploader</div>;
};

export default ProfileUploader;
