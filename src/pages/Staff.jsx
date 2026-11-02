import { useState } from 'react';
import { DESIGNATIONS, addLogin, addStaff, updateStaff } from '../store';

const EMPTY = { cnic: '', name: '', email: '', branch_id: '', designation: '', username: '', password: '' };

export default function Staff({ data }) {
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState(null);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const branchName = (id) => data.branches.find((b) => b.branch_id === id)?.branch_name || '—';
  const loginOf = (employeeId) => data.users.find((u) => u.employee_id === employeeId);
  const current = data.employees.find((e) => e.employee_id === editing);

  function submit(e) {
    e.preventDefault();
    if (!editing) {
      const result = addStaff(form);
      setMsg(result.ok ? { type: 'ok', text: 'Staff login created' } : { type: 'err', text: result.error });
      if (result.ok) setForm(EMPTY);
      return;
    }
    const result = updateStaff(editing, form);
    if (!result.ok) {
      setMsg({ type: 'err', text: result.error });
      return;
    }
    if (!loginOf(editing) && (form.username || form.password)) {
      const login = addLogin(editing, form);
      setMsg(login.ok ? { type: 'ok', text: 'Staff updated and login created' } : { type: 'err', text: login.error });
      if (!login.ok) return;
    } else {
      setMsg({ type: 'ok', text: 'Staff updated' });
    }
    setEditing(null);
    setForm(EMPTY);
  }

  return (
    <>
      <header className="page-header">
        <h1>Staff</h1>
        <p className="muted">The login role follows the designation. A branch manager needs a login only when you create one.</p>
      </header>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <div className="layout">
        <form className="card form" onSubmit={submit}>
          <h2>{editing ? `Edit ${current?.name}` : 'Add staff'}</h2>
          {!editing && (
            <>
              <div className="field">
                <label htmlFor="ename">Name</label>
                <input id="ename" value={form.name} onChange={set('name')} />
              </div>
              <div className="field">
                <label htmlFor="cnic">CNIC</label>
                <input id="cnic" inputMode="numeric" maxLength={13} value={form.cnic} onChange={set('cnic')} />
                <small>13 digits, no dashes</small>
              </div>
            </>
          )}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email} onChange={set('email')} />
          </div>
          <div className="field">
            <label htmlFor="branch">Branch</label>
            <select id="branch" value={form.branch_id} onChange={set('branch_id')}>
              <option value="">Select</option>
              {data.branches.map((b) => <option key={b.branch_id} value={b.branch_id}>{b.branch_name} · {b.city}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="job">Designation</label>
            <select id="job" value={form.designation} onChange={set('designation')}>
              <option value="">Select</option>
              {DESIGNATIONS.map(([name]) => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
          {(!editing || !loginOf(editing)) && (
            <>
              <div className="field">
                <label htmlFor="user">Username</label>
                <input id="user" value={form.username} onChange={set('username')} autoComplete="off" />
              </div>
              <div className="field">
                <label htmlFor="pass">Password</label>
                <input id="pass" type="password" value={form.password} onChange={set('password')} autoComplete="new-password" />
                <small>{editing ? 'Leave blank to keep this person without a login.' : 'At least 8 characters.'}</small>
              </div>
            </>
          )}
          <button className="btn btn-primary" type="submit">{editing ? 'Save staff' : 'Create login'}</button>
          {editing && (
            <button className="btn btn-ghost" type="button" onClick={() => { setEditing(null); setForm(EMPTY); }}>Cancel</button>
          )}
        </form>
        <div className="card table-card">
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Name</th><th>Job</th><th>Branch</th><th>Username</th><th></th></tr></thead>
              <tbody>
                {data.employees.map((e) => (
                  <tr key={e.employee_id}>
                    <td><strong>{e.name}</strong><div className="muted small">{e.email}</div></td>
                    <td>{e.designation}</td>
                    <td>{branchName(e.branch_id)}</td>
                    <td className="mono">{loginOf(e.employee_id)?.username || '—'}</td>
                    <td>
                      <button
                        className="btn btn-ghost btn-sm"
                        type="button"
                        onClick={() => {
                          setEditing(e.employee_id);
                          setForm({ ...EMPTY, email: e.email, branch_id: String(e.branch_id), designation: e.designation });
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
