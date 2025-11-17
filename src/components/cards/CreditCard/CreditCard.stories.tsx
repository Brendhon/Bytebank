import type { Meta, StoryObj } from "@storybook/nextjs";
import CreditCard from "./CreditCard";

const meta: Meta<typeof CreditCard> = {
  component: CreditCard,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: 'select',
      options: ['physical', 'digital'], // Options for the variant prop
    }
  },
  args: {
    name: "Joana Fonseca Gomes",
    blocked: false,
    cvv: "123",
    number: "1234 5678 9012 3456",
    expiration: "12/34",
    variant: "physical",
  },
};

export default meta;
type Story = StoryObj<typeof CreditCard>;

export const PhysicalCard: Story = {
  args: {
    variant: "physical",
    showInfo: false,
  },
};

export const DigitalCardHidden: Story = {
  args: {
    variant: "digital",
    showInfo: false,
  },
};

export const DigitalCardVisible: Story = {
  args: {
    name: "Marcos",
    variant: "digital",
    showInfo: true,
    number: "5532 6475 8570 4251",
    expiration: "03/25",
    cvv: "514",
  },
};

export const BlockedCard: Story = {
  args: {
    variant: "physical",
    showInfo: false,
    blocked: true,
  },
};

