import mapApiDataToChartData from './mapApiDataToChartData';

const dimension = {
  name: 'Product',
  values: [
    'Diskette',
    'Memory Card',
    'HDTV Tuner',
    'Flat Panel Graphics Monitor',
    'Digital Camera',
    'Minitower Speaker',
    'Extension Cable',
    'Y Box'
  ]
};

const measures = [
  {
    name: 'Cost1',
    values: [333.08, 7.07, 10.77, 194.76, 13.18, 143.3, 20.2, 405]
  },
  {
    name: 'Cost2',
    values: [33.08, 37.07, 110.77, 94.76, 513.18, 143.3, 120.2, 205]
  }
];

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
