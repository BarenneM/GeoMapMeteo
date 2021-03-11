function getGraph(x, y) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = null;

    // if (myChart !== undefined) myChart.clear();

    myChart= new Chart(ctx, {
        type: 'line',
        data: {
            labels: x,
            datasets: [{
                label: 'Température',
                data: y,
                backgroundColor: [
                    'rgb(31, 192, 179)'
                ],
                borderColor: [
                    'rgb(31, 192, 179)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}