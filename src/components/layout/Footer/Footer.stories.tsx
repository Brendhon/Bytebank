import { Meta, StoryObj } from '@storybook/nextjs';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};

export const WithContactInfo: Story = {
  args: {
    contactInfo: {
      phone: '(11) 99999-9999',
      email: 'teste@teste.com',
    },
  },
};