import { useState } from 'react';
import { DESIGNATIONS, addStaff } from '../store';

const EMPTY = { cnic: '', name: '', email: '', branch_id: '', designation: '', username: '', password: '' };

export default function Staff({ data }) {
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState(null);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const branchName = (id) => data.branches.find((b) => b.branch_id === id)?.branch_name || '—';
  const loginOf = (employeeId) => data.users.find((u) => u.employee_id === employeeId);

  function submit(e) {
    e.preventDefault();
    const result = addStaff(form);
    setMsg(result.ok ? { type: 'ok', text: 'Staff login created' } : { type: 'err', text: result.error });
    if (result.ok) setForm(EMPTY);
  }

  return (
    <>
      <header className="page-header">
        <h1>Staff</h1>
        <p className="muted">Each person gets one branch job and one login. The role follows the designation.</p>
      </header>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <div className="layout">
        <form className="card form" onSubmit={submit}>
          <h2>Add staff</h2>
          <div className="field">
            <label htmlFor="ename">Name</label>
            <input id="ename" value={form.name} onChange={set('name')} />
          </div>
          <div className="field">
            <label htmlFor="cnic">CNIC</label>
            <input id="cnic" inputMode="numeric" maxLength={13} value={form.cnic} onChange={set('cnic')} />
            <small>13 digits, no dashes</small>
          </div>
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
          <div className="field">
            <label htmlFor="user">Username</label>
            <input id="user" value={form.username} onChange={set('username')} autoComplete="off" />
          </div>
          <div className="field">
            <label htmlFor="pass">Password</label>
            <input id="pass" type="password" value={form.password} onChange={set('password')} autoComplete="new-password" />
            <small>At least 8 characters. Shown here because this demo stores it in the browser.</small>
          </div>
          <button className="btn btn-primary" type="submit">Create login</button>
        </form>
        <div className="card table-card">
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Name</th><th>Job</th><th>Branch</th><th>Username</th></tr></thead>
              <tbody>
                {data.employees.map((e) => (
                  <tr key={e.employee_id}>
                    <td><strong>{e.name}</strong><div className="muted small">{e.email}</div></td>
                    <td>{e.designation}</td>
                    <td>{branchName(e.branch_id)}</td>
                    <td className="mono">{loginOf(e.employee_id)?.username}</td>
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
