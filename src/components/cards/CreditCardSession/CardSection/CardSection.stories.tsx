import { Meta, StoryObj } from "@storybook/nextjs";
import { CardSection } from "./CardSection";
import { CreditCard } from "../../CreditCard/CreditCard";
import { CardActions } from "../CardActions/CardActions";

const meta: Meta<typeof CardSection> = {
  component: CardSection,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: 'CardSection component wraps a card with its title and actions, providing semantic structure for card sections.',
      },
    },
  },
  argTypes: {
    title: {
      description: 'Section title',
      control: 'text',
    },
    children: {
      description: 'Section content (card and actions)',
      control: false,
    },
  },
  args: {
    title: 'Physical Card',
    children: (
      <>
        <CreditCard
          variant="physical"
          showInfo={false}
          blocked={false}
          name="John Doe"
          number="1234 5678 9012 3456"
          expiration="12/25"
          cvv="123"
        />
        <CardActions
          type="physical"
          isVisible={false}
          isBlocked={false}
          onToggleVisibility={() => {}}
          onToggleBlock={() => {}}
        />
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof CardSection>;

export const Default: Story = {};

export const DigitalCard: Story = {
  args: {
    title: 'Digital Card',
    children: (
      <>
        <CreditCard
          variant="digital"
          showInfo={false}
          blocked={false}
          name="Jane Smith"
          number="5532 6475 8570 4251"
          expiration="03/25"
          cvv="514"
        />
        <CardActions
          type="digital"
          isVisible={false}
          isBlocked={false}
          onToggleVisibility={() => {}}
          onToggleBlock={() => {}}
        />
      </>
    ),
  },
};

