import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

const TractionTracker = () => {
  const [metrics, setMetrics] = useState([]);
  const [newMetric, setNewMetric] = useState({ name: '', value: '', date: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDays, setFilterDays] = useState('30');

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('traction-metrics');
    if (stored) setMetrics(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('traction-metrics', JSON.stringify(metrics));
  }, [metrics]);

  const addMetric = () => {
    if (!newMetric.name || !newMetric.value || !newMetric.date) return;
    setMetrics([...metrics, { ...newMetric, value: parseInt(newMetric.value) }]);
    setNewMetric({ name: '', value: '', date: '' });
  };

  const deleteMetric = (index) => {
    const updated = [...metrics];
    updated.splice(index, 1);
    setMetrics(updated);
  };

  const exportCSV = () => {
    const rows = [['Metric Name', 'Value', 'Date'], ...metrics.map(m => [m.name, m.value, m.date])];
    const csv = rows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'traction_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filtered Metrics
  const filteredMetrics = metrics.filter(m => {
    const nameMatch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const withinDate = filterDays === 'all' || (new Date() - new Date(m.date)) / (1000 * 60 * 60 * 24) <= parseInt(filterDays);
    return nameMatch && withinDate;
  });

  // Get unique metric names
  const metricNames = [...new Set(filteredMetrics.map(m => m.name))];

  // Chart Dataset
  const chartData = {
    labels: [...new Set(filteredMetrics.map(m => m.date))].sort(),
    datasets: metricNames.map((name, i) => ({
      label: name,
      data: chartData.labels.map(date =>
        filteredMetrics.find(m => m.name === name && m.date === date)?.value || null
      ),
      borderColor: `hsl(${i * 75 % 360}, 70%, 50%)`,
      fill: false,
      tension: 0.3,
    })),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📈 Traction Tracker</h2>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Metric Name"
          value={newMetric.name}
          onChange={e => setNewMetric({ ...newMetric, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Value"
          value={newMetric.value}
          onChange={e => setNewMetric({ ...newMetric, value: e.target.value })}
          style={styles.input}
        />
        <input
          type="date"
          value={newMetric.date}
          onChange={e => setNewMetric({ ...newMetric, date: e.target.value })}
          style={styles.input}
        />
        <button onClick={addMetric} style={styles.button}>Add</button>
        <button onClick={exportCSV} style={{ ...styles.button, background: '#333' }}>Export CSV</button>
      </div>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search metric name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <select value={filterDays} onChange={e => setFilterDays(e.target.value)} style={styles.input}>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Line data={chartData} options={chartOptions} />
      </div>

      <ul style={styles.list}>
        {filteredMetrics.map((m, i) => (
          <li key={i} style={styles.listItem}>
            <strong>{m.name}</strong> - {m.value} on {m.date}
            <button onClick={() => deleteMetric(i)} style={styles.deleteBtn}>✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'sans-serif',
    maxWidth: '1000px',
    margin: 'auto'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  controls: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '1rem'
  },
  filters: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '1rem'
  },
  input: {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem'
  },
  button: {
    padding: '0.6rem 1rem',
    background: '#0066cc',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginTop: '1rem'
  },
  listItem: {
    background: '#f9f9f9',
    padding: '0.75rem',
    borderRadius: '6px',
    marginBottom: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deleteBtn: {
    border: 'none',
    background: 'transparent',
    fontSize: '1.1rem',
    cursor: 'pointer',
    color: '#cc0000'
  }
};

export default TractionTracker;
