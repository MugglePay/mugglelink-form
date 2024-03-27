'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { Input } from './ui/input'

// eslint-disable-next-line no-unused-vars
const ImageUploader = ({ onChange }: { onChange: (value: { file: File; preview: string }) => void }) => {
  const inputFile = useRef<HTMLInputElement>(null)
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File>()

  const handleClick = () => {
    inputFile.current?.click() // Optional chaining for safety
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = (e) => setPreviewImageUrl(e?.target?.result as string)
      reader.readAsDataURL(selectedFile)

      // Process the uploaded file (type casting for clarity)
      const file: File = selectedFile as File
      setImageFile(file)
    }
  }

  useEffect(() => {
    if (imageFile && previewImageUrl) {
      onChange({ file: imageFile, preview: previewImageUrl })
    }
  }, [imageFile, previewImageUrl])

  return (
    <div className="flex flex-col gap-2">
      <div
        className="relative flex aspect-auto h-[150px] w-[225px] cursor-pointer flex-col items-center justify-center rounded-md border-2"
        onClick={() => handleClick()}
      >
        {previewImageUrl ? (
          <Image
            src={previewImageUrl}
            alt="Preview"
            className="flex items-center justify-center object-contain p-3"
            fill
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 p-2 text-sm">
            <ImageIcon size={48} className="text-gray-500" />
            <h3 className="text-center text-sm font-medium text-gray-500">
              Upload your logo
            </h3>
          </div>
        )}

        <Input
          ref={inputFile}
          type="file"
          id="picture"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
}

export default ImageUploader
