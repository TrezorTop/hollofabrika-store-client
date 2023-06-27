import { useState } from "react";

export const useFiles = () => {
  const [files, setFiles] = useState<File[]>()

  return {
    files,
    setFiles,
  }
}