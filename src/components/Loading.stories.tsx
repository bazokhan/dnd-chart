import { ComponentStory, ComponentMeta } from '@storybook/react';

import Loading from './Loading';

export default {
  title: 'Components/Loading',
  component: Loading
} as ComponentMeta<typeof Loading>;

export const Template: ComponentStory<typeof Loading> = args => (
  <Loading {...args} />
);
