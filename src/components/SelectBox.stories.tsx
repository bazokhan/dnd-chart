import { ComponentStory, ComponentMeta } from '@storybook/react';
import { columns } from '../data';

import SelectBox from './SelectBox';

export default {
  title: 'Components/SelectBox',
  component: SelectBox
} as ComponentMeta<typeof SelectBox>;

export const Template: ComponentStory<typeof SelectBox> = args => (
  <SelectBox {...args} />
);

Template.args = {
  title: 'Columns:',
  items: columns,
  onClear: () => console.log('Clearing')
};
