import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark } from 'lucide-react';
import { login } from '../store';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  function submit(e) {
    e.preventDefault();
    if (!login(form.username, form.password)) {
      setError('Invalid username or password');
      return;
    }
    navigate('/branches', { replace: true });
  }

  return (
    <div className="auth">
      <section className="auth-side">
        <div>
          <span className="brand"><Landmark size={22} /> Hexalogic Admin</span>
          <h2>Set up the bank. Leave the counter to the branch.</h2>
          <p>This desk creates branches, account types, and staff logins. It does not move money or decide loans.</p>
          <ul>
            <li>Branches and their managers</li>
            <li>Savings, current, and other account types</li>
            <li>One login for each branch job</li>
          </ul>
        </div>
        <small>Demo data stays in this browser.</small>
      </section>
      <section className="auth-main">
        <form className="auth-card form" onSubmit={submit}>
          <h1>Admin sign in</h1>
          <p className="muted">Use the seeded administrator.</p>
          {error && <div className="alert alert-err">{error}</div>}
          <div className="field">
            <label htmlFor="username">Username</label>
            <input id="username" value={form.username} onChange={set('username')} autoComplete="username" required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={form.password} onChange={set('password')} autoComplete="current-password" required />
          </div>
          <button className="btn btn-primary btn-block" type="submit">Log in</button>
          <button className="btn btn-block" type="button" onClick={() => setForm({ username: 'admin', password: 'admin123' })}>
            Fill admin / admin123
          </button>
        </form>
      </section>
    </div>
  );
}
