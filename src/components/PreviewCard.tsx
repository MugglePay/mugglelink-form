'use client'
import { Separator } from '@/components/ui/separator'
import { useAtomicValue } from '@/lib/state'
import { contrast } from '@/lib/utils'
import { merchantAtom } from '@/states/merchant.state'
import Image from 'next/image'
import React, { useMemo } from 'react'
import {
  Card,
  CardContent,
  CardFooter
} from './ui/card'
import { FerrisWheel } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import { Input } from './ui/input'

const PreviewCard = () => {
  const merchant = useAtomicValue(merchantAtom)

  const price = useMemo(() => {
    return `${merchant?.currency_option === 'USD' ? '$' : '£'}${merchant?.price || '160'}`
  }, [merchant])

  const theme = useMemo(() => {
    const color = merchant?.color_pallet || '#8c52ff'
    return { backgroundColor: color, color: contrast(color) }
  }, [merchant])

  return (
    <div className="sticky top-[10px] h-fit w-full md:max-w-[330px]">
      <h2 className="mb-2 text-lg font-bold text-primary">Preview</h2>
      <Card className="rounded-3xl ">
        <CardContent className="p-0">
          <div className="flex flex-col gap-4 rounded-t-3xl px-6 py-4" style={theme}>
            <div className="flex items-center gap-2">
              {merchant?.company_image_url?.preview ? <Image
                src={merchant?.company_image_url?.preview}
                alt="Brand Logo"
                width={100}
                height={100}
                className="h-auto w-[30px] object-cover" // Reduce icon size by setting a fixed width/height
              /> : <FerrisWheel />}
              <h1 className="text-sm font-semibold leading-none tracking-tight">{merchant?.name || 'Brand name'}</h1>
            </div>
            <div className="mt-1 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-wider">
                  {merchant?.product || 'Product Name'}
                </h3>
                {merchant?.product_image_url?.preview ? <Image
                  src={merchant?.product_image_url?.preview}
                  alt="Product Logo"
                  width={100}
                  height={100}
                  className="h-auto w-[30px] object-cover" // Reduce icon size by setting a fixed width/height
                /> : <FerrisWheel />}
              </div>

              <div className="flex gap-2 text-xl font-semibold">
                <span>{merchant?.currency_option || 'USD'}</span>
                <span>{price}</span>
              </div>

              <div className="flex flex-col text-sm">
                <div className="flex items-center justify-between">
                  <span>{merchant?.product_description ? merchant?.product_description : (merchant?.product || 'Product Description')}</span>
                  <span>{price}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span>{price}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4">
            <h3 className="mb-4 font-semibold">Pay with crypto</h3>
            <div className="grid w-full items-center gap-4">
              <Select defaultValue={'USDT-Arbitrum'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Payment Options" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDT-Arbitrum">USDT-Arbitrum</SelectItem>
                  <SelectItem value="USDT-Trc20<">USDT-Trc20</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="USDC-Erc20">USDC-Erc20</SelectItem>
                  <SelectItem value="USDT-Erc20">USDT-Erc20</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <div className="rounded border bg-white px-10 py-4"></div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <div className="rounded border bg-white px-10 py-4"></div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <div className="rounded border bg-white px-10 py-4"></div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="quantity">Quantity</Label>
                <div className="rounded border bg-white px-10 py-4"></div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div
            className="w-full rounded-md px-20 py-2 text-center font-bold text-white"
            style={{ ...theme, cursor: 'default' }}
          >
            Pay
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PreviewCard
