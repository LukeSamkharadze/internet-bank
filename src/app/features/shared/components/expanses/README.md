How to use :

```HTML
<app-features-shared-expanses [chartData]="chartData" [header]="'Your Header'"></app-features-shared-expanses>
```

component needs data to display chart,

chart data type:
export interface expanses {
kind: string,
share: number,
colorString: string
}

`kind` is used for `Category` name
`share` is used for `Category` value
`colorString` is used for color on Chart

for example:

```TS
chartData: Expanses[]=[
{
kind:'Grocery', //Category name
share: 2000, //Category value
colorString: '#FFAB2B' //Color on chart
},
{
kind:'Health & Wellness',
share: 1000,
colorString: '#D28715'
},
{
kind:'Home Renta;',
share: 1000,
colorString: '#D28775'
},
{
kind:'Transportation',
share: 1000,
colorString: '#D28760'
}
]
```

[header]="'Your Header'" `-->` use for your custom Header !
