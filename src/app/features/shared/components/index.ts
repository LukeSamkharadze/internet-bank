import { AccountBalancesComponent } from './account-balances/account-balances.component';
import { BankTransactionDetailsComponent } from './bank-transaction-details/bank-transaction-details.component';
import { IncomeChartComponent } from './income-chart/income-chart.component';
import { HeaderProfileComponent } from './header-profile/header-profile.component';
import { NewsArticleComponent } from './news-article/news-article.component';

export * from './income-chart/income-chart.component';
export * from './account-balances/account-balances.component';
export * from './news-article/news-article.component';
export * from './header-profile/header-profile.component';

export const components = [
  IncomeChartComponent,
  BankTransactionDetailsComponent,
  AccountBalancesComponent,
  NewsArticleComponent,
  HeaderProfileComponent,
];
