import { Meta, StoryObj } from '@storybook/react';
import Table from './Table';
import { TableColumn } from '@/types/ui';

const meta: Meta<typeof Table> = {
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    columns: [
      { label: 'Nome', accessor: 'name' },
      { label: 'Idade', accessor: 'age' },
      { label: 'Cidade', accessor: 'city' },
    ] as TableColumn<any>[],
    data: [
      { name: 'João', age: 30, city: 'São Paulo' },
      { name: 'Maria', age: 25, city: 'Rio de Janeiro' },
    ],
  },
};
