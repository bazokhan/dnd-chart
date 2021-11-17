import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from 'recharts';
import mapApiDataToChartData from '../helpers/mapApiDataToChartData';

import { ColumnData } from '../types';

const colors = ['#A03B63', '#EA88B9', '#B0DEF5', '#87A1FE'];

type Props = {
  XAxisName?: string;
  YAxisName?: string;
  dimension: ColumnData;
  measures: ColumnData[];
};

const LineRechart: React.FC<Props> = ({
  XAxisName,
  YAxisName,
  dimension,
  measures
}) => {
  const normalizedData = useMemo(
    () => mapApiDataToChartData(dimension, measures),
    [dimension, measures]
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={normalizedData}
        margin={{
          top: 30,
          right: 30,
          left: 30,
          bottom: 30
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dimension.name}>
          {XAxisName ? (
            <Label value={XAxisName} offset={30} position="bottom" />
          ) : null}
        </XAxis>
        <YAxis>
          {YAxisName ? (
            <Label value={YAxisName} angle={-90} position="left" />
          ) : null}
        </YAxis>
        <Tooltip />
        <Legend iconType="circle" />
        {measures.map((measure, index) => (
          <Line
            key={measure.name}
            type="monotone"
            dataKey={measure.name}
            // Start repeating colors if we exhaust the colors array length
            stroke={colors[index % colors.length]}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineRechart;
