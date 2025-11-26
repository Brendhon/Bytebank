import { cva } from 'class-variance-authority';

/**
 * Button style variants using class-variance-authority
 * Defines different visual styles for the button component
 */
export const buttonVariants = cva(
  'button',
  {
    variants: {
      variant: {
        dark: 'button-dark',
        blue: 'button-blue',
        green: 'button-green',
        orange: 'button-orange',
        outlineGreen: 'button-outline-green',
        outlineOrange: 'button-outline-orange',
      },
    },
    defaultVariants: {
      variant: 'blue',
    },
  }
);

