import { ComponentStory, ComponentMeta } from '@storybook/react';
import { columns } from '../data';

import ColumnsSidebar from './ColumnsSidebar';

export default {
  title: 'Components/ColumnsSidebar',
  component: ColumnsSidebar
} as ComponentMeta<typeof ColumnsSidebar>;

export const Template: ComponentStory<typeof ColumnsSidebar> = args => (
  <ColumnsSidebar {...args} />
);

Template.args = {
  loading: false,
  error: null,
  data: columns,
  onClick: col => console.log(col)
};
