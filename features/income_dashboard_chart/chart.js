const ctx = document.getElementById('myChart').getContext('2d');
var gradientFill = ctx.createLinearGradient(170,0, 170, 170);
gradientFill.addColorStop(0, "rgba(255, 171, 43, 0.3)");
gradientFill.addColorStop(1, "rgba(255, 171, 43, 0)");

var gradientFill2 = ctx.createLinearGradient(170, 0, 170, 170);
gradientFill2.addColorStop(0, "rgba(77, 124, 254, 0.3)");
gradientFill2.addColorStop(1, "rgba(77, 124, 254, 0)");
const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr','Jun', 'Jul'],
        datasets: [{
            borderColor: 'rgb(255,171,43)',
            backgroundColor: gradientFill,
            pointBackgroundColor: 'rgba(255,171,43,0)',
            pointBorderColor: 'rgba(255,171,43,0)',
            pointRadius: [3,3,3,3,3,3],
            pointHoverRadius: 5,
            pointHoverBorderWidth: 7,
            borderWidth: 1.5,
            pointHoverBorderColor: 'rgba(255,171,43,0.5)',
            pointHoverBackgroundColor: 'rgba(255,171,43,1)',
            data: [18000, 8000, 20000, 48200, 22000, 10000]
        },
        {
            borderColor: 'rgb(77,124,254)',
            backgroundColor: gradientFill2,
            pointBackgroundColor: 'rgba(77,124,254,0)',
            pointBorderColor: 'rgba(77,124,254,0)',
            pointHoverBorderColor: 'rgba(77,124,254,0.5)',
            pointHoverBackgroundColor: 'rgba(77,124,254,1)',
            pointRadius: [3,3,3,3,3,3],
            pointHoverRadius: 5,
            pointHoverBorderWidth: 7,
            borderWidth: 1.5,
            data: [13000, 8000, 40000, 24100, 16000, 16000]
        }],
        fill: false,
    },

    // Configuration options go here
    options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    display: false,
                    max: 60000
                },
                gridLines: {
                    display: false,
                }
            }],
            xAxes: [{
                ticks: {
                    fontSize: 14,
                    fontStyle: 'normal',
                    fontFamily: "'Roboto', sans-serif",
                    fontColor: "#252631",
                },
                gridLines : {
                    borderDash: [2, 2],
                }
            }]
        },
        tooltips: {
            titleFontSize: 13,
            bodyFontSize: 14,
            titleFontStyle: 300,
            titleFontColor: '#252631',
            displayColors: false,
            backgroundColor: 'rgb(255,255,255)',
            bodyFontColor: '#252631',
            bodyFontStyle: 'bold',
            xPadding: 10,
            yPadding: 10,
            callbacks: {
                title: function(tooltipItem, chart){
                    switch(tooltipItem[0].label){
                        case 'Jan': return 'January';
                        case 'Feb': return 'February';
                        case 'Mar': return 'March';
                        case 'Apr': return 'April';
                        case 'Jun': return 'June';
                        case 'Jul': return 'July'
                    }
                },
                label: function(tooltipItem, data) {
                    return "$ " + Number(tooltipItem.yLabel).toFixed(0).replace(/./g, function(c, i, a) {
                        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
                    });
                }
            }
        }
    }
});
Chart.defaults.global.defaultFontColor = 'rgb(37,38,49)';
defaultFontFamily = "'Roboto', sans-serif";