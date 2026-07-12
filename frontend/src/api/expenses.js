import api from './axios';

export const getExpenses = () => api.get('/expenses');

export const createExpense = (expenseData) => api.post('/expenses', expenseData);

export const updateExpense = (id, expenseData) => api.put(`/expenses/${id}`, expenseData);

export const deleteExpense = (id) => api.delete(`/expenses/${id}`);