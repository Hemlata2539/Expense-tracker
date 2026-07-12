import { useState, useEffect } from 'react';

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Education', 'Other'];

function ExpenseForm({ onSubmit, editingExpense, onCancelEdit }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // when editingExpense changes, fill the form with its data
  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setNote(editingExpense.note || '');
      setDate(editingExpense.date.split('T')[0]);
    }
  }, [editingExpense]);

  const resetForm = () => {
    setAmount('');
    setCategory('Food');
    setNote('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const expenseData = { amount: Number(amount), category, note, date };

    onSubmit(expenseData, editingExpense?._id);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h3>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h3>

      <div className="form-row">
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0"
          step="0.01"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit">{editingExpense ? 'Update' : 'Add'} Expense</button>
        {editingExpense && (
          <button type="button" onClick={onCancelEdit} className="cancel-btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;