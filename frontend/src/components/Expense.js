import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import api from '../api/api';

export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const titleRef = useRef();

  // Fetch expenses
  useEffect(() => {
    api.get('/expense').then(res => setExpenses(res.data));
  }, []);

  // Calculate total expense
  const totalExpense = useMemo(() => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  // Add expense
  const addExpense = useCallback(() => {
    api.post('/expense', {
      title: titleRef.current.value,
      amount: 100,
      category: 'General'
    }).then(res => {
      setExpenses(prev => [...prev, res.data]);
      titleRef.current.value = '';
    });
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
      <input ref={titleRef} placeholder="Expense title" />
      <button onClick={addExpense}>Add Expense</button>

      <h3>Total: {totalExpense}</h3>

      {expenses.map(e => (
        <p key={e._id}>{e.title} - {e.amount}</p>
      ))}
    </div>
  );
}
