import { Meta, StoryObj } from '@storybook/react'
import TransactionTable from './TransactionTable'
import { Transaction } from '@/types/transaction'

const meta: Meta<typeof TransactionTable> = {
  component: TransactionTable,
  tags: ['autodocs'],
  argTypes: {
    onEdit: { action: 'onEdit' },
    onDelete: { action: 'onDelete' },
  },
}

export default meta
type Story = StoryObj<typeof TransactionTable>

// some sample data to show pagination
const sampleData: Transaction[] = [
  { date: '02/01/2026', alias: 'Freelance',      type: 'Depósito',      value: 1200 },
  { date: '06/01/2026', alias: 'Pix João',       type: 'Transferência', value: -300 },
  { date: '11/01/2026', alias: 'Spotify',        type: 'Pagamento',     value: -30 },
  { date: '16/01/2026', alias: 'Reembolso Ana',  type: 'Depósito',      value: 450 },
  { date: '21/01/2026', alias: 'Mercado',        type: 'Pagamento',     value: -200 },
  { date: '26/01/2026', alias: 'Pix Pedro',      type: 'Transferência', value: -100 },
  { date: '29/01/2026', alias: 'Cinema',         type: 'Pagamento',     value: -50 },
  { date: '31/01/2026', alias: 'Salário',        type: 'Depósito',      value: 3000 },
  { date: '03/02/2026', alias: 'Aluguel',        type: 'Pagamento',     value: -1200 },
  { date: '07/02/2026', alias: 'Pix Maria',      type: 'Transferência', value: -250 },
  { date: '12/02/2026', alias: 'Academia',       type: 'Pagamento',     value: -100 },
  { date: '17/02/2026', alias: 'Reembolso Lucas',type: 'Depósito',      value: 600 },
  { date: '22/02/2026', alias: 'Farmácia',       type: 'Pagamento',     value: -75 },
  { date: '27/02/2026', alias: 'Pix Carla',      type: 'Transferência', value: -180 },
  { date: '01/03/2026', alias: 'Saque ATM',      type: 'Saque',         value: -200 },
  { date: '05/03/2026', alias: 'Salário',        type: 'Depósito',      value: 2800 },
  { date: '09/03/2026', alias: 'Restaurante',    type: 'Pagamento',     value: -150 },
  { date: '13/03/2026', alias: 'Pix Eduardo',    type: 'Transferência', value: -400 },
  { date: '18/03/2026', alias: 'Netflix',        type: 'Pagamento',     value: -40 },
  { date: '23/03/2026', alias: 'Reembolso Clara',type: 'Depósito',      value: 500 },
  { date: '28/03/2026', alias: 'Uber',           type: 'Pagamento',     value: -35 },
  { date: '02/04/2026', alias: 'Pix Felipe',     type: 'Transferência', value: -220 },
  { date: '06/04/2026', alias: 'Saque ATM',      type: 'Saque',         value: -150 },
  { date: '10/04/2026', alias: 'Salário',        type: 'Depósito',      value: 3200 },
]

export const Default: Story = {
  args: {
    transactions: sampleData,
    pageSize: 10,
    onEdit: () => alert('edit transaction'),
    onDelete: () => alert('delete transaction'),
  },
}
