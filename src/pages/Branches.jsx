import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addBranch, assignManager, updateBranch } from '../store';

const EMPTY = { branch_code: '', branch_name: '', city: '' };

export default function Branches({ data }) {
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState(null);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const managersAt = (branchId) => data.employees.filter((e) => e.branch_id === branchId && e.designation === 'Manager');

  function submit(e) {
    e.preventDefault();
    const result = editing ? updateBranch(editing, form) : addBranch(form);
    setMsg(result.ok ? { type: 'ok', text: editing ? 'Branch updated' : 'Branch added' } : { type: 'err', text: result.error });
    if (result.ok) {
      setForm(EMPTY);
      setEditing(null);
    }
  }

  return (
    <>
      <header className="page-header">
        <h1>Branches</h1>
        <p className="muted">Each branch has its own manager, and that person must already work there as a Manager.</p>
      </header>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <div className="layout">
        <form className="card form" onSubmit={submit}>
          <h2>{editing ? 'Edit branch' : 'Add a branch'}</h2>
          {!editing && (
            <div className="field">
              <label htmlFor="code">Branch code</label>
              <input id="code" value={form.branch_code} onChange={set('branch_code')} placeholder="BR-KHI-03" />
            </div>
          )}
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" value={form.branch_name} onChange={set('branch_name')} />
          </div>
          <div className="field">
            <label htmlFor="city">City</label>
            <input id="city" value={form.city} onChange={set('city')} />
          </div>
          <button className="btn btn-primary" type="submit">{editing ? 'Save branch' : 'Add branch'}</button>
          {editing && (
            <button className="btn btn-ghost" type="button" onClick={() => { setEditing(null); setForm(EMPTY); }}>Cancel</button>
          )}
        </form>
        <div className="card table-card">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr><th>Code</th><th>Branch</th><th>City</th><th>Manager</th><th></th></tr>
              </thead>
              <tbody>
                {data.branches.map((b) => (
                  <tr key={b.branch_id}>
                    <td className="mono">{b.branch_code}</td>
                    <td><Link className="branch-name-link" to={`/branches/${b.branch_id}`}>{b.branch_name}</Link></td>
                    <td>{b.city}</td>
                    <td>
                      <select
                        aria-label={`Manager of ${b.branch_name}`}
                        value={b.manager_id || ''}
                        onChange={(e) => {
                          const result = assignManager(b.branch_id, e.target.value);
                          setMsg(result.ok ? { type: 'ok', text: 'Manager updated' } : { type: 'err', text: result.error });
                        }}
                      >
                        <option value="">No manager</option>
                        {managersAt(b.branch_id).map((m) => <option key={m.employee_id} value={m.employee_id}>{m.name}</option>)}
                      </select>
                    </td>
                    <td>
                      <Link className="btn btn-ghost btn-sm" to={`/branches/${b.branch_id}`}>Details</Link>
                      <button
                        className="btn btn-ghost btn-sm"
                        type="button"
                        onClick={() => {
                          setEditing(b.branch_id);
                          setForm({ branch_code: b.branch_code, branch_name: b.branch_name, city: b.city });
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
