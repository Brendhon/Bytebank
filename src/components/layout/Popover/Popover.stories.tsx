import { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from '@/components/ui';
import { Popover } from './Popover';

// Define story type
type Story = StoryObj<typeof Popover>;

// Base component configuration in Storybook
const meta: Meta<typeof Popover> = {
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;

// Base template
const Template = (args: any) => <Popover {...args} />;

// Default story
export const Default: Story = {
  render: Template,
  args: {
    button: <Button variant="green">Abrir Popover</Button>,
    children: (
      <ul className="flex flex-col gap-4">
        <li className="hover:text-green cursor-pointer">Item 1</li>
        <li className="hover:text-green cursor-pointer">Item 2</li>
        <li className="hover:text-green cursor-pointer">Item 3</li>
      </ul>
    ),
  },
};
