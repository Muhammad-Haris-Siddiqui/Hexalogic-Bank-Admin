# Hexalogic Bank Admin

React (Vite) desk for the bank's setup, plus a read-only view of customers, accounts, and loans. It does not move cash or decide loans. Those stay in the branch app.

Demo data is kept in this browser under `localStorage` key `hexalogic_admin_v2`. It is not shared with the customer app, and it does not write to MySQL.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5174

| Login | Password |
|-------|----------|
| `admin` | `admin123` |

The first screen follows the database seed: Clifton, Saddar, Gulberg, Blue Area, and University Road. Each branch already has its own manager. Clifton staff logins are `teller1` / `teller123` through `manager1` / `manager123`. The other four branch managers are on the staff list without a login until you create one.

A staff login's role is taken from the designation. Only a person designated Manager at a branch can be assigned as that branch's manager.
