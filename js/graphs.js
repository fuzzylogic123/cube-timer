"use strict"

console.log(solveTimes);

let plotData = {
    labels: labels,
    datasets: [
        {
            label: 'Current Session',
            data: solveTimes,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ]
        }
    ]
};


let config = {
    type: 'line',
    data: plotData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                font: {
                    size: 30
                },
                display: true,
                text: 'Solves'
            }
        }
    },
};

const canvas = document.getElementById('graph1').getContext('2d');
const chart1 = new Chart(canvas, config);
plotData = {
    labels: distributionLabels,
    datasets: [
        {
            label: 'Current Session',
            data: distribution,
            tension: 0.2,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ]
        }
    ]
};

config = {
    type: 'line',
    data: plotData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                font: {
                    size: 30
                },
                display: true,
                text: 'Solve Distribution'
            }
        }
    },
};

const canvas2 = document.getElementById('distGraph').getContext('2d');
const chart2 = new Chart(canvas2, config);