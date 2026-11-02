import { useState } from 'react';
import { addAccountType, rupees, updateAccountType } from '../store';

const EMPTY = { type_name: '', interest_rate: '', min_balance: '' };

export default function AccountTypes({ data }) {
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState(null);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const current = data.accountTypes.find((t) => t.account_type_id === editing);

  function submit(e) {
    e.preventDefault();
    const result = editing ? updateAccountType(editing, form) : addAccountType(form);
    setMsg(result.ok ? { type: 'ok', text: editing ? 'Account type updated' : 'Account type added' } : { type: 'err', text: result.error });
    if (result.ok) {
      setForm(EMPTY);
      setEditing(null);
    }
  }

  return (
    <>
      <header className="page-header">
        <h1>Account types</h1>
        <p className="muted">Interest rate and minimum balance live here. The branch app opens the accounts.</p>
      </header>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <div className="layout">
        <form className="card form" onSubmit={submit}>
          <h2>{editing ? `Edit ${current?.type_name}` : 'Add a type'}</h2>
          {!editing && (
            <div className="field">
              <label htmlFor="type">Name</label>
              <input id="type" value={form.type_name} onChange={set('type_name')} placeholder="Student" />
            </div>
          )}
          <div className="field">
            <label htmlFor="rate">Interest rate (%)</label>
            <input id="rate" inputMode="decimal" value={form.interest_rate} onChange={set('interest_rate')} placeholder="3.00" />
          </div>
          <div className="field">
            <label htmlFor="min">Minimum balance</label>
            <input id="min" inputMode="decimal" value={form.min_balance} onChange={set('min_balance')} placeholder="500.00" />
          </div>
          <button className="btn btn-primary" type="submit">{editing ? 'Save type' : 'Add type'}</button>
          {editing && (
            <button className="btn btn-ghost" type="button" onClick={() => { setEditing(null); setForm(EMPTY); }}>Cancel</button>
          )}
        </form>
        <div className="card table-card">
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Type</th><th>Interest</th><th>Minimum balance</th><th></th></tr></thead>
              <tbody>
                {data.accountTypes.map((t) => (
                  <tr key={t.account_type_id}>
                    <td>{t.type_name}</td>
                    <td>{t.interest_rate}%</td>
                    <td>{rupees.format(Number(t.min_balance))}</td>
                    <td>
                      <button
                        className="btn btn-ghost btn-sm"
                        type="button"
                        onClick={() => {
                          setEditing(t.account_type_id);
                          setForm({ type_name: t.type_name, interest_rate: t.interest_rate, min_balance: t.min_balance });
                        }}
                      >
                        Edit
                      </button>
                    </td>
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
