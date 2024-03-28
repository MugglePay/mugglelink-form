import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bold, FerrisWheel } from "lucide-react";

import prisma from "@/db";
import MerchantForm from "@/components/MerchantForm";
import dynamic from "next/dynamic";
import Link from "next/link";
import { apiPrefix } from "@/lib/utils";

const AnimatedText = dynamic(()=>import("@/components/AnimatedText"), {ssr: false})
interface dataType {
  name: string;
  email: string;
  product: string;
  product_description: string; 
  price: number;
  receive_wallet: string;
  currency_option : string;
  payment_option: string;
  escrow_enabled: boolean;
  require_full_name: boolean;
  require_email: boolean;
  require_phone_no: boolean;
  email_receipt_to_buyer: boolean;
  email_receipt_to_self: boolean;
  color_pallet : string,
  company_image_url: string,
  product_image_url : string
  quantity_min: string,
  quantity_max: string,
}

async function insertMerchant(values: dataType) {
  "use server";
  try {
    console.log(values)
    const newProduct = await prisma.product.create({
      data: values,
    });

    
    console.log(newProduct);
    return newProduct;
  } catch (error) {
    console.error("Insert error", error);
  }
}

async function postData(data : dataType) {
  "use server"
  const jsonData = {
    "product": {
      "type": "payment",
      "price": data.price.toString(),
      "currency": data.currency_option,
      "name": data.product,
      "description": data.product_description ?? '', // Keeping original description
      "image_url": data.product_image_url, // Keeping original image URL
    },
    "merchant": {
      "name": data.name,
      "image_url": data.company_image_url, // Keeping original image URL
      "style": {
        "colors": {
          "qrCode": "#185290", // Keeping original color
          "primary": data.color_pallet ?? '#8C52FF', // Keeping original color
          "buttonText": "#FFFFFF" // Keeping original color
        }
      },
      "email" : data.email ?? ""
    },
    "fields": {
      "requires_name": data.require_full_name,
      "requires_email": data.require_email,
      "requires_shipping_address": false, // No equivalent in dataType, keeping false
      "requires_billing_address": false, // No equivalent in dataType, keeping false
      "requires_country": false, // No equivalent in dataType, keeping false
      "requires_quantity": {
        "min": parseInt(data.quantity_min), "max": parseInt(data.quantity_max)  // Keeping original values
      }
    },
};

if(data.require_phone_no){
jsonData.custom_fields.push(
  //@ts-ignore
  {
    "field": "Phone Number",
    "name": "Phone Number",
    "caption": "Please Enter your phone number"
  }
)
}
  // Default options are marked with *
  const response = await fetch(`${apiPrefix}/products`, {
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
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export default function Home() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 md:gap-10 mx-4 md:mx-auto w-[95%] lg:w-[70%] my-32 sm:my-56 tracking-wide" suppressHydrationWarning>
        <div className="flex flex-col items-center justify-center sm:items-start sm:justify-start w-full text-white">
          <h1 className="text-4xl md:text-6xl mb-10 font-bold">MuggleLink</h1>
          <div className="flex justify-center items-center gap-2 flex-wrap sm:flex-row">
            <h3 className="text-xl md:text-2xl text-align: center">Accept crypto on</h3>
            <AnimatedText/>
          </div>
          <ul className="list-disc list-inside ml-4 md:ml-10 my-8 text-base md:text-xl">
          <li> Accept crypto on telegram and universal Social Platform.</li>
            <li>Exchange Everything with an escrow payment protocol.</li>
            <li>The future of social marketplace</li>
          </ul>
          <div className="flex items-center justify-center"> {/* Parent container */}
        <a className="text-xl md:text-3xl" style={{ fontSize: "1rem", fontWeight: "normal", marginBottom: "15px"  }}>
        Stay tuned and be part of our journey from the very beginning!
        </a>
      </div>
        <div className="flex flex-col gap-2 items-center justify-center text-base font-semibold">
        <span className="py-2 px-6 md:px-20 bg-white rounded-full font-bold text-[#8c52ff] cursor-default text-xl">
  Accept Crypto in 1 min!
</span>

        
        <div className="flex items-center justify-center my-2 text-white">
          <h3 className="text-base md:text-xl font-semibold text-white">Join Muggle's Telegram Group</h3>
          <Link href="https://t.me/MuggleLink1" target="_blank" rel="noopener noreferrer">
            <Image
              src="/telegram.png"
              width={32}
              height={32}
              alt="Telegram"
            />
          </Link>
          </div>

        
    </div>
        </div>
        <div className="flex justify-center items-center w-full mt-6 px-4 sm:mt-0 sm:px-0">
          <Card className="w-full md:w-[350px] rounded-3xl">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <h1>AI Future Inc.</h1>
                <FerrisWheel />
              </CardTitle>
              <CardDescription>
                <h1 className="text-xl font-semibold text-[#8c52ff] mb-4">
                  $160
                </h1>
                <div className="flex justify-between text-gray-600 my-2">
                  <span>Monthly Subscription Fee</span>
                  <span>$160</span>
                </div>
                <p className="border-b border-gray-400"></p>
                <div className="flex justify-between text-gray-600 my-2">
                  <span>Total</span>
                  <span>$160</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Card className="p-0 bg-[#f8f6f7] rounded-lg">
                <CardHeader className="p-4">
                  <CardTitle className="flex justify-between">
                    <h1 className=" text-sm sm-text-base tracking-wide font-medium text-gray-600">
                      Pay with crypto
                    </h1>
                    <div className="flex gap-1">
                      <div className="h-6 w-auto">
                        <Image
                          src={"/Arbitrum.png"}
                          width={24}
                          height={24}
                          alt="arbitrum"
                          objectFit="contain"
                        />
                      </div>
                      <div className="h-6 w-auto">
                        <Image
                          src={"/eth.png"}
                          width={24}
                          height={24}
                          alt="eth"
                          objectFit="contain"
                        />
                      </div>
                      <div className="h-6 w-auto">
                        <Image
                          src={"/tron.png"}
                          width={24}
                          height={24}
                          alt="tron"
                          objectFit="contain"
                        />
                      </div>

                      <div className="h-6 w-auto">
                        <Image
                          src={"/USDT.png"}
                          width={24}
                          height={24}
                          alt="usdt"
                          objectFit="contain"
                        />
                      </div>
                      <div className="h-6 w-auto">
                        <Image
                          src={"/usdc.png"}
                          width={24}
                          height={24}
                          alt="usdc"
                          objectFit="contain"
                        />
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <div className="py-4 px-10 border bg-white rounded"></div>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">E-mail</Label>
                      <div className="py-4 px-10 border bg-white rounded"></div>
                    </div>
                  </div>
                </form>
                </CardContent>
                <CardFooter className="flex justify-between"></CardFooter>
              </Card>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="py-2 px-20 bg-[#8c52ff] rounded-full font-bold text-white" style={{ backgroundColor: '#8c52ff', cursor: 'default' }}>
                Pay
                </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Card className=" w-[95%] md:w-[80%] m-auto mb-10 rounded-3xl">
        <CardHeader></CardHeader>
        <CardContent className="px-1 py-3 md:p-6">
          <MerchantForm insertApi={postData} />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
