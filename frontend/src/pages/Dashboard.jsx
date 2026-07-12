import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../api/expenses';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Charts from '../components/Charts';

function Dashboard() {
  const { user, logoutUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      setExpenses(res.data);
    } catch (err) {
      setError('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (expenseData, id) => {
    try {
      if (id) {
        await updateExpense(id, expenseData);
      } else {
        await createExpense(expenseData);
      }
      setEditingExpense(null);
      fetchExpenses();
    } catch (err) {
      setError('Failed to save expense');
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return;

    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      setError('Failed to delete expense');
    }
  };

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Hi, {user?.name}</h1>
          <p className="total-spent">Total spent: ₹{totalSpent.toFixed(2)}</p>
        </div>
        <button onClick={logoutUser} className="logout-btn">Log Out</button>
      </header>

      {error && <p className="error-text">{error}</p>}

      <ExpenseForm
        onSubmit={handleSubmit}
        editingExpense={editingExpense}
        onCancelEdit={handleCancelEdit}
      />

      <Charts expenses={expenses} />

      {loading ? (
        <p>Loading expenses...</p>
      ) : (
        <ExpenseList expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default Dashboard;