import { ColumnData, DataPoint } from '../types';

// Example data needed for LineRechart
// const data = [
//   {
//     dimensionName: 'Page A',
//     measure1Name: 4000,
//     measure2Name: 2400
//   },
//   {
//     dimensionName: 'Page B',
//     measure1Name: 3000,
//     measure2Name: 1398
//   }
// ]

const mapApiDataToChartData = (
  dimension: ColumnData,
  measures: ColumnData[]
): DataPoint[] =>
  (dimension.values as string[]).reduce<DataPoint[]>(
    (prev: DataPoint[], XPoint: string, index: number) => {
      const newPoint: DataPoint = {};
      newPoint[dimension.name] = XPoint;
      measures.forEach(measure => {
        const YPoint = measure.values[index];
        newPoint[measure.name] = YPoint;
      });
      prev.push(newPoint);
      return prev;
    },
    []
  );

export default mapApiDataToChartData;
