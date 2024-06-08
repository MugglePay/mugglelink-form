import { MerchantSchema } from '@/components/MerchantForm/MerchantForm'
import { atomic } from '@/lib/state'

export const merchantAtom = atomic<MerchantSchema | undefined>(undefined)
