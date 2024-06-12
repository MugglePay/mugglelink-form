// import Hero from '@/components/Hero'
import PreviewCard from '@/components/PreviewCard'
import { Card, CardContent } from '@/components/ui/card'

import MerchantForm from '@/components/MerchantForm/MerchantForm'

export default function Home() {
  return (
    <div className="m-auto px-6 md:w-4/5 md:px-0">
      {/*<Hero /> */}

      <Card className="m-auto my-10 rounded-3xl">
        <CardContent className="flex flex-col items-center gap-8 px-4 py-3 md:p-6 lg:flex-row lg:items-start">
          <MerchantForm />
          <PreviewCard />
        </CardContent>
      </Card>
    </div>
  )
}
