import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * Formata uma data para o padrão: 'quinta-feira, 18/04/2025'
 * @param date Date padrão
 */
export const formatDateToLong = (date: Date): string => {
  return format(date, "EEEE, dd/MM/yyyy", { locale: ptBR })
}

/**
 * Formata uma data para o padrão: '18/04/2025'
 * @param date Date padrão
 */
export const formatDateToShort = (date: Date): string => {
  return format(date, "dd/MM/yyyy", { locale: ptBR })
}

/**
 * Formata um valor monetário no padrão brasileiro (R$)
 * @param value número a ser formatado
 */
export const formatCurrency = (value: number): string => {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    currencyDisplay: 'symbol',
  }).format(value);
}
