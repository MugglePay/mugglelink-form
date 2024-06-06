'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const ImageUploader = () => {
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

  const onUpload = async () => {
    if (imageFile) {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filename: imageFile.name,
            contentType: imageFile.type
          })
        }
      )

      if (response.ok) {
        const { url, fields } = await response.json()

        const formData = new FormData()
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value as string)
        })
        formData.append('file', imageFile)

        const uploadResponse = await fetch(url, {
          method: 'POST',
          body: formData
        })

        if (uploadResponse.ok) {
          console.log(uploadResponse)
          console.log('Upload successful!')
        } else {
          console.error('S3 Upload Error:', uploadResponse)
        }
      } else {
        console.log('Failed to get pre-signed URL.')
      }
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <div
        className='relative flex aspect-auto size-[120px] cursor-pointer flex-col items-center justify-center rounded-sm border-2'
        onClick={() => handleClick()}
      >
        {previewImageUrl ? (
          <Image
            src={previewImageUrl}
            alt='Preview'
            className='max-h-[120px] max-w-[120px] overflow-hidden rounded-lg object-cover'
            fill
          />
        ) : (
          <div className='flex size-full flex-col items-center justify-center gap-2 p-2 text-sm'>
            <ImageIcon />
            <h3 className='text-center text-xs font-normal text-gray-400'>
              Upload the logo (Optional)
            </h3>
          </div>
        )}

        <Input
          ref={inputFile}
          type='file'
          id='picture'
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      <Button type='button' onClick={() => onUpload()} disabled={!imageFile}>
        Test Upload
      </Button>
    </div>
  )
}

export default ImageUploader
