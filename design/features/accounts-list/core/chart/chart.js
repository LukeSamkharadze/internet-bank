function createChart( data ) {
    const canvas = document.createElement('canvas');
    canvas.width = '100%';
    canvas.height = '100%';
    const ctx = canvas.getContext('2d');

    const script = document.scripts[document.scripts.length - 1];
    const chartContainer = script.parentElement;
    chartContainer.insertBefore(canvas, script);
    const {0: color, 1: bg} = (window.getComputedStyle(chartContainer).backgroundImage.match(/rgba\( *(\d+ *, *){3}\d+(.\d+)? *\)/g) ?? []).map(rgba => rgbaToRgb(rgba));
    canvas.style.backgroundImage = window.getComputedStyle(chartContainer).backgroundImage;
    chartContainer.style.background = 'none';

    const max = data.reduce((prev, cur) => Math.max(prev, cur));
    data.forEach((val, index) => data[index] = max - val);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data,
            datasets: [{
                borderColor: color,
                backgroundColor: bg,
                pointRadius: 0,
                borderWidth: 1.5,
                data 
            }],
            fill: false,
        },
    
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    display: false,
                    ticks: {
                        max
                    }
                }],
                xAxes: [{
                    display: false
                }]
            },
            tooltips: {
                enabled: false
            }
        }
    });
}

function rgbaToRgb( rgba ) {
    return 'rgb(' + (rgba.match(/\d+ *,/g) ?? ['255,','255,','255,']).join('').slice(0, -1) + ')';
}