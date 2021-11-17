import { ComponentStory, ComponentMeta } from '@storybook/react';

import ErrorMessage from './ErrorMessage';

export default {
  title: 'Components/ErrorMessage',
  component: ErrorMessage
} as ComponentMeta<typeof ErrorMessage>;

export const Template: ComponentStory<typeof ErrorMessage> = args => (
  <ErrorMessage {...args} />
);

Template.args = {
  error: { name: 'Error', message: 'Something is wrong!' }
};
