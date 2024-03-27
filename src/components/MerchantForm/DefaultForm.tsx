import ImageUploader from '@/components/ImageUploader'
import { Button } from '@/components/ui/button'
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input, TextArea } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

const ImageField = ({ onSelectImage }: {
  // eslint-disable-next-line no-unused-vars
  onSelectImage: (value: { file: string | File; preview: string } | undefined) => void
}) => {
  const [value, setValue] = useState<string>('url')

  const tabs = [
    {
      key: 'url',
      label: 'Paste Image URL'
    },
    {
      key: 'file',
      label: 'Upload an Image'
    }
  ]

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3">
        {tabs.map((tab) => {
          return (
            <Button key={tab.key}
                    size="sm"
                    type="button"
                    variant="link"
                    className={`${value !== tab.key ? 'text-primary underline' : 'text-gray-500 hover:no-underline'} h-6 text-xs font-medium first:border-r first:pl-0`}
                    onClick={() => {
                      onSelectImage(undefined)
                      setValue(tab.key)
                    }}>{tab.label}</Button>
          )
        })}
      </div>
      {value === 'url' ? (
        <Input
          type="text"
          placeholder="Link from the web"
          onChange={(e) => onSelectImage({ file: e.target.value, preview: e.target.value })}
        />
      ) : <ImageUploader onChange={(file) => onSelectImage(file)} />}
    </div>
  )
}

const DefaultForm = () => {
  const { control, setValue } = useFormContext()

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col">
        <h4 className="text-base font-semibold">Brand Information</h4>
        <Separator className="my-3" />
        <div className="space-y-4">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium" isRequired>Name</FormLabel>
                <FormDescription>Add your brand name</FormDescription>
                <Input type="text" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="company_image_url"
            render={() => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Logo</FormLabel>
                <ImageField onSelectImage={(value) => {
                  setValue('company_image_url', value)
                }} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium" isRequired>Email</FormLabel>
                <FormDescription>Enter your email to Receive notification.</FormDescription>
                <Input type="email"{...field} />
                <FormDescription className="italic">Upon entering your email, you will complete the
                  registration process on{' '}
                  <a
                    href="https://merchants.mugglepay.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    MugglePay
                  </a>
                  . This will grant you access to manage your orders and
                  cryptos.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <h4 className="text-base font-semibold">Product / Service Information</h4>
        <Separator className="my-3" />
        <div className="space-y-4">
          <FormField
            control={control}
            name="product"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium" isRequired>Name</FormLabel>
                <FormDescription>Add product or service name</FormDescription>
                <Input type="text" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="product_image_url"
            render={() => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Image</FormLabel>
                <ImageField onSelectImage={(value) => {
                  setValue('product_image_url', value)
                }} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="product_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Description</FormLabel>
                <FormDescription>Add the description of your product or service</FormDescription>
                <TextArea {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium" isRequired>Price</FormLabel>
                <FormDescription>Add the price you would like to receive</FormDescription>
                <Input type="number" {...field}
                       step={0.01}
                       min="0.01"
                       prefixContent={
                         <span className="flex h-full items-center justify-center text-sm font-semibold uppercase">USD</span>} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default DefaultForm
