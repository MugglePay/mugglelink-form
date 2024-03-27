import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function contrast(hex: string) {
  if (hex.startsWith('#')) {
    hex = hex.slice(1)
  }

  if (hex.length === 3) {
    hex = hex.split('').map(c => (c + c)).join('')
  }

  const r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16)

  return ((r * 0.299 + g * 0.587 + b * 0.114) > 186) ? '#000' : '#FFFFFF'
}
