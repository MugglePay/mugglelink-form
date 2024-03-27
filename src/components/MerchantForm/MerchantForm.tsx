'use client'

import AdvancedForm from '@/components/MerchantForm/AdvancedForm'
import DefaultForm from '@/components/MerchantForm/DefaultForm'
import { Button, LoadingButton } from '@/components/ui/button'
import { useAtomicSetter } from '@/lib/state'
import { contrast } from '@/lib/utils'
import { merchantAtom } from '@/states/merchant.state'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

const defaultForm = z.object({
  name: z.string().min(1, { message: 'Name is required' }), // Brand Name
  company_image_url: z.optional(z.any()), // Brand Image
  email: z.string().email({ message: 'Invalid email address' }),
  product: z.string().min(1, { message: 'Product Name is required' }),
  product_image_url: z.optional(z.any()),
  product_description: z.optional(z.string()),
  currency_option: z.enum(['USD']),
  price: z.coerce
    .number()
    .positive('Product price must be greater than zero')
    .min(0.01, 'Minimum Product price is 0.01 USD')
})

const advancedForm = z.object({
  require_data_collections: z.optional(z.array(z.string())),
  require_email_notifications: z.optional(z.array(z.string())),
  /*email_receipt_to_buyer: z.optional(z.boolean()),
  email_receipt_to_self: z.optional(z.boolean()),*/
  color_pallet: z.optional(z.string()),
  quantity_max: z.string().min(1, { message: 'Quantity is required' }),
  quantity_min: z.string().min(1, { message: 'Quantity is required' }),
  custom_fields: z.array(
    z.object({
      field: z.string().min(1, { message: 'Field Key is required' }),
      name: z.string().min(1, { message: 'Field Name is required' }),
      caption: z.string().optional()
    })
  )
}).refine((data) => {
  return Number(data.quantity_max) >= Number(data.quantity_min)
}, {
  message: 'Quantity max must be higher than or equal to Quantity min',
  path: ['quantity_max']
})

const schema = z
  .intersection(defaultForm, advancedForm)

// generate form types from zod validation schema
export type MerchantSchema = z.infer<typeof schema>;

// eslint-disable-next-line no-unused-vars
const MerchantForm = () => {
  const setMerchant = useAtomicSetter(merchantAtom)
  const [loading, setLoading] = useState<boolean>(false)
  const [showAdvancedForm, setShowAdvancedForm] = useState<boolean>(false)

  const form = useForm<MerchantSchema>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      // Default Form
      name: '',
      company_image_url: '',
      email: '',
      product: '',
      product_image_url: '',
      product_description: '',
      currency_option: 'USD',
      price: 0,
      // Advanced Form
      require_data_collections: [],
      require_email_notifications: [],
      /*email_receipt_to_buyer: false,
      email_receipt_to_self: false,*/
      color_pallet: '#8c52ff',
      quantity_min: '1',
      quantity_max: '10000',
      custom_fields: []
    },
    resolver: zodResolver(schema)
  })

  const watch = form.watch()

  const uploadImage = async (file: File) => {
    // Get Presigned URL
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type
        })
      }
    )

    if (response.ok) {
      const { url, fields, fileUrl } = await response.json()

      const formData = new FormData()
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      formData.append('file', file)

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData
      })

      if (uploadResponse.ok) {
        return fileUrl
      }

      throw new Error('Image Upload Failed')
    } else {
      throw new Error('Failed to get pre-signed URL.')
    }
  }

  const onSubmit: SubmitHandler<MerchantSchema> = async (data) => {
    setLoading(true)
    try {
      const { product_image_url, company_image_url, color_pallet, require_data_collections } = data

      const theme = color_pallet || '#8c52ff'

      // Upload Product image
      let productImage = product_image_url?.file

      if (productImage && typeof productImage !== 'string') {
        productImage = await uploadImage(product_image_url?.file)
      }

      // Upload Company image
      let companyImage = company_image_url?.file

      if (companyImage && typeof companyImage !== 'string') {
        companyImage = await uploadImage(company_image_url?.file)
      }

      const payload = {
        product: {
          type: 'payment',
          price: data.price.toString(),
          currency: data.currency_option,
          name: data.product,
          description: data.product_description || '', // Keeping original description
          image_url: productImage || '' // Keeping original image URL
        },
        merchant: {
          name: data.name,
          image_url: companyImage || '', // Keeping original image URL
          style: {
            colors: {
              qrCode: '#185290', // Keeping original color
              primary: theme, // Keeping original color
              buttonText: contrast(theme) // Keeping original color
            }
          },
          email: data.email || ''
        },
        fields: {
          requires_name: require_data_collections?.includes('require_full_name'),
          requires_email: require_data_collections?.includes('require_email'),
          requires_shipping_address: require_data_collections?.includes('require_shipping_address'), // No equivalent in dataType, keeping false
          requires_billing_address: false, // No equivalent in dataType, keeping false
          requires_country: false, // No equivalent in dataType, keeping false
          requires_quantity: {
            min: parseInt(data.quantity_min),
            max: parseInt(data.quantity_max) // Keeping original values
          }
        },
        custom_fields: data.custom_fields || []
      }

      if (require_data_collections?.includes('require_phone_no')) {
        payload.custom_fields.push(
          {
            field: 'Phone Number',
            name: 'Phone Number',
            caption: 'Please Enter your phone number'
          }
        )
      }

      // Default options are marked with *
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        const val = await res.json()

        setLoading(false)
        form.reset()

        window.location.href = `${process.env.NEXT_PUBLIC_INVOICE_URL}?pid=${val.data.product_id}`
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    setMerchant(form.getValues())
  }, [watch])

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col" noValidate>
        <h2 className="mb-8 text-2xl font-bold text-primary">Create your MugglePay Link</h2>

        <DefaultForm />

        {showAdvancedForm && (
          <>
            <div className="my-4" />
            <AdvancedForm />
          </>
        )}

        <Button variant="link" type="button" className="mt-2 flex items-center gap-1" size="sm"
                onClick={() => {
                  setShowAdvancedForm((old) => !old)

                  form.setValue('require_data_collections', [])
                  form.setValue('require_email_notifications', [])
                  form.setValue('color_pallet', '#8c52ff')
                  form.setValue('quantity_min', '1')
                  form.setValue('quantity_max', '10000')
                  form.setValue('custom_fields', [])
                }}>
          {showAdvancedForm ? <ChevronUp /> : <ChevronDown />}
          {showAdvancedForm ? 'Hide' : 'Show'} Advance Form
        </Button>

        <LoadingButton type="submit"
                       className="mt-8 w-full"
                       variant="default"
                       size="lg"
                       loading={loading}>
          Submit
        </LoadingButton>
      </form>
    </FormProvider>
  )
}

export default MerchantForm
