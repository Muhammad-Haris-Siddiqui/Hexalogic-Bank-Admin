import { rupees, statusTone } from '../store';

export default function Loans({ data }) {
  const customerName = (id) => data.customers.find((c) => c.customer_id === id)?.name || '—';
  const branchName = (id) => data.branches.find((b) => b.branch_id === id)?.branch_name || '—';
  const employeeName = (id) => data.employees.find((e) => e.employee_id === id)?.name || '—';

  return (
    <>
      <header className="page-header">
        <h1>Loans</h1>
        <p className="muted">The loan officer recommends and the branch manager sanctions. This desk only shows the book.</p>
      </header>
      <div className="card table-card">
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Customer</th><th>Branch</th><th>Principal</th><th>Rate</th><th>Term</th><th>Reviewed</th><th>Sanctioned</th><th>Status</th></tr></thead>
            <tbody>
              {data.loans.map((loan) => (
                <tr key={loan.loan_id}>
                  <td>{customerName(loan.customer_id)}</td>
                  <td>{branchName(loan.branch_id)}</td>
                  <td>{rupees.format(Number(loan.principal_amount))}</td>
                  <td>{loan.interest_rate}%</td>
                  <td>{loan.term_months} mo</td>
                  <td>{employeeName(loan.reviewed_by)}</td>
                  <td>{employeeName(loan.approved_by)}</td>
                  <td><span className={`badge badge-${statusTone(loan.status)}`}>{loan.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
