const KEY = 'hexalogic_admin_v1';
const SESSION = 'hexalogic_admin_session';

export const DESIGNATIONS = [
  ['Teller', 'teller'],
  ['Head Teller', 'head_teller'],
  ['Customer Service Officer', 'cso'],
  ['Relationship Manager', 'relationship_manager'],
  ['Loan Officer', 'loan_officer'],
  ['Operations Manager', 'operations_manager'],
  ['Manager', 'manager'],
];

export const roleFor = (designation) => DESIGNATIONS.find(([name]) => name === designation)?.[1] || '';
export const labelFor = (role) => DESIGNATIONS.find(([, value]) => value === role)?.[0] || role;

function seed() {
  return {
    seq: { branch: 3, employee: 7, user: 7, type: 3 },
    branches: [
      { branch_id: 1, branch_code: 'BR-KHI-01', branch_name: 'Main Branch', city: 'Karachi', manager_id: 7 },
      { branch_id: 2, branch_code: 'BR-LHR-01', branch_name: 'Gulberg Branch', city: 'Lahore', manager_id: null },
      { branch_id: 3, branch_code: 'BR-ISB-01', branch_name: 'F-7 Branch', city: 'Islamabad', manager_id: null },
    ],
    employees: [
      { employee_id: 1, branch_id: 1, cnic: '4210110000111', name: 'Areeba Khan', designation: 'Teller', email: 'areeba.khan@bank.pk' },
      { employee_id: 2, branch_id: 1, cnic: '4210110000123', name: 'Usman Farooq', designation: 'Head Teller', email: 'usman.farooq@bank.pk' },
      { employee_id: 3, branch_id: 1, cnic: '4210110000135', name: 'Hina Javed', designation: 'Customer Service Officer', email: 'hina.javed@bank.pk' },
      { employee_id: 4, branch_id: 1, cnic: '4210110000147', name: 'Sadia Noor', designation: 'Relationship Manager', email: 'sadia.noor@bank.pk' },
      { employee_id: 5, branch_id: 1, cnic: '4210110000159', name: 'Omar Siddiqui', designation: 'Loan Officer', email: 'omar.siddiqui@bank.pk' },
      { employee_id: 6, branch_id: 1, cnic: '4210110000161', name: 'Nadia Pervez', designation: 'Operations Manager', email: 'nadia.pervez@bank.pk' },
      { employee_id: 7, branch_id: 1, cnic: '4210110000173', name: 'Imran Qureshi', designation: 'Manager', email: 'imran.qureshi@bank.pk' },
    ],
    users: [
      { user_id: 1, username: 'teller1', password: 'teller123', role: 'teller', employee_id: 1 },
      { user_id: 2, username: 'head1', password: 'head123', role: 'head_teller', employee_id: 2 },
      { user_id: 3, username: 'cso1', password: 'cso123', role: 'cso', employee_id: 3 },
      { user_id: 4, username: 'rm1', password: 'rm123', role: 'relationship_manager', employee_id: 4 },
      { user_id: 5, username: 'loan1', password: 'loan123', role: 'loan_officer', employee_id: 5 },
      { user_id: 6, username: 'ops1', password: 'ops123', role: 'operations_manager', employee_id: 6 },
      { user_id: 7, username: 'manager1', password: 'manager123', role: 'manager', employee_id: 7 },
    ],
    accountTypes: [
      { account_type_id: 1, type_name: 'Savings', interest_rate: '5.50', min_balance: '1000.00' },
      { account_type_id: 2, type_name: 'Current', interest_rate: '0.00', min_balance: '5000.00' },
      { account_type_id: 3, type_name: 'Fixed Deposit', interest_rate: '8.00', min_balance: '50000.00' },
    ],
  };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* fall through */ }
  const data = seed();
  save(data);
  return data;
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

let data = load();
const listeners = new Set();
const emit = () => listeners.forEach((fn) => fn());

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
export function getData() {
  return data;
}

export function login(username, password) {
  if (username.trim() === 'admin' && password === 'admin123') {
    sessionStorage.setItem(SESSION, 'admin');
    return true;
  }
  return false;
}
export function logout() {
  sessionStorage.removeItem(SESSION);
}
export function isAuthed() {
  return sessionStorage.getItem(SESSION) === 'admin';
}

function fail(message) {
  return { ok: false, error: message };
}

export function addBranch({ branch_code, branch_name, city }) {
  const code = branch_code.trim().toUpperCase();
  const name = branch_name.trim();
  const place = city.trim();
  if (!/^[A-Z0-9-]{3,10}$/.test(code)) return fail('Branch code must be 3 to 10 letters, digits, or dashes');
  if (name.length < 2) return fail('Enter the branch name');
  if (place.length < 2) return fail('Enter the city');
  if (data.branches.some((b) => b.branch_code.toLowerCase() === code.toLowerCase())) return fail('That branch code already exists');
  data = {
    ...data,
    seq: { ...data.seq, branch: data.seq.branch + 1 },
    branches: [...data.branches, { branch_id: data.seq.branch + 1, branch_code: code, branch_name: name, city: place, manager_id: null }],
  };
  save(data);
  emit();
  return { ok: true };
}

export function assignManager(branchId, employeeId) {
  const branch = data.branches.find((b) => b.branch_id === Number(branchId));
  if (!branch) return fail('Branch not found');
  if (!employeeId) {
    data = { ...data, branches: data.branches.map((b) => (b.branch_id === branch.branch_id ? { ...b, manager_id: null } : b)) };
    save(data);
    emit();
    return { ok: true };
  }
  const employee = data.employees.find((e) => e.employee_id === Number(employeeId));
  if (!employee || employee.designation !== 'Manager' || employee.branch_id !== branch.branch_id) {
    return fail('The manager must be a Manager at this branch');
  }
  data = { ...data, branches: data.branches.map((b) => (b.branch_id === branch.branch_id ? { ...b, manager_id: employee.employee_id } : b)) };
  save(data);
  emit();
  return { ok: true };
}

export function addAccountType({ type_name, interest_rate, min_balance }) {
  const name = type_name.trim();
  if (name.length < 2) return fail('Enter the account type name');
  if (data.accountTypes.some((t) => t.type_name.toLowerCase() === name.toLowerCase())) return fail('That account type already exists');
  if (!/^\d{1,2}(\.\d{1,2})?$/.test(interest_rate)) return fail('Enter an interest rate from 0 to 99.99');
  if (!/^\d{1,10}(\.\d{1,2})?$/.test(min_balance)) return fail('Enter a minimum balance');
  data = {
    ...data,
    seq: { ...data.seq, type: data.seq.type + 1 },
    accountTypes: [...data.accountTypes, {
      account_type_id: data.seq.type + 1,
      type_name: name,
      interest_rate: Number(interest_rate).toFixed(2),
      min_balance: Number(min_balance).toFixed(2),
    }],
  };
  save(data);
  emit();
  return { ok: true };
}

export function addStaff(form) {
  const name = form.name.trim();
  const email = form.email.trim().toLowerCase();
  const username = form.username.trim();
  const cnic = form.cnic.trim();
  const branch = data.branches.find((b) => b.branch_id === Number(form.branch_id));
  const role = roleFor(form.designation);
  if (!/^\d{13}$/.test(cnic)) return fail('CNIC must be 13 digits');
  if (name.length < 2) return fail('Enter the employee name');
  if (!/^\S+@\S+\.\S+$/.test(email)) return fail('Enter a valid email');
  if (!branch) return fail('Choose a branch');
  if (!role) return fail('Choose a designation');
  if (!/^[a-zA-Z0-9._]{3,30}$/.test(username)) return fail('Username must be 3 to 30 letters, digits, dots, or underscores');
  if (!form.password || form.password.length < 8) return fail('Password must be at least 8 characters');
  if (data.employees.some((e) => e.cnic === cnic)) return fail('That CNIC already exists');
  if (data.employees.some((e) => e.email === email)) return fail('That email already exists');
  if (data.users.some((u) => u.username.toLowerCase() === username.toLowerCase())) return fail('That username already exists');
  const employee_id = data.seq.employee + 1;
  const user_id = data.seq.user + 1;
  data = {
    ...data,
    seq: { ...data.seq, employee: employee_id, user: user_id },
    employees: [...data.employees, { employee_id, branch_id: branch.branch_id, cnic, name, designation: form.designation, email }],
    users: [...data.users, { user_id, username, password: form.password, role, employee_id }],
  };
  save(data);
  emit();
  return { ok: true };
}
