export default function Customers({ data }) {
  const rmName = (id) => data.employees.find((e) => e.employee_id === id)?.name || '—';
  const accountsOf = (id) => data.holders.filter((h) => h.customer_id === id).length;

  return (
    <>
      <header className="page-header">
        <h1>Customers</h1>
        <p className="muted">A view of the book. Opening an account or assigning a relationship manager stays at the branch.</p>
      </header>
      <div className="card table-card">
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Customer</th><th>CNIC</th><th>Phone</th><th>Relationship manager</th><th>Accounts</th></tr></thead>
            <tbody>
              {data.customers.map((c) => (
                <tr key={c.customer_id}>
                  <td><strong>{c.name}</strong><div className="muted small">{c.email}</div></td>
                  <td className="mono">{c.cnic}</td>
                  <td>{c.phone}</td>
                  <td>{rmName(c.rm_employee_id)}</td>
                  <td>{accountsOf(c.customer_id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
