import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * Formats a date to the pattern: 'Thursday, 18/04/2025'
 * @param date - Standard Date object
 * @returns Formatted date string
 * @throws {Error} If date is not a valid Date object
 */
export const formatDateToLong = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('formatDateToLong: date must be a valid Date object')
  }
  
  return format(date, "EEEE, dd/MM/yyyy", { locale: ptBR })
}

/**
 * Formats a date to the pattern: '18/04/2025'
 * @param date - Standard Date object
 * @returns Formatted date string
 * @throws {Error} If date is not a valid Date object
 */
export const formatDateToShort = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('formatDateToShort: date must be a valid Date object')
  }
  
  return format(date, "dd/MM/yyyy", { locale: ptBR })
}

/**
 * Formats a monetary value in Brazilian format (R$)
 * @param value - Number to be formatted
 * @returns Formatted currency string
 * @throws {Error} If value is not a valid number
 */
export const formatCurrency = (value: number): string => {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error('formatCurrency: value must be a valid number')
  }
  
  if (!isFinite(value)) {
    throw new Error('formatCurrency: value must be a finite number')
  }
  
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    currencyDisplay: 'symbol',
  }).format(value);
}
