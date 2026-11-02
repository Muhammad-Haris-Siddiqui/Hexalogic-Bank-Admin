import { useState } from 'react';
import { addAccountType } from '../store';

const money = new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR' });

export default function AccountTypes({ data }) {
  const [form, setForm] = useState({ type_name: '', interest_rate: '', min_balance: '' });
  const [msg, setMsg] = useState(null);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  function submit(e) {
    e.preventDefault();
    const result = addAccountType(form);
    setMsg(result.ok ? { type: 'ok', text: 'Account type added' } : { type: 'err', text: result.error });
    if (result.ok) setForm({ type_name: '', interest_rate: '', min_balance: '' });
  }

  return (
    <>
      <header className="page-header">
        <h1>Account types</h1>
        <p className="muted">Interest rate and minimum balance are stored here. The branch app opens accounts of these types.</p>
      </header>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <div className="layout">
        <form className="card form" onSubmit={submit}>
          <h2>Add a type</h2>
          <div className="field">
            <label htmlFor="type">Name</label>
            <input id="type" value={form.type_name} onChange={set('type_name')} placeholder="Student" />
          </div>
          <div className="field">
            <label htmlFor="rate">Interest rate (%)</label>
            <input id="rate" inputMode="decimal" value={form.interest_rate} onChange={set('interest_rate')} placeholder="3.00" />
          </div>
          <div className="field">
            <label htmlFor="min">Minimum balance</label>
            <input id="min" inputMode="decimal" value={form.min_balance} onChange={set('min_balance')} placeholder="500.00" />
          </div>
          <button className="btn btn-primary" type="submit">Add type</button>
        </form>
        <div className="card table-card">
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Type</th><th>Interest</th><th>Minimum balance</th></tr></thead>
              <tbody>
                {data.accountTypes.map((t) => (
                  <tr key={t.account_type_id}>
                    <td>{t.type_name}</td>
                    <td>{t.interest_rate}%</td>
                    <td>{money.format(Number(t.min_balance))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
