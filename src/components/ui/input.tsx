import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixContent?: React.ReactNode;
  suffixContent?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefixContent, suffixContent, ...props }, ref) => {
    const hasAdornment = Boolean(prefixContent) || Boolean(suffixContent)

    return (
      <>
        {hasAdornment ? (
          <div
            className={cn(
              'flex items-center justify-center gap-1.5 px-2.5 h-9 rounded-lg',
              'border border-input bg-transparent ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-1',
              'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 transition-all ease-in-out duration-300'
            )}
            data-disabled={props.disabled}
          >
            {prefixContent && <>{prefixContent}</>}
            <input
              type={type}
              className={cn(
                'flex h-full w-full rounded-lg bg-transparent py-1.5 text-sm file:bg-transparent file:text-sm file:font-medium',
                'placeholder:text-sm placeholder:text-muted-foreground shadow-none outline-none border-none',
                'focus-visible:outline-none focus-visible:border-none focus-visible:shadow-none',
                className
              )}
              ref={ref}
              {...props}
            />
            {suffixContent && <>{suffixContent}</>}
          </div>
        ) : (
          <input
            type={type}
            className={cn(
              'flex w-full rounded-lg border border-input bg-background text-sm h-9 py-1.5 px-2.5 placeholder:text-sm',
              'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
              'disabled:cursor-not-allowed disabled:opacity-50 transition-all ease-in-out duration-300',
              className
            )}
            ref={ref}
            {...props}
          />
        )}
      </>
    )
  }
)

Input.displayName = 'Input'

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
TextArea.displayName = 'TextArea'

export { Input, TextArea }
