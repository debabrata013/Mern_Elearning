import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const CourseEnrollmentGraph = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4400/api/analytics/analytics/enrollment-stats');
        setData(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error fetching enrollment data:', err);
        setError('Failed to load enrollment data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = useMemo(() => ({
    labels: data.map(d => d.title || 'Untitled Course'),
    datasets: [
      {
        label: 'Number of Students Enrolled',
        data: data.map(d => d.studentCount || 0),
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
      }
    ]
  }), [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          stepSize: 1,
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => `Students: ${context.raw}`
        }
      }
    }
  };

  if (loading) return <div className="w-full text-center py-8">Loading enrollment data...</div>;
  if (error) return <div className="w-full text-center py-8 text-red-500">{error}</div>;
  if (!data.length) return <div className="w-full text-center py-8">No course enrollment data available</div>;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md h-[400px]">
      <h2 className="text-xl font-bold mb-4 text-center">Course Enrollments</h2>
      <Line width={20} data={chartData} options={options} />
    </div>
  );
};

export default CourseEnrollmentGraph;
