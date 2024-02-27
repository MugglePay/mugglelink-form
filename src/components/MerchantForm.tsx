"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import prisma from "@/db";
import ImageUploder from "./ImageUploder";
import { Checkbox } from "./ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { AlertTriangle, FerrisWheel, QrCode } from "lucide-react";
import CopyComponent from "./CopyComponent";
import Image from "next/image";
import PreviewCard from "./PreviewCard";
import { useState } from "react";
import { redirect } from "next/navigation";
import QRCode from 'qrcode.react';

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  company_image_url : z.optional(z.string()),
  email: z.string().email({ message: "Invalid email address" }),
  product: z.string().min(1, { message: "Product is required" }),
  product_image_url : z.optional(z.string()),
  price: z.number().min(0.01, { message: "Price is required and should be greater than 0" }),
  receive_wallet: z.string().min(1, { message: "Wallet address is required" }),
  payment_option: z.enum([
    "USDT-Arbitrum 0.1",
    "USDT-Tron 1",
    "USDT-Erc20 10",
    "USDC-Erc20 10",
    "ETH 10",
  ]),
  currency_option: z.enum(["USD", "POUND"]),
  escrow_enabled: z.optional(z.boolean()),
  require_full_name: z.optional(z.boolean()),
  require_email: z.optional(z.boolean()),
  require_phone_no: z.optional(z.boolean()),
  email_receipt_to_buyer: z.optional(z.boolean()),
  email_receipt_to_self: z.optional(z.boolean()),
  color_pallet: z.optional(z.string())
});

const MerchantForm = ({ insertApi }: { insertApi: any }) => {
  //@ts-ignore
  const [formId, setFormID] = useState(null);
  const [URL, setURL] = useState('')
  const [theme, setTheme] = useState('#8C52FF');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company_image_url : "",
      email: "",
      product: "",
      product_image_url : "",
      currency_option: "USD",
      price: 0,
      receive_wallet: "",
      payment_option: "USDT-Arbitrum 0.1",
      escrow_enabled: false,
      require_full_name: false,
      require_email: false,
      require_phone_no: false,
      email_receipt_to_buyer: false,
      email_receipt_to_self: false,
      color_pallet : '#8C52FF'
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    //@ts-ignore
    values.price = parseInt(values.price);
    const product = await insertApi(values);
    console.log(product);

    setFormID(product.data.product_id);
    const url = `app.link?pid=${product.data.product_id}`;
    setURL(url);
    redirect(url);

    if (values) {
      alert("merchant Added");
    }

    setTimeout(() => {
      form.reset();
    }, 2000);
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between gap2 md:gap-20 mx-4 md:mx-auto w-[95%] md:w-[80%] my-20 ">
      <div className="flex justify-center items-center w-full">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className=" d-flex">
            <span style={{ color: "#8c52ff", fontSize: "25px", fontWeight: "bold" }}>Create your MuggleLink</span>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <h2 className="text-lg font-semibold">Step 1</h2>
                    <p className="text-sm text-gray-400 font-normal">
                      Add merchant or company name
                    </p>
                  </FormLabel>
                  <Input placeholder="ex- John" type="text" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
              control={form.control}
              name="company_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <p className="text-sm font-normal text-gray-400">
                      Company Image Url
                    </p>
                  </FormLabel>
                  <Input type="text" {...field} placeholder="https://example.com"/>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <h2 className="text-lg font-semibold">Step 2</h2>
                    <p className="text-sm font-normal text-gray-400">
                      Add product or service name
                    </p>
                  </FormLabel>
                  <Input type="text" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="product_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <p className="text-sm font-normal text-gray-400">
                      Product Image Url
                    </p>
                  </FormLabel>
                  <Input type="text" {...field} placeholder="https://example.com"/>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <h2 className="text-lg font-semibold">Step 3</h2>
                    <p className="text-sm font-normal text-gray-400">
                      Add the price you would like to receive
                    </p>
                  </FormLabel>
                  <div className="flex gap-6">
                    <div className=" basis-1/4">
                      <FormField
                        control={form.control}
                        name="currency_option"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Currency Options" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="POUND">POUND</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="basis-3/4">
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </div>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="receive_wallet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <h2 className="text-lg font-semibold">Step 4</h2>
                    <p className="text-sm font-normal text-gray-400">
                      Select the crypto currency you would like to receive and
                      enter the wallet address
                    </p>
                  </FormLabel>
                  <div className="flex gap-6">
                    <div className=" basis-1/4">
                      <FormField
                        control={form.control}
                        name="payment_option"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Payment Options" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USDT-Arbitrum 0.1">
                                  USDT-Arbitrum 0.1 withdraw fee
                                </SelectItem>
                                <SelectItem value="USDT-Tron 1">
                                  USDT-Tron 1 withdraw fee
                                </SelectItem>
                                <SelectItem value="USDT-Erc20 10">
                                  USDT-Erc20 10 withdraw fee
                                </SelectItem>
                                <SelectItem value="USDC-Erc20 10">
                                  USDC-Erc20 10 withdraw fee
                                </SelectItem>
                                <SelectItem value="ETH 10">
                                  ETH 10 withdraw fee
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="basis-3/4">
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                    </div>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="escrow_enabled"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <h2 className="text-lg font-semibold">Step 5</h2>
                    <p className="text-sm font-normal text-gray-400">
                      Enable escrow payment
                    </p>
                  </FormLabel>
                  <div className="flex items-center gap-6 mt-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label
                      className="text-gray-600 leading-5 text-sm"
                      htmlFor="escrow"
                    >
                      {" "}
                      Agreed to enable escrow payment and its terms. What is
                      escrow payment?
                    </Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="require_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <h2 className="text-lg font-semibold">Step 6</h2>
                      <p className="text-sm font-normal text-gray-400">
                        Select the collect data option
                      </p>
                    </FormLabel>
                    <div className="flex  items-center gap-6 mt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Label
                        className="text-gray-600 leading-5 text-sm"
                        htmlFor="escrow"
                      >
                        {" "}
                        Require Email
                      </Label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="require_full_name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex  items-center gap-6 mt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Label
                        className="text-gray-600 leading-5 text-sm"
                        htmlFor="escrow"
                      >
                        {" "}
                        Require full name
                      </Label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="require_phone_no"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex  items-center gap-6 mt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Label
                        className="text-gray-600 leading-5 text-sm"
                        htmlFor="escrow"
                      >
                        {" "}
                        Require phone number
                      </Label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="email_receipt_to_buyer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <h2 className="text-lg font-semibold">Step 7</h2>
                      <p className="text-sm font-normal text-gray-400">
                        Select email notification
                      </p>
                    </FormLabel>
                    <div className="flex  items-center gap-6 mt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Label
                        className="text-gray-600 leading-5 text-sm"
                        htmlFor="escrow"
                      >
                        {" "}
                        Send confirmation email with receipt to buyer
                      </Label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email_receipt_to_self"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex  items-center gap-6 mt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Label
                        className="text-gray-600 leading-5 text-sm"
                        htmlFor="escrow"
                      >
                        {" "}
                        Send payment confirmation email to my account
                      </Label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="color_pallet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <h2 className="text-lg font-semibold">Step 8</h2>
                    <p className="text-sm font-normal text-gray-400">
                      Select the color Pallet
                    </p>
                  </FormLabel>
                  <FormItem>
                    <Select
                      onValueChange={(value)=> {
                        field.onChange(value);
                        setTheme(value)
                        
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Payment Options" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="#8C52FF">Default</SelectItem>
                        <SelectItem value="#f5222d">Red</SelectItem>
                        <SelectItem value="#1677ff">Blue</SelectItem>
                        <SelectItem value="#fadb14">Yellow</SelectItem>
                        <SelectItem value="#fa8c16">Orange</SelectItem>
                        <SelectItem value="#a0d911">Lime</SelectItem>
                        <SelectItem value="#52c41a">Green</SelectItem>
                        <SelectItem value="#722ed1">Purple</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <p className="text-sm font-normal text-gray-400 flex gap-2 items-center">
                      <AlertTriangle size={14} /> Enter your email to Receive
                      notification
                    </p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="abc@gmail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <div className="flex flex-col mb-8">
        <div className="my-10">
          <h1 className="my-5 font-semibold">Link</h1>

          <CopyComponent id={formId} />
        </div>
        <div className="mb-8">
          <h1 className="my-2 font-semibold">QR Code</h1>
          <QRCode value={URL} size={80}/>
          {/* <Image src={"/qrcode.jpeg"} width={50} height={50} alt="qrcode" /> */}
        </div>
        <div className="mb-10">
          <h1 className="my-2 font-semibold">Preview</h1>
          <PreviewCard
            name={form.getValues("name")}
            currencyOption={form.getValues("currency_option")}
            price={form.getValues("price").toString()}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};

export default MerchantForm;
