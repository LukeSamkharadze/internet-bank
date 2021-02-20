let svgns = "http://www.w3.org/2000/svg";
const r = 24, size = 100, strokeWidth = 39, hoverWidth = 50;

function createChart( dataset, colors, bg ) {
    const sum = dataset.reduce((prev, cur) => prev + cur, 0);

    const chart = document.createElementNS(svgns, 'svg');
    chart.setAttributeNS(null, 'viewBox', `0 0 ${size} ${size}`);

    let offset = 0;
    dataset.forEach( (data, index) => {
        offset += data;
        const element = createCircle({
        'fill': 'transparent',
        'stroke': colors[index],
        'stroke-width': strokeWidth,
        'stroke-dasharray': `${2 * Math.PI * r / sum * data} ${2 * Math.PI * r / sum * (sum - data)}`,
        'stroke-dashoffset': 2 * Math.PI * r / sum * offset
        });
        element.addEventListener('mouseover', mouse => {
            mouse.currentTarget.setAttributeNS(null, 'stroke-width', hoverWidth);
            pop(mouse.x, mouse.y, dataset[index])
        });
        element.addEventListener('mouseout', mouse => {
            mouse.currentTarget.setAttributeNS(null, 'stroke-width', strokeWidth);
            document.getElementById('popup').classList.toggle('tooltip-shown');
        });
        chart.appendChild(element);
    });

    const center = createCircle({'fill': bg});
    chart.appendChild(center);
    chart.classList.add('pie');
    document.getElementsByClassName('credit-overview')[0]
        .getElementsByClassName('chart')[0].appendChild(chart);
}

function pop( x, y, amount ) {
    const popup = document.getElementById('popup');
    popup.getElementsByTagName('span')[0].innerText = `$${amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`;
    popup.classList.toggle('tooltip-shown');
    popup.style.left = `${x - popup.offsetWidth / 2}px`;
    popup.style.top = `${y - popup.offsetHeight - 10}px`;
}

function createCircle( properties ) {
    const circle = document.createElementNS(svgns, 'circle');
    circle.style.transitionDuration = "0.5s";
    circle.setAttributeNS(null, 'cx', size / 2);
    circle.setAttributeNS(null, 'cy', size / 2);
    circle.setAttributeNS(null, 'r', r);
    Object.getOwnPropertyNames(properties).forEach( key => {
        circle.setAttributeNS(null, key, properties[key]);
    });
    return circle;
}

createChart(
    [84800,     84800 * 14 / 100,   24800    ],
    ['#FFAB2B', '#4D7CFE',          '#6DD230'],
    'white'
);