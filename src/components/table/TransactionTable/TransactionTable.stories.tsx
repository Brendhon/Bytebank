import { Meta, StoryObj } from '@storybook/react'
import TransactionTable from './TransactionTable'
import { ITransaction } from '@/types/transaction'

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
const sampleData: ITransaction[] = [
  { id: "1", date: '02/01/2026', alias: 'Freelance', desc: 'deposit', value: 1200 },
  { id: "2", date: '06/01/2026', alias: 'Pix João', desc: 'transfer', value: -300 },
  { id: "3", date: '11/01/2026', alias: 'Spotify', desc: 'payment', value: -30 },
  { id: "4", date: '16/01/2026', alias: 'Reembolso Ana', desc: 'deposit', value: 450 },
  { id: "5", date: '21/01/2026', alias: 'Mercado', desc: 'payment', value: -200 },
  { id: "6", date: '26/01/2026', alias: 'Pix Pedro', desc: 'transfer', value: -100 },
  { id: "7", date: '29/01/2026', alias: 'Cinema', desc: 'payment', value: -50 },
  { id: "8", date: '31/01/2026', alias: 'Salário', desc: 'deposit', value: 3000 },
  { id: "9", date: '03/02/2026', alias: 'Aluguel', desc: 'payment', value: -1200 },
  { id: "10", date: '07/02/2026', alias: 'Pix Maria', desc: 'transfer', value: -250 },
  { id: "11", date: '12/02/2026', alias: 'Academia', desc: 'payment', value: -100 },
  { id: "12", date: '17/02/2026', alias: 'Reembolso Lucas', desc: 'deposit', value: 600 },
  { id: "13", date: '22/02/2026', alias: 'Farmácia', desc: 'payment', value: -75 },
  { id: "14", date: '27/02/2026', alias: 'Pix Carla', desc: 'transfer', value: -180 },
  { id: "15", date: '01/03/2026', alias: 'Saque ATM', desc: 'withdrawal', value: -200 },
  { id: "16", date: '05/03/2026', alias: 'Salário', desc: 'deposit', value: 2800 },
  { id: "17", date: '09/03/2026', alias: 'Restaurante', desc: 'payment', value: -150 },
  { id: "18", date: '13/03/2026', alias: 'Pix Eduardo', desc: 'transfer', value: -400 },
  { id: "19", date: '18/03/2026', alias: 'Netflix', desc: 'payment', value: -40 },
  { id: "20", date: '23/03/2026', alias: 'Reembolso Clara', desc: 'deposit', value: 500 },
  { id: "21", date: '28/03/2026', alias: 'Uber', desc: 'payment', value: -35 },
  { id: "22", date: '02/04/2026', alias: 'Pix Felipe', desc: 'transfer', value: -220 },
  { id: "23", date: '06/04/2026', alias: 'Saque ATM', desc: 'withdrawal', value: -150 },
  { id: "24", date: '10/04/2026', alias: 'Salário', desc: 'deposit', value: 3200 },
]

export const Default: Story = {
  args: {
    pageSize: 10,
    transactions: sampleData,
    onEdit: () => alert('edit transaction'),
    onDelete: () => alert('delete transaction'),
  },
}
