import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const COLORS = ['#4a6cf7', '#f7734a', '#4af7a1', '#f7d24a', '#a14af7', '#f74a8e', '#4af7e8', '#8e8e8e'];

function Charts({ expenses }) {
  // group expenses by category for the pie chart
  const categoryData = Object.values(
    expenses.reduce((acc, exp) => {
      if (!acc[exp.category]) {
        acc[exp.category] = { name: exp.category, value: 0 };
      }
      acc[exp.category].value += exp.amount;
      return acc;
    }, {})
  );

  // group expenses by month for the bar chart
  const monthlyData = Object.values(
    expenses.reduce((acc, exp) => {
      const monthKey = new Date(exp.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
      if (!acc[monthKey]) {
        acc[monthKey] = { month: monthKey, total: 0 };
      }
      acc[monthKey].total += exp.amount;
      return acc;
    }, {})
  );

  if (expenses.length === 0) {
    return null;
  }

  return (
    <div className="charts-container">
      <div className="chart-card">
        <h3>By Category</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {categoryData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>By Month</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
            <Bar dataKey="total" fill="#4a6cf7" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;