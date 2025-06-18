import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartDataLabels, Title, Tooltip, Legend);

function MaintenanceChart() {
    // data comme parametre
  // Données temporaires
  const data = {
    labels: ['En attente', 'En cours', 'Terminées', 'Annulées'],
    datasets: [{
      label: 'Maintenances',
      data: [12, 19, 3, 5],

      // label: 'Nombre de maintenances',
      // data: data.map(item => item.count),

      backgroundColor: [
        '#1371B9',  // Bleu clair
        '#4091CE',  // Bleu
        '#F30051',  // Rouge
        '#4E4E4E'   // Gris foncé
      ],
        borderRadius: 12,
        borderSkipped: false,
        barPercentage: 0.7,
        categoryPercentage: 0.6,
    }]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Statistiques des Maintenances',
        color: '#222',
        font: { size: 20, weight: 'bold', family: 'Inter, sans-serif' },
        padding: { top: 10, bottom: 30 }
      },
      tooltip: {
        backgroundColor: '#222',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#1371B9',
        borderWidth: 1,
        padding: 12
      },
      datalabels: {
        display: true,
        color: '#222',
        font: { weight: 'bold', size: 14 },
        anchor: 'end',
        align: 'top',
        formatter: (value) => value.toString(),
        padding: { top: 4 }
      }
      //   position: 'top',
    },

    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#222', font: { size: 14, weight: 'bold' } }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#F1F5F9',
          borderDash: [4, 4]
        },
        ticks: {
          color: '#222',
          font: { size: 13 }
        }
      }
    },

    animation: {
      duration: 1200,
      easing: 'easeOutBounce',
    },
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
        <Bar data={data} options={options} />
        {/* <Bar data={chartData} options={options} /> */}
    </div>
  );
};

export default MaintenanceChart;








