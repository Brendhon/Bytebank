import { Meta, StoryObj } from "@storybook/nextjs";
import CreditCardSession from "./CreditCardSession";

const meta: Meta<typeof CreditCardSession> = {
  component: CreditCardSession,
  tags: ["autodocs"],
  args: {
    physical: {
      name: "Joana Fonseca Gomes",
      number: "1234 5678 9012 3456",
      expiration: "12/34",
      cvv: "123",
    },
    digital: {
      name: "Joana Fonseca Gomes",
      number: "5532 6475 8570 4251",
      expiration: "03/25",
      cvv: "514",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CreditCardSession>;

export const Default: Story = {};
