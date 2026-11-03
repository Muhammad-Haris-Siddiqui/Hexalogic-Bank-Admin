import { Link, Navigate, useParams } from 'react-router-dom';
import { rupees, statusTone } from '../store';

export default function BranchDetails({ data }) {
  const { branchId } = useParams();
  const branch = data.branches.find((item) => item.branch_id === Number(branchId));

  if (!branch) return <Navigate to="/branches" replace />;

  const staff = data.employees.filter((employee) => employee.branch_id === branch.branch_id);
  const accounts = data.accounts.filter((account) => account.branch_id === branch.branch_id);
  const loans = data.loans.filter((loan) => loan.branch_id === branch.branch_id);
  const accountIds = new Set(accounts.map((account) => account.account_id));
  const customerIds = new Set(
    data.customers
      .filter((customer) => staff.some((employee) => employee.employee_id === customer.rm_employee_id))
      .map((customer) => customer.customer_id),
  );
  data.holders.forEach((holder) => {
    if (accountIds.has(holder.account_id)) customerIds.add(holder.customer_id);
  });
  const customers = data.customers.filter((customer) => customerIds.has(customer.customer_id));
  const manager = data.employees.find((employee) => employee.employee_id === branch.manager_id);
  const accountType = (id) => data.accountTypes.find((type) => type.account_type_id === id)?.type_name || '—';
  const customerName = (id) => data.customers.find((customer) => customer.customer_id === id)?.name || '—';
  const employeeName = (id) => data.employees.find((employee) => employee.employee_id === id)?.name || '—';
  const accountHolders = (accountId) => data.holders
    .filter((holder) => holder.account_id === accountId)
    .map((holder) => customerName(holder.customer_id))
    .join(', ') || '—';
  const accountsForCustomer = (customerId) => accounts.filter((account) => (
    data.holders.some((holder) => holder.account_id === account.account_id && holder.customer_id === customerId)
  )).length;

  return (
    <>
      <header className="page-header">
        <Link className="muted small" to="/branches">← All branches</Link>
        <h1>{branch.branch_name}</h1>
        <p className="muted">{branch.branch_code} · {branch.city} · Manager: {manager?.name || 'Not assigned'}</p>
      </header>

      <dl className="branch-metrics" aria-label="Branch totals">
        <div><dt>Customers</dt><dd>{customers.length}</dd></div>
        <div><dt>Accounts</dt><dd>{accounts.length}</dd></div>
        <div><dt>Staff</dt><dd>{staff.length}</dd></div>
        <div><dt>Loans</dt><dd>{loans.length}</dd></div>
      </dl>

      <section className="branch-section">
        <h2>Customers</h2>
        <div className="card table-card">
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Customer</th><th>CNIC</th><th>Phone</th><th>Relationship manager</th><th>Branch accounts</th></tr></thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td><strong>{customer.name}</strong><div className="muted small">{customer.email}</div></td>
                    <td className="mono">{customer.cnic}</td>
                    <td>{customer.phone}</td>
                    <td>{employeeName(customer.rm_employee_id)}</td>
                    <td>{accountsForCustomer(customer.customer_id)}</td>
                  </tr>
                ))}
                {!customers.length && <tr><td colSpan="5" className="muted">No customers are linked to this branch yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="branch-section">
        <h2>Accounts</h2>
        <div className="card table-card">
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Account</th><th>Customer(s)</th><th>Type</th><th>Balance</th><th>Status</th></tr></thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.account_id}>
                    <td className="mono">{account.account_number}</td>
                    <td>{accountHolders(account.account_id)}</td>
                    <td>{accountType(account.account_type_id)}</td>
                    <td>{rupees.format(Number(account.balance))}</td>
                    <td><span className={`badge badge-${statusTone(account.status)}`}>{account.status}</span></td>
                  </tr>
                ))}
                {!accounts.length && <tr><td colSpan="5" className="muted">No accounts in this branch yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="branch-section">
        <h2>Staff</h2>
        <div className="card table-card">
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Name</th><th>Designation</th><th>Email</th></tr></thead>
              <tbody>
                {staff.map((employee) => (
                  <tr key={employee.employee_id}>
                    <td><strong>{employee.name}</strong></td>
                    <td>{employee.designation}</td>
                    <td>{employee.email}</td>
                  </tr>
                ))}
                {!staff.length && <tr><td colSpan="3" className="muted">No staff assigned to this branch yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="branch-section">
        <h2>Loans</h2>
        <div className="card table-card">
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Customer</th><th>Principal</th><th>Rate</th><th>Term</th><th>Status</th></tr></thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan.loan_id}>
                    <td>{customerName(loan.customer_id)}</td>
                    <td>{rupees.format(Number(loan.principal_amount))}</td>
                    <td>{loan.interest_rate}%</td>
                    <td>{loan.term_months} mo</td>
                    <td><span className={`badge badge-${statusTone(loan.status)}`}>{loan.status}</span></td>
                  </tr>
                ))}
                {!loans.length && <tr><td colSpan="5" className="muted">No loans in this branch yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}