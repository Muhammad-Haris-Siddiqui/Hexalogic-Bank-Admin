import { rupees, statusTone } from '../store';

export default function Accounts({ data }) {
  const branchName = (id) => data.branches.find((b) => b.branch_id === id)?.branch_name || '—';
  const typeName = (id) => data.accountTypes.find((t) => t.account_type_id === id)?.type_name || '—';
  const holderName = (accountId, role) => {
    const link = data.holders.find((h) => h.account_id === accountId && h.role === role);
    return data.customers.find((c) => c.customer_id === link?.customer_id)?.name || '—';
  };

  return (
    <>
      <header className="page-header">
        <h1>Accounts</h1>
        <p className="muted">Balances and status only. Cash, freeze, and close stay on the branch desks.</p>
      </header>
      <div className="card table-card">
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Account</th><th>Holder</th><th>Branch</th><th>Type</th><th>Balance</th><th>Status</th></tr></thead>
            <tbody>
              {data.accounts.map((a) => (
                <tr key={a.account_id}>
                  <td className="mono">{a.account_number}</td>
                  <td>
                    {holderName(a.account_id, 'primary')}
                    {data.holders.some((h) => h.account_id === a.account_id && h.role === 'joint') && (
                      <div className="muted small">Joint: {holderName(a.account_id, 'joint')}</div>
                    )}
                  </td>
                  <td>{branchName(a.branch_id)}</td>
                  <td>{typeName(a.account_type_id)}</td>
                  <td>{rupees.format(Number(a.balance))}</td>
                  <td><span className={`badge badge-${statusTone(a.status)}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
