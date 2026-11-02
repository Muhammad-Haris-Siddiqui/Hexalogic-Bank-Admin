import { useState } from 'react';
import { addBranch, assignManager } from '../store';

export default function Branches({ data }) {
  const [form, setForm] = useState({ branch_code: '', branch_name: '', city: '' });
  const [msg, setMsg] = useState(null);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const managersAt = (branchId) => data.employees.filter((e) => e.branch_id === branchId && e.designation === 'Manager');
  const nameOf = (id) => data.employees.find((e) => e.employee_id === id)?.name;

  function submit(e) {
    e.preventDefault();
    const result = addBranch(form);
    setMsg(result.ok ? { type: 'ok', text: 'Branch added' } : { type: 'err', text: result.error });
    if (result.ok) setForm({ branch_code: '', branch_name: '', city: '' });
  }

  return (
    <>
      <header className="page-header">
        <h1>Branches</h1>
        <p className="muted">A branch manager must already work at that branch.</p>
      </header>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <div className="layout">
        <form className="card form" onSubmit={submit}>
          <h2>Add a branch</h2>
          <div className="field">
            <label htmlFor="code">Branch code</label>
            <input id="code" value={form.branch_code} onChange={set('branch_code')} placeholder="BR-KHI-02" />
          </div>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" value={form.branch_name} onChange={set('branch_name')} />
          </div>
          <div className="field">
            <label htmlFor="city">City</label>
            <input id="city" value={form.city} onChange={set('city')} />
          </div>
          <button className="btn btn-primary" type="submit">Add branch</button>
        </form>
        <div className="card table-card">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr><th>Code</th><th>Branch</th><th>City</th><th>Manager</th></tr>
              </thead>
              <tbody>
                {data.branches.map((b) => (
                  <tr key={b.branch_id}>
                    <td className="mono">{b.branch_code}</td>
                    <td>{b.branch_name}</td>
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
                        {b.manager_id && !managersAt(b.branch_id).some((m) => m.employee_id === b.manager_id) && (
                          <option value={b.manager_id}>{nameOf(b.manager_id)}</option>
                        )}
                      </select>
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
