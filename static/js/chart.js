// Assuming you have a <canvas> element with id="myChart" in your HTML
const ctx = document.getElementById('myChart').getContext('2d');

// Function to fetch species data from a given JSON file
async function fetchSpeciesData(file) {
    const response = await fetch(file);
    const data = await response.json();
    return data;
}

// Function to prepare data for Chart.js
async function prepareChartData() {
    const continents = [
        { name: 'Asia', file: 'asia_species.json' },
        { name: 'Africa', file: 'africa_species.json' },
        { name: 'Europe', file: 'europe_species.json' },
        { name: 'North America', file: 'north_america_species.json' },
        { name: 'South America', file: 'south_america_species.json' },
        { name: 'Australia', file: 'australia_species.json' },
        { name: 'Antarctica', file: 'antarctica_species.json' },
    ];

    const labels = [];
    const dataCounts = [];

    for (const continent of continents) {
        const speciesData = await fetchSpeciesData(continent.file);
        labels.push(continent.name);
        dataCounts.push(speciesData.length); // Count of species in each continent
    }

    return { labels, dataCounts };
}

// Function to create the chart
async function createChart() {
    const chartData = await prepareChartData();

    const myChart = new Chart(ctx, {
        type: 'bar', // You can change this to 'line', 'pie', etc.
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Number of Endangered Plant Species',
                data: chartData.dataCounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize the chart
createChart();
