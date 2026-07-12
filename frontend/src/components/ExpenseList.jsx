function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return <p className="empty-state">No expenses yet. Add your first one above!</p>;
  }

  return (
    <div className="expense-list">
      {expenses.map((exp) => (
        <div key={exp._id} className="expense-item">
          <div className="expense-info">
            <span className="expense-category">{exp.category}</span>
            <span className="expense-note">{exp.note || '—'}</span>
            <span className="expense-date">
              {new Date(exp.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <div className="expense-actions">
            <span className="expense-amount">₹{exp.amount.toFixed(2)}</span>
            <button onClick={() => onEdit(exp)} className="icon-btn">✎</button>
            <button onClick={() => onDelete(exp._id)} className="icon-btn delete">🗑</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;