type IFixedFiveArray<T> = [T, T, T, T, T];
type IItem = IFixedFiveArray<{
  title: string;
  value: string;
}>;

export default IItem;
