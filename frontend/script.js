let cpuChart;

function fetchData() {
    const ipAddress = document.getElementById('ip_address').value;
    const startTime = document.getElementById('start_time').value;
    const endTime = document.getElementById('end_time').value;
    const interval = document.getElementById('interval').value;

    const url = `http://127.0.0.1:5000/cpu-usage?ip_address=${ipAddress}&start_time=${startTime}&end_time=${endTime}&interval=${interval}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }
            renderChart(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Check the console for details.');
        });
}

function getHours(num) {
    setTimeRange(num);
}

function fetchLastDay() {
    setTimeRange(24);
}


function fetchLast48Hours() {
    setTimeRange(48);
}

function fetchLast72Hours() {
    setTimeRange(72);
}

function fetchLastMonth() {
    setTimeRange(30 * 24);
}

function setTimeRange(hours) {
    const now = luxon.DateTime.now();
    const endTime = now.toISO();
    const startTime = now.minus({ hours: hours }).toISO();

    document.getElementById('start_time').value = startTime.slice(0, 16);
    document.getElementById('end_time').value = endTime.slice(0, 16);
    fetchData();
}
function renderChart(data) {
    const ctx = document.getElementById('cpuChart').getContext('2d');
    const labels = data.map(point => point.time);
    const cpuData = data.map(point => point.cpu_usage*100);
    if (cpuChart) {
        cpuChart.destroy();
    }

    cpuChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'CPU Usage (%)',
                data: cpuData,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.3
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        parser: 'yyyy-MM-dd HH:mm:ss',
                        tooltipFormat: 'yyyy-MM-dd HH:mm:ss',
                        unit: 'minute'
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'CPU Usage (%)'
                    }
                }
            }
        }
    });
}
