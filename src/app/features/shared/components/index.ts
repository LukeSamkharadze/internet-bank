import { from } from 'rxjs';
import { BankTransactionDetailsComponent } from './bank-transaction-details/bank-transaction-details.component';
import { IncomeChartComponent } from './income-chart/income-chart.component';
import { NewsArticleComponent } from './news-article/news-article.component';

export * from './income-chart/income-chart.component';
export * from './news-article/news-article.component';

export const components = [
  IncomeChartComponent,
  BankTransactionDetailsComponent,
  NewsArticleComponent,
];
