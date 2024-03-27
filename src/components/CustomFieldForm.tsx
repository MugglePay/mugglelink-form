"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import Image from "next/image";
import { ImageIcon, Upload, UploadIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ImageUploder = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        setSelectedFile(event.target?.result as string); // Cast to string
      };

      reader.onerror = (error: any) => {
        console.error("Error reading file:", error);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex gap-10 w-full">
      <div className="basis-1/4 h-[120px] w-full xl:w-[120px] mt-4 border-2  rounded-sm flex items-center justify-center flex-col relative aspect-[0]">
        {selectedFile ? (
          <Image
            src={selectedFile}
            alt="Preview"
            className="max-w-[120px] max-h-[120px] overflow-hidden object-cover rounded-lg"
            fill
          />
        ) : (
          <>
           <ImageIcon />
          </>
        )}
      </div>
      <div className="basis-3/4">
        <Label
          htmlFor="picture"
          className="h-full w-full flex items-center justify-center flex-col "
        >
          <Input type="file" id="picture"  style={{ display: "none" }}  onChange={handleFileChange} />
          <div className="text-sm w-full px-4 py-2 flex items-center justify-between border-2 rounded" >
            <h3 className="text-gray-400 font-normal">Upload the logo (Optional)</h3>
            <UploadIcon className="ml-2" />
          </div>
        </Label>
      </div>
    </div>
  );
};

export default ImageUploder;
