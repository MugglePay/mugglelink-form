import CustomFieldForm from '@/components/CustomFieldForm'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useFormContext } from 'react-hook-form'

const collections = [
  {
    id: 'require_full_name',
    label: 'Require Full Name'
  },
  {
    id: 'require_email',
    label: 'Require Email'
  },
  {
    id: 'require_phone_no',
    label: 'Require Phone Number'
  },
  {
    id: 'require_shipping_address',
    label: 'Require Shipping Address'
  }
]

const notifications = [
  {
    id: 'email_receipt_to_buyer',
    label: 'Send confirmation email with receipt to buyer'
  },
  {
    id: 'email_receipt_to_self',
    label: 'Send payment confirmation email to my account'
  }
]

const AdvancedForm = () => {
  const { control } = useFormContext()

  return (
    <div className="flex flex-col">
      <h4 className="text-base font-semibold">Advanced Form</h4>
      <Separator className="my-3" />
      <div className="space-y-4">
        <FormField
          control={control}
          name="require_data_collections"
          render={() => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium">Data Collection Opts</FormLabel>
              <div className="flex flex-col gap-2">
                {collections.map((item) => (
                  <FormField
                    key={item.id}
                    control={control}
                    name="require_data_collections"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== item.id
                                    )
                                  )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal leading-5 text-gray-600">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="require_email_notifications"
          render={() => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium">Email Notifications</FormLabel>
              <div className="flex flex-col gap-2">
                {notifications.map((item) => (
                  <FormField
                    key={item.id}
                    control={control}
                    name="require_email_notifications"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== item.id
                                    )
                                  )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal leading-5 text-gray-600">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="color_pallet"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Color Pallet</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                }}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Payment Options" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="#8c52ff">Default</SelectItem>
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
          )}
        />

        <div className="w-full space-y-1">
          <h4 className="text-sm font-medium">Quantity</h4>
          <div className="flex w-full gap-2">
            <FormField
              control={control}
              name="quantity_min"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-sm font-medium">Min</FormLabel>
                  <Input
                    type="number"
                    {...field}
                    min={1}
                    step={1}
                    onChange={(event) => {
                      let parsedValue = parseInt(
                        event.target.value,
                        10
                      )
                      parsedValue =
                        parsedValue <= 0 || isNaN(parsedValue)
                          ? 1
                          : parsedValue
                      field.onChange(
                        isNaN(parsedValue)
                          ? ''
                          : parsedValue.toString()
                      ) // Handle invalid input
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="quantity_max"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-sm font-medium">Max</FormLabel>
                  <Input
                    type="number"
                    {...field}
                    step={1}
                    min={1}
                    onChange={(event) => {
                      let parsedValue = parseInt(event.target.value, 10)
                      parsedValue =
                        parsedValue <= 0 || isNaN(parsedValue)
                          ? 1
                          : parsedValue
                      field.onChange(
                        isNaN(parsedValue) ? '' : parsedValue.toString()
                      ) // Handle invalid input
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="w-full space-y-1">
          <FormLabel className="text-sm font-medium">Custom Fields</FormLabel>
          <FormDescription>This section allows you to create custom fields for your form
            and collect information from there.</FormDescription>
          <CustomFieldForm />
        </div>
      </div>
    </div>
  )
}

export default AdvancedForm
