type ITemplate<T> = [T, [T]] | [T, [T, T]];
type ICardTemplate = ITemplate<{ title: string; value: string }>;
export default ICardTemplate;
