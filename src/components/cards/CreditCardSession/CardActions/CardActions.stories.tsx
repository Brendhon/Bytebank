import { Meta, StoryObj } from "@storybook/nextjs";
import { CardActions } from "./CardActions";

const meta: Meta<typeof CardActions> = {
  component: CardActions,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: 'CardActions component provides visibility and block controls for credit cards with full accessibility support.',
      },
    },
  },
  argTypes: {
    type: {
      description: 'Type of credit card',
      control: 'select',
      options: ['physical', 'digital'],
    },
    isVisible: {
      description: 'Whether card information is currently visible',
      control: 'boolean',
    },
    isBlocked: {
      description: 'Whether card is currently blocked',
      control: 'boolean',
    },
    onToggleVisibility: {
      description: 'Callback to toggle card visibility',
      action: 'toggled visibility',
    },
    onToggleBlock: {
      description: 'Callback to toggle card block status',
      action: 'toggled block',
    },
  },
  args: {
    type: 'physical',
    isVisible: false,
    isBlocked: false,
    onToggleVisibility: () => {},
    onToggleBlock: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof CardActions>;

export const Default: Story = {};

export const Visible: Story = {
  args: {
    isVisible: true,
  },
};

export const Blocked: Story = {
  args: {
    isBlocked: true,
  },
};

export const VisibleAndBlocked: Story = {
  args: {
    isVisible: true,
    isBlocked: true,
  },
};

export const DigitalCard: Story = {
  args: {
    type: 'digital',
  },
};

