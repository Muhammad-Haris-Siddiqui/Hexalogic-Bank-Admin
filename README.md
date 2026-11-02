# Hexalogic Bank Admin

React (Vite) desk for setting up the bank: branches, account types, and staff logins. It does not open accounts, move cash, or decide loans. Those stay in the branch app.

Demo data is kept in this browser under `localStorage` key `hexalogic_admin_v1`. It is not shared with the customer app, and it does not write to MySQL.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5174

| Login | Password |
|-------|----------|
| `admin` | `admin123` |

The first screen is filled with the Clifton desk from the branch demo: Main, Gulberg, and F-7, plus the seven Main Branch jobs (`teller1` / `teller123` through `manager1` / `manager123`).

A new staff member's login role is taken from their designation. Only a person designated Manager at a branch can be assigned as that branch's manager.
