import { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui';
import Popover from './Popover';

// Definindo o tipo de story
type Story = StoryObj<typeof Popover>;

// Configuração base do componente no Storybook
const meta: Meta<typeof Popover> = {
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;

// Template base
const Template = (args: any) => <Popover {...args} />;

// História padrão
export const Default: Story = {
  render: Template,
  args: {
    pButton: <Button variant="green">Abrir Popover</Button>,
    children: (
      <ul className="flex flex-col gap-4">
        <li className="hover:text-green cursor-pointer">Item 1</li>
        <li className="hover:text-green cursor-pointer">Item 2</li>
        <li className="hover:text-green cursor-pointer">Item 3</li>
      </ul>
    ),
  },
};
