"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { FerrisWheel } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import { Input } from './ui/input'

type previewCardProps = {
  name: string,
  price: string,
  currencyOption: "USD" | "POUND",
  theme: string | undefined
}

const PreviewCard = ({ name, price, currencyOption , theme} : previewCardProps) => {
  console.log(theme)
  return (
    <Card className="w-full md:w-[330px] rounded-3xl">
              <CardHeader className="rounded-t-3xl text-white" style={{background : theme}}>
                <CardTitle className="flex justify-between">
                  <h1 className="text-sm">{ name ? name : "Future AI Inc."}</h1>
                  <FerrisWheel />
                </CardTitle>
                <CardDescription className="text-white">
                  <div className='flex gap-2'>
                    <h1 className='text-xl font-semibold'>
                      {currencyOption}
                    </h1>
                    <h1 className="text-xl font-semibold  ">
                    {currencyOption === "USD" ? "$" : "£"}{price ? price : "160"}
                    </h1>
                  </div>
                  <h3 className="font-semibold my-4 tracking-wider">Monthly Subscription Fee</h3>
                  <div className="flex justify-between my-2">
                    <span>{ name ? name : "Future AI Inc."}</span>
                    <span>{currencyOption === "USD" ? "$" : "£"}{price ? price : "160"}</span>
                  </div>
                  <p className="border-b border-gray-400"></p>
                  <div className="flex justify-between my-2">
                    <span>Total</span>
                    <span>{currencyOption === "USD" ? "$" : "£"}{price ? price : "160"}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-4">
                <h3 className="font-semibold mb-4">Pay with crypto</h3>
              
                    <form>
                      <div className="grid w-full items-center gap-4">
                      <Select
                            defaultValue={"USDT"}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Payment Options" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USDC">USDC</SelectItem>
                            </SelectContent>
                          </Select>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" autoComplete="off" disabled placeholder="Enter your full name" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="email">E-mail</Label>
                          <Input
                            id="email"
                            className="outline-none"
                            autoComplete="off"
                            placeholder="your@gmail.com"
                            disabled
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            className="outline-none"
                            placeholder="Enter your phone"
                            autoComplete="off"
                            disabled
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="quantity">Quantity</Label>
                          <Input
                            id="quantity"
                            className="outline-none"
                            placeholder="1"
                            autoComplete="off"
                            disabled
                          />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                <button className="py-2 w-full bg-[#8c52ff] rounded-full font-bold text-white hover:bg-[#7846d6]" style={{background : theme}}>
                  Pay
                </button>
              </CardFooter>
          </Card>
  )
}

export default PreviewCard