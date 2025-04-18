'use client'

import { formatCurrency, formatDateToLong } from '@/lib/formatter'
import { Button } from '@headlessui/react'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface Props {
  name: string
  balance: number
  accountType?: string
  showBalance?: boolean
  date?: Date
}

export default ({
  name,
  balance,
  accountType = 'Conta Corrente',
  date = new Date(),
}: Props) => {
  // Use state to manage the visibility of the balance
  const [isBalanceVisible, setIsBalanceVisible] = useState(false)

  return (
    <div className="bg-dark text-white p-6 rounded-md shadow-md flex justify-between items-start gap-6 flex-col sm:flex-row">
      <div>
        <p className="text-24">Olá, {name}! :)</p>
        <p className="text-base mt-2">{formatDateToLong(date)}</p>
      </div>

      <div className="w-[125px] flex flex-col items-end gap-1">
        <div className="w-full flex items-center justify-between gap-2 text-orange font-medium text-16">
          <span>Saldo</span>
          <Button className="cursor-pointer" onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
            {isBalanceVisible ? <EyeOff size={24} /> : <Eye size={24} />}
          </Button>
        </div>

        <hr className="w-full border-orange my-2" />

        <span className="text-sm">{accountType}</span>
        <span className="text-lg font-bold">
          {isBalanceVisible ? formatCurrency(balance) : '••••••'}
        </span>
      </div>
    </div>
  )
}
