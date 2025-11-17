import { Meta, StoryObj } from '@storybook/nextjs';
import Footer from './Footer';

const meta: Meta<typeof Footer> = {
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
