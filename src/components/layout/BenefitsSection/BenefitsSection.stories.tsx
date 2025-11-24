import { Meta, StoryObj } from '@storybook/nextjs';
import BenefitsSection from './BenefitsSection';

const meta: Meta<typeof BenefitsSection> = {
  component: BenefitsSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof BenefitsSection>;

export const Default: Story = {
  render: () => <BenefitsSection />,
};
