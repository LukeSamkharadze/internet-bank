import IFilledArray from './filled-array.entity';

export default interface IItem {
  title: string;
  data: IFilledArray<number>;
}
