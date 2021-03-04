import IFilledArray from './filled-array.interface';

export default interface IItem {
  title: string;
  value: number;
  data: IFilledArray<number>;
}
