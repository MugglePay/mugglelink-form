import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'

export interface CustomField {
  name: string
  field: string
  caption?: string
}

const CustomFieldForm = ({ form }: { form: any }) => {
  const [fields, setFields] = useState<CustomField[]>([])

  const handleAddField = () => {
    setFields([...fields, { name: '', field: '', caption: '' }])
  }

  const handleRemoveField = (index: number) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index))
  }

  const handleInputChange = (event: any, key: string, index: number) => {
    const { value } = event.target

    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, [key]: value } : field
      )
    )
  }

  useEffect(() => {
    form.setValue('custom_fields', fields)
  }, [fields])

  return (
    <div className='flex flex-col gap-6'>
      {fields.map((val, idx) => {
        return (
          <div
            className='flex w-full flex-col rounded border p-4'
            key={`field_${idx}`}
          >
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='text-lg font-medium'>Field {idx + 1}</h3>
              <Button
                type='button'
                size='icon'
                variant='ghost'
                className='text-red-500 hover:text-red-600'
                onClick={() => handleRemoveField(idx)}
              >
                <Trash2Icon />
              </Button>
            </div>
            <div className='flex flex-col gap-6'>
              <div className='flex w-full flex-col gap-6 xl:flex-row [&>*]:flex-1'>
                <FormField
                  control={form.control}
                  name={`custom_fields[${idx}].field`} // Add a name for the product description field
                  render={({ field }) => (
                    <FormItem key={`field_${idx}`} id={`field_${idx}_field`}>
                      <FormLabel>
                        <p className='text-center uppercase'>Key</p>
                      </FormLabel>
                      <Input
                        type='text'
                        {...field}
                        value={val.field}
                        onChange={(event) =>
                          handleInputChange(event, 'field', idx)
                        }
                      />
                      <FormDescription>e.g wallet</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`custom_fields[${idx}].name`} // Add a name for the product description field
                  render={({ field }) => (
                    <FormItem key={`field_${idx}`} id={`field_${idx}_name`}>
                      <FormLabel>
                        <p className='text-center uppercase'>Name</p>
                      </FormLabel>
                      <Input
                        type='text'
                        {...field}
                        value={val.name}
                        onChange={(event) =>
                          handleInputChange(event, 'name', idx)
                        }
                      />
                      <FormDescription>e.g Wallet Address</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`custom_fields[${idx}].caption`} // Add a name for the product description field
                render={({ field }) => (
                  <FormItem key={`field_${idx}`} id={`field_${idx}_caption`}>
                    <FormLabel>
                      <p className='text-center uppercase'>Caption</p>
                    </FormLabel>
                    <Input
                      type='text'
                      {...field}
                      value={val.caption}
                      onChange={(event) =>
                        handleInputChange(event, 'caption', idx)
                      }
                    />
                    <FormDescription>
                      e.g Enter your wallet address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )
      })}
      <Button
        type='button'
        variant='outline'
        size='sm'
        onClick={handleAddField}
      >
        <PlusIcon className='mr-1' /> Add{' '}
        {fields.length > 0 ? 'Other' : 'Custom'} Field
      </Button>
    </div>
  )
}

export default CustomFieldForm
