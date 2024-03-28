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
import { useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import QRCode from "qrcode.react";
import { Mail } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  company_image_url: z.optional(z.string()),
  email: z.string().email({ message: "Invalid email address" }),
  product: z.string().min(1, { message: "Product is required" }),
  product_image_url: z.optional(z.string()),
  price: z.string().min(1, { message: "Price is required" }),
  currency_option: z.enum(["USD"]),
  require_full_name: z.optional(z.boolean()),
  require_email: z.optional(z.boolean()),
  require_phone_no: z.optional(z.boolean()),
  email_receipt_to_buyer: z.optional(z.boolean()),
  email_receipt_to_self: z.optional(z.boolean()),
  color_pallet: z.optional(z.string()),
  product_description: z
    .string()
    .min(1, { message: "Product Description is required" }),
    quantity_max: z.string().min(1, { message: "Quantity is required" }),
		quantity_min: z.string().min(1, { message: "Quantity is required" }),
		enable_peer_to_peer: z.optional(z.boolean()),
		merchant_address: z.string().optional(),
		custom_fields: z.array(
			z.object({
				field: z.string().min(1, { message: "Field Key is required" }),
				name: z.string().min(1, { message: "Field Name is required" }),
				caption: z.string().optional(),
			})
		),
	})
  .refine((data) => Number(data.quantity_max) >= Number(data.quantity_min), {
		message: "Quantity max must be higher than or equal to Quantity min",
		path: ["quantity_max"], // path of error
	});


const MerchantForm = ({ insertApi }: { insertApi: any }) => {
  //@ts-ignore
  const [formId, setFormID] = useState(null);
  const [URL, setURL] = useState("");
  const [theme, setTheme] = useState("#8C52FF");
  const [name, setName] = useState("");
  const submitButton = useRef<HTMLButtonElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company_image_url: "",
      email: "",
      product: "",
      product_image_url: "",
      currency_option: "USD",
      price: "",
      require_full_name: false,
      require_email: false,
      require_phone_no: false,
      email_receipt_to_buyer: false,
      email_receipt_to_self: false,
      color_pallet: "#8C52FF",
      product_description: "",
      quantity_min: "1",
      quantity_max: "10000",
      enable_peer_to_peer: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
		//@ts-ignore
    values.price = parseFloat(values.price);
		//@ts-ignore
	  submitButton.current.disabled = true;
	  const product = await insertApi(values);
	  console.log(product);

	  setFormID(product.data.product_id);
	  const url = `app.link?pid=${product.data.product_id}`;
	  setURL(url);
    if (values.email_receipt_to_self)
			fetch(
				`/api/sendgrid?email=${values.email}&name=${values.name}&address=${values.merchant_address}&price=${values.price}&description=${values.product_description}`
			);

		if (values) {
			alert("Product Added");
		}

		setTimeout(() => {
			form.reset();
		}, 2000);
		redirect(url);
	}

  return (
    <div className="flex flex-col sm:flex-row justify-between gap2 md:gap-20 mx-4 md:mx-auto w-[95%] md:w-[80%] my-20 ">
      <div className="flex justify-center items-center w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            <div className=" d-flex">
              <span
                style={{
                  color: "#8c52ff",
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                Create your MuggleLink
              </span>
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
                  <Input placeholder="" type="text" {...field} />
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
                      Company Image Url (optional)
                    </p>
                  </FormLabel>
                  <Input
                    type="text"
                    {...field}
                    placeholder="https://example.com"
                  />
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
                      Product Image Url (optional)
                    </p>
                  </FormLabel>
                  <Input
                    type="text"
                    {...field}
                    placeholder="https://example.com"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product_description" // Add a name for the product description field
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <h2 className="text-lg font-semibold">Step 3</h2>
                    <p className="text-sm font-normal text-gray-400">
                      Add the description of your product or service
                    </p>
                  </FormLabel>
                  <Input type="text" {...field} />
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
                    <h2 className="text-lg font-semibold">Step 4</h2>
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
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="basis-3/4">
                      <FormControl>
                        <Input type="number" {...field} step={0.01} />
                      </FormControl>
                    </div>
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
                      <h2 className="text-lg font-semibold">Step 5</h2>
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
                      <h2 className="text-lg font-semibold">Step 6</h2>
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
                    <h2 className="text-lg font-semibold">Step 7</h2>
                    <p className="text-sm font-normal text-gray-400">
                      Select the color Pallet
                    </p>
                  </FormLabel>
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setTheme(value);
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
              name="quantity_max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <h2 className="text-lg font-semibold">Step 8</h2>
                    <p className="text-sm font-normal text-gray-400">
                      Quantity
                    </p>
                  </FormLabel>
                  <div className="flex gap-6">
                    <div className=" basis-2/4">
                      <FormField
                        control={form.control}
                        name="quantity_min"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <p className="text-center">MIN</p>
                            </FormLabel>
                            <FormControl>
                        <Input type="number" 
                        {...field} 
                                min={1}
                        step={1} 
                        onChange={(event) => {
                          let parsedValue = parseInt(event.target.value, 10);
                          parsedValue = parsedValue <= 0 || isNaN(parsedValue) ? 1 : parsedValue;
                          field.onChange(isNaN(parsedValue) ? "" : parsedValue.toString());// Handle invalid input
                        }}/>
                      </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="basis-2/4">
                      <FormLabel>
                        <p className="pb-2 text-center">MAX</p>
                      </FormLabel>
                      <FormControl>
                        <Input type="number" 
                          {...field} step={1} 
                          min={1}
                        onChange={(event) => {
                          let parsedValue = parseInt(event.target.value, 10);
                          parsedValue = parsedValue <= 0 || isNaN(parsedValue) ? 1 : parsedValue;
                          field.onChange(isNaN(parsedValue) ? "" : parsedValue.toString()); // Handle invalid input
                        }}/>
                      </FormControl>
                    </div>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

<div className="flex flex-col">
              <FormField
                control={form.control}
                name="enable_peer_to_peer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <h2 className="text-lg font-semibold">Step 9</h2>
                      <p className="text-sm font-normal text-gray-400">
                        peer to peer mode
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
                        Enable peer to peer mode
                      </Label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("enable_peer_to_peer") && (
                <div className="mt-4"> {/* Add margin-top here */}
                  <FormField
                    control={form.control}
                    name="merchant_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Merchant Address</FormLabel>
                        <Input type="text" {...field} placeholder="Enter Merchant Address" />
                        <FormMessage />
                        <FormDescription>The payment will directly send to your account. Please make sure you have control of the address</FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <p className="text-sm font-normal text-gray-400 flex gap-2 items-center">
                      <Mail size={14} /> Enter your email to Receive
                      notification
                    </p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="alex@gmail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    <FormDescription>
                      Upon entering your email, you will complete the
                      registration process on{" "}
                      <a
                        href="https://merchants.mugglepay.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#007bff",
                          textDecoration: "underline",
                        }}
                      >
                        MugglePay
                      </a>
                      . This will grant you access to manage your orders and
                      cryptos.
                    </FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            

            <Button ref={submitButton} type="submit">
              Submit
            </Button>
            <div className="flex flex-col sm:flex-row items-center mt-4 gap-4">
                <div className="basis-1/2">
                  <h1 className="my-5 font-semibold">MuggleLink</h1>
                  <CopyComponent id={formId} />
                </div>
                <div className="basis-1/2">
                  {URL && (
                    <div className="mt-4">
                      <h1 className="my-5 font-semibold">QR Code</h1>
                      <QRCode value={URL} size={80} />
                    </div>
                  )}
                </div>
              </div>
          </form>
        </Form>
      </div>
      <div className="flex flex-col mb-8">
        <div className="mb-10">
          <h1 className="my-2 font-semibold">Preview</h1>
          <PreviewCard
            name={form.getValues("name")}
            currencyOption={form.getValues("currency_option")}
            price={form.getValues("price")}
            theme={theme}
            productName={form.getValues("product")}
          />
        </div>
        {URL && (
          <div className="mb-8">
            <h1 className="my-2 font-semibold">QR Code</h1>
            <QRCode value={URL} size={80} />
            {/* <Image src={"/qrcode.jpeg"} width={50} height={50} alt="qrcode" /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantForm;
