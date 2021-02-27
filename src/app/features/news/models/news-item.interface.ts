export interface NewsItem {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsItem[];
}
