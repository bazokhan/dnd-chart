import { dimension, measures } from '../data';
import mapApiDataToChartData from './mapApiDataToChartData';

const chartData = mapApiDataToChartData(dimension, measures);

describe('Helpers - mapApiDataToChartData', () => {
  test('returns correct number of items', () => {
    expect(chartData).toHaveLength(dimension.values.length);
  });
  test('returns correct number of props within each item', () => {
    expect(chartData[0]).toHaveProperty(dimension.name);
    expect(typeof chartData[0][dimension.name]).toBe('string');
    expect(chartData[0]).toHaveProperty(measures[0].name);
    expect(typeof chartData[0][measures[0].name]).toBe('number');
    expect(chartData[0]).toHaveProperty(measures[1].name);
    expect(typeof chartData[0][measures[1].name]).toBe('number');
  });
});
