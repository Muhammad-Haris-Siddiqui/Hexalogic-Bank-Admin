import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Building2, Landmark, LogOut, Menu, ScrollText, UserRound, Users, Wallet, X } from 'lucide-react';
import { logout } from './store';

const LINKS = [
  { to: '/branches', label: 'Branches', icon: Building2 },
  { to: '/account-types', label: 'Account types', icon: Landmark },
  { to: '/staff', label: 'Staff', icon: Users },
  { to: '/customers', label: 'Customers', icon: UserRound },
  { to: '/accounts', label: 'Accounts', icon: Wallet },
  { to: '/loans', label: 'Loans', icon: ScrollText },
];

export default function Layout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div className="shell">
      <header className="topbar">
        <button className="icon-btn" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
        <strong>Hexalogic Admin</strong>
      </header>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-head">
          <span className="brand"><Landmark size={20} /> Hexalogic Admin</span>
          <button className="icon-btn sidebar-close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={18} /></button>
        </div>
        <nav className="nav">
          {LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-foot">
          <div className="user-chip">
            <span className="avatar">A</span>
            <span className="user-meta"><strong>admin</strong><small>Administrator</small></span>
          </div>
          <button className="icon-btn" aria-label="Log out" onClick={() => { logout(); navigate('/login', { replace: true }); }}>
            <LogOut size={18} />
          </button>
        </div>
      </aside>
      <main className="main"><div className="page"><Outlet /></div></main>
    </div>
  );
}
