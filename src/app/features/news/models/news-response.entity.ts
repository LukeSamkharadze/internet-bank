import { NewsItem } from './news-item.entity';

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsItem[];
}
