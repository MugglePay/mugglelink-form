import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { FerrisWheel } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

const AnimatedText = dynamic(() => import('@/components/AnimatedText'), {
  ssr: false
})

const Hero = () => {
  return (
    <div
      className="mx-4 my-32 flex w-[95%] flex-col items-center justify-between gap-2 tracking-wide sm:my-56 sm:flex-row md:mx-auto md:gap-10 lg:w-[70%]"
      suppressHydrationWarning
    >
      <div className="flex w-full flex-col items-center justify-center text-white sm:items-start sm:justify-start">
        <h1 className="mb-10 text-4xl font-bold md:text-6xl">
          MugglePay Links
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:flex-row">
          <h3 className="text-center text-xl md:text-2xl">
            Accept crypto on
          </h3>
          <AnimatedText/>
        </div>
        <ul className="my-8 ml-4 list-inside list-disc text-base md:ml-10 md:text-xl">
          <li> Accept crypto on telegram and universal Social Platform.</li>
          <li>Exchange Everything with an escrow payment protocol.</li>
          <li>The future of social marketplace</li>
        </ul>
        <div className="flex items-center justify-center">
          {' '}
          {/* Parent container */}
          <a
            className="text-xl md:text-3xl"
            style={{
              fontSize: '1rem',
              fontWeight: 'normal',
              marginBottom: '15px'
            }}
          >
            Stay tuned and be part of our journey from the very beginning!
          </a>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 text-base font-semibold">
          <span className="cursor-default rounded-full bg-white px-6 py-2 text-xl font-bold text-[#8c52ff] md:px-20">
            Accept Crypto in 1 min!
          </span>

          <div className="my-2 flex items-center justify-center text-white">
            <h3 className="text-base font-semibold text-white md:text-xl">
              Join Muggle&apos;s Telegram Group
            </h3>
            <Link
              href="https://t.me/MuggleLink1"
              target="_blank"
              rel="noopener noreferrer"
            >
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
      <div className="mt-6 flex w-full items-center justify-center px-4 sm:mt-0 sm:px-0">
        <Card className="w-full rounded-3xl md:w-[350px]">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <h1>AI Future Inc.</h1>
              <FerrisWheel/>
            </CardTitle>
            <CardDescription>
              <h1 className="mb-4 text-xl font-semibold text-[#8c52ff]">
                $160
              </h1>
              <div className="my-2 flex justify-between text-gray-600">
                <span>Monthly Subscription Fee</span>
                <span>$160</span>
              </div>
              <p className="border-b border-gray-400"></p>
              <div className="my-2 flex justify-between text-gray-600">
                <span>Total</span>
                <span>$160</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Card className="rounded-lg bg-[#f8f6f7] p-0">
              <CardHeader className="p-4">
                <CardTitle className="flex justify-between">
                  <h1 className="text-sm font-medium tracking-wide text-gray-600 sm:text-base">
                    Pay with crypto
                  </h1>
                  <div className="flex gap-1">
                    <div className="h-6 w-auto">
                      <Image
                        src={'/arbitrum.svg'}
                        width={24}
                        height={24}
                        alt="arbitrum"
                        objectFit="contain"
                      />
                    </div>
                    <div className="h-6 w-auto">
                      <Image
                        src={'/Ethereum.svg'}
                        width={24}
                        height={24}
                        alt="eth"
                        objectFit="contain"
                      />
                    </div>
                    <div className="h-6 w-auto">
                      <Image
                        src={'/tron.svg'}
                        width={24}
                        height={24}
                        alt="tron"
                        objectFit="contain"
                      />
                    </div>

                    <div className="h-6 w-auto">
                      <Image
                        src={'/tether.svg'}
                        width={29}
                        height={29}
                        alt="usdt"
                        objectFit="contain"
                      />
                    </div>
                    <div className="h-6 w-auto">
                      <Image
                        src={'/usdc.svg'}
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
                      <div className="rounded border bg-white px-10 py-4"></div>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">E-mail</Label>
                      <div className="rounded border bg-white px-10 py-4"></div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div
              className="rounded-full bg-[#8c52ff] px-20 py-2 font-bold text-white"
              style={{ backgroundColor: '#8c52ff', cursor: 'default' }}
            >
              Pay
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Hero
