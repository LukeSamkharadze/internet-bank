import { BankTransactionDetailsComponent } from './bank-transaction-details/bank-transaction-details.component';
import { IncomeChartComponent } from './income-chart/income-chart.component';
import { HeaderProfileComponent } from './header-profile/header-profile.component';
import { NewsArticleComponent } from './news-article/news-article.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { ExpansesComponent } from './expanses/expanses.component';

export * from './income-chart/income-chart.component';
export * from './news-article/news-article.component';
export * from './header-profile/header-profile.component';
export * from './invoice-details/invoice-details.component';

export const components = [
  IncomeChartComponent,
  BankTransactionDetailsComponent,
  NewsArticleComponent,
  HeaderProfileComponent,
  InvoiceDetailsComponent,
  ExpansesComponent,
];
