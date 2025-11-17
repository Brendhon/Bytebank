import UserActions from './UserActions';
import { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof UserActions> = {
  component: UserActions,
  decorators: [
    (Story) => (
      <div className='bg-dark p-4 rounded-sm flex items-center justify-end'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof UserActions> = {
  args: {
    userName: 'John Doe',
    onNavigate: (path: string) => alert(`Navigate to: ${path}`),
  },
};
