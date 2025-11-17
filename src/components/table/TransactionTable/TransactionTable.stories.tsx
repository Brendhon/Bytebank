import { Meta, StoryObj } from '@storybook/nextjs'
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
  { _id: "1", date: '18/11/2025', alias: 'Salário', desc: 'deposit', value: 2500, type: "inflow" },
  { _id: "2", date: '21/11/2025', alias: 'Pix João', desc: 'transfer', value: 100, type: "inflow" },
  { _id: "3", date: '25/11/2025', alias: 'Aluguel', desc: 'payment', value: 1200, type: "outflow" },
  { _id: "4", date: '30/11/2025', alias: 'Reembolso Ana', desc: 'deposit', value: 300, type: "inflow" },
  { _id: "5", date: '02/12/2025', alias: 'Mercado', desc: 'payment', value: 200, type: "outflow" },
  { _id: "6", date: '05/12/2025', alias: 'Pix Maria', desc: 'transfer', value: 150, type: "outflow" },
  { _id: "7", date: '10/12/2025', alias: 'Academia', desc: 'payment', value: 100, type: "outflow" },
  { _id: "8", date: '15/12/2025', alias: 'Reembolso Lucas', desc: 'deposit', value: 400, type: "inflow" },
  { _id: "9", date: '20/12/2025', alias: 'Farmácia', desc: 'payment', value: 80, type: "outflow" },
  { _id: "10", date: '22/12/2025', alias: 'Pix Carla', desc: 'transfer', value: 200, type: "inflow" },
  { _id: "11", date: '28/12/2025', alias: 'Cinema', desc: 'payment', value: 50, type: "inflow" },
  { _id: "12", date: '30/12/2025', alias: 'Saque ATM', desc: 'withdrawal', value: 300, type: "outflow" },
  { _id: "13", date: '02/01/2026', alias: 'Freelance', desc: 'deposit', value: 1200, type: "inflow" },
  { _id: "14", date: '06/01/2026', alias: 'Pix João', desc: 'transfer', value: 300, type: "outflow" },
];

export const Default: Story = {
  args: {
    pageSize: 10,
    transactions: sampleData,
    onEdit: () => alert('edit transaction'),
    onDelete: () => alert('delete transaction'),
  },
}
