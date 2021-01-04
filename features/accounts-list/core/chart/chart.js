function createChart( data ) {
    const canvas = document.createElement('canvas');
    canvas.width = '100%';
    canvas.height = '100%';
    const ctx = canvas.getContext('2d');

    script = document.scripts[document.scripts.length - 1];
    script.parentElement.insertBefore(canvas, script);
    const {0: color, 1: bg} = window.getComputedStyle(script.parentElement).backgroundImage.match(/rgb\((\d+,? ?){3}\)/g) ?? [];

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