import Hero from '@/components/Hero'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

import MerchantForm from '@/components/MerchantForm'
import { CustomField } from '@/components/CustomFieldForm'

interface dataType {
  name: string
  email: string
  product: string
  product_description: string
  price: number
  receive_wallet: string
  currency_option: string
  payment_option: string
  escrow_enabled: boolean
  require_full_name: boolean
  require_email: boolean
  require_phone_no: boolean
  require_shipping_address: boolean
  email_receipt_to_buyer: boolean
  email_receipt_to_self: boolean
  color_pallet: string
  company_image_url: string
  product_image_url: string
  quantity_min: string
  quantity_max: string
  custom_fields: CustomField[]
}

async function postData(data: dataType) {
  'use server'
  const jsonData = {
    product: {
      type: 'payment',
      price: data.price.toString(),
      currency: data.currency_option,
      name: data.product,
      description: data.product_description ?? '', // Keeping original description
      image_url: data.product_image_url // Keeping original image URL
    },
    merchant: {
      name: data.name,
      image_url: data.company_image_url, // Keeping original image URL
      style: {
        colors: {
          qrCode: '#185290', // Keeping original color
          primary: data.color_pallet ?? '#8c52ff', // Keeping original color
          buttonText: '#fff' // Keeping original color
        }
      },
      email: data.email ?? ''
    },
    fields: {
      requires_name: data.require_full_name,
      requires_email: data.require_email,
      requires_shipping_address: data.require_shipping_address, // No equivalent in dataType, keeping false
      requires_billing_address: false, // No equivalent in dataType, keeping false
      requires_country: false, // No equivalent in dataType, keeping false
      requires_quantity: {
        min: parseInt(data.quantity_min),
        max: parseInt(data.quantity_max) // Keeping original values
      }
    },
    custom_fields: data.custom_fields || []
  }

  if (data.require_phone_no) {
    jsonData.custom_fields.push(
      //@ts-ignore
      {
        field: 'Phone Number',
        name: 'Phone Number',
        caption: 'Please Enter your phone number'
      }
    )
  }
  // Default options are marked with *
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

export default function Home() {
  return (
    <>
      <Hero />

      <Card className=' m-auto mb-10 w-[95%] rounded-3xl md:w-4/5'>
        <CardHeader></CardHeader>
        <CardContent className='px-1 py-3 md:p-6'>
          <MerchantForm insertApi={postData} />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  )
}
