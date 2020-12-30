const ctx = document.getElementById('myChart').getContext('2d');
var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
gradientFill.addColorStop(0, "rgba(255, 171, 43, 0.1)");
gradientFill.addColorStop(1, "rgba(255, 171, 43, 0.1)");

var gradientFill2 = ctx.createLinearGradient(500, 0, 100, 0);
gradientFill2.addColorStop(0, "rgba(77, 124, 254, 0.1)");
gradientFill2.addColorStop(1, "rgba(77, 124, 254, 0.1)");
const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr','Jun', 'Jul'],
        datasets: [{
            borderColor: 'rgb(255,171,43)',
            backgroundColor: gradientFill,
            pointBackgroundColor: 'rgb(255,171,43)',
            pointRadius: [0,0,0,3,0,0],
            pointHoverRadius: 3,
            pointHoverBorderWidth: 6,
            borderWidth: 1.5,
            pointHoverBorderColor: 'rgba(255,171,43,0.5)',
            data: [18000, 8000, 20000, 48200, 22000, 10000]
        },
        {
            borderColor: 'rgb(77,124,254)',
            backgroundColor: gradientFill2,
            pointBackgroundColor: 'rgb(77,124,254)',
            pointHoverBorderColor: 'rgba(77,124,254,0.5)',
            pointRadius: [0,0,0,0,0,0],
            pointHoverRadius: 0,
            pointHoverBorderWidth: 0,
            borderWidth: 1.5,
            data: [13000, 8000, 40000, 24100, 16000, 16000]
        }],
        fill: false,
    },

    // Configuration options go here
    options: {
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
                    fontSize: 10,
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
            titleFontSize: 11,
            bodyFontSize: 11,
            titleFontStyle: 300,
            titleFontColor: '#252631',
            displayColors: false,
            backgroundColor: 'rgb(255,255,255)',
            bodyFontColor: '#252631',
            bodyFontStyle: 'bold',
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
            }
        }
    }
});
Chart.defaults.global.defaultFontColor = 'rgb(37,38,49)';
defaultFontFamily = "'Roboto', sans-serif";