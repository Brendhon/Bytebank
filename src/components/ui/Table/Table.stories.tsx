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
    pageSize: 5,
    columns: [
      { label: 'Nome', accessor: 'name' },
      { label: 'Idade', accessor: 'age' },
      { label: 'Cidade', accessor: 'city' },
    ] as TableColumn<any>[],
    data: [
      { name: 'João', age: 30, city: 'São Paulo' },
      { name: 'Maria', age: 25, city: 'Rio de Janeiro' },
      { name: 'Carlos', age: 40, city: 'Belo Horizonte' },
      { name: 'Ana', age: 22, city: 'Curitiba' },
      { name: 'Pedro', age: 35, city: 'Porto Alegre' },
      { name: 'Fernanda', age: 28, city: 'Salvador' },
      { name: 'Lucas', age: 19, city: 'Fortaleza' },
      { name: 'Juliana', age: 32, city: 'Recife' },
      { name: 'Rafael', age: 27, city: 'Manaus' },
      { name: 'Camila', age: 24, city: 'Brasília' },
      { name: 'Gustavo', age: 33, city: 'Florianópolis' },
      { name: 'Larissa', age: 29, city: 'Vitória' },
      { name: 'Bruno', age: 26, city: 'Goiânia' },
      { name: 'Patrícia', age: 31, city: 'Belém' },
      { name: 'Diego', age: 23, city: 'São Luís' },
      { name: 'Renata', age: 34, city: 'Maceió' },
      { name: 'Thiago', age: 21, city: 'Natal' },
      { name: 'Isabela', age: 36, city: 'João Pessoa' },
      { name: 'Eduardo', age: 38, city: 'Aracaju' },
      { name: 'Sofia', age: 20, city: 'Campo Grande' },
      { name: 'Felipe', age: 37, city: 'Cuiabá' },
      { name: 'Mariana', age: 39, city: 'Teresina' },
      { name: 'André', age: 18, city: 'Macapá' },
      { name: 'Beatriz', age: 41, city: 'Palmas' },
      { name: 'Rodrigo', age: 42, city: 'Boa Vista' },
      { name: 'Vanessa', age: 43, city: 'Rio Branco' },
      { name: 'Leandro', age: 44, city: 'Porto Velho' },
    ],
  },
};
