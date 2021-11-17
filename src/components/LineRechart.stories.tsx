import { ComponentStory, ComponentMeta } from '@storybook/react';
import { dimension, measures } from '../data';

import LineRechart from './LineRechart';

export default {
  title: 'Components/LineRechart',
  component: LineRechart
} as ComponentMeta<typeof LineRechart>;

export const Template: ComponentStory<typeof LineRechart> = args => (
  <div className="w-full h-80">
    <LineRechart {...args} />
  </div>
);

Template.args = {
  dimension,
  measures
};
