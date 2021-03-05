export default interface IChartItem {
  id: number;
  type: IChartType;
  userId: number;
  data: Array<number>;
}

export type IChartType = 'card' | 'deposit' | 'loan';
