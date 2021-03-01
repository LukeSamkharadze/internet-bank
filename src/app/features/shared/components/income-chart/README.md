How to use component :
DAta : `chartLegend` and `headerLegend` and `monthRange`

1. By default, month range is from `January` to `December`;
   <app-features-shared-income-chart></app-features-shared-income-chart>

2. If you want range from `January` to `June` pass [monthRange]=1, for example :
   <app-features-shared-income-chart [monthRange]=1></app-features-shared-income-chart>

3. If you want range from `July` to `December` pass [monthRange]=2, for example :
   <app-features-shared-income-chart [monthRange]=2></app-features-shared-income-chart>

4. If you pass any other value, like: [monthRange]=3 or [monthRange]=4 etc... It will
   show range from `January` to `December`, for example:
   <app-features-shared-income-chart [monthRange]=10></app-features-shared-income-chart>
   range will be from `January` to `December`
