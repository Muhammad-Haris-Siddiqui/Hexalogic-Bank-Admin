import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { getData, isAuthed, subscribe } from './store';
import Layout from './Layout';
import Login from './pages/Login';
import Branches from './pages/Branches';
import AccountTypes from './pages/AccountTypes';
import Staff from './pages/Staff';
import Customers from './pages/Customers';
import Accounts from './pages/Accounts';
import Loans from './pages/Loans';
import BranchDetails from './pages/BranchDetails';

function Guard({ children }) {
  if (!isAuthed()) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [, setTick] = useState(0);
  useEffect(() => subscribe(() => setTick((n) => n + 1)), []);
  const data = getData();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isAuthed() ? <Navigate to="/branches" replace /> : <Login />} />
        <Route element={<Guard><Layout /></Guard>}>
          <Route path="/" element={<Navigate to="/branches" replace />} />
          <Route path="/branches" element={<Branches data={data} />} />
          <Route path="/branches/:branchId" element={<BranchDetails data={data} />} />
          <Route path="/account-types" element={<AccountTypes data={data} />} />
          <Route path="/staff" element={<Staff data={data} />} />
          <Route path="/customers" element={<Customers data={data} />} />
          <Route path="/accounts" element={<Accounts data={data} />} />
          <Route path="/loans" element={<Loans data={data} />} />
          <Route path="*" element={<Navigate to="/branches" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
