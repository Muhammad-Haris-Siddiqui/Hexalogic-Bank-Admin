const KEY = 'hexalogic_admin_v2';
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

const money = (n) => Number(n).toFixed(2);

function seed() {
  return {
    seq: { branch: 5, employee: 115, user: 7, type: 4 },
    branches: [
      { branch_id: 1, branch_code: 'BR-KHI-01', branch_name: 'Clifton Branch', city: 'Karachi', manager_id: 101 },
      { branch_id: 2, branch_code: 'BR-KHI-02', branch_name: 'Saddar Branch', city: 'Karachi', manager_id: 103 },
      { branch_id: 3, branch_code: 'BR-LHR-01', branch_name: 'Gulberg Branch', city: 'Lahore', manager_id: 105 },
      { branch_id: 4, branch_code: 'BR-ISB-01', branch_name: 'Blue Area Branch', city: 'Islamabad', manager_id: 107 },
      { branch_id: 5, branch_code: 'BR-PSH-01', branch_name: 'University Road Branch', city: 'Peshawar', manager_id: 109 },
    ],
    employees: [
      { employee_id: 101, branch_id: 1, cnic: '4210110000011', name: 'Imran Qureshi', designation: 'Manager', email: 'imran.qureshi@bank.pk' },
      { employee_id: 102, branch_id: 1, cnic: '4210110000023', name: 'Sadia Noor', designation: 'Relationship Manager', email: 'sadia.noor@bank.pk' },
      { employee_id: 103, branch_id: 2, cnic: '4210110000035', name: 'Kamran Akbar', designation: 'Manager', email: 'kamran.akbar@bank.pk' },
      { employee_id: 104, branch_id: 2, cnic: '4210110000047', name: 'Farah Naz', designation: 'Loan Officer', email: 'farah.naz@bank.pk' },
      { employee_id: 105, branch_id: 3, cnic: '3520210000059', name: 'Tariq Mehmood', designation: 'Manager', email: 'tariq.mehmood@bank.pk' },
      { employee_id: 106, branch_id: 3, cnic: '3520210000061', name: 'Hira Saleem', designation: 'Teller', email: 'hira.saleem@bank.pk' },
      { employee_id: 107, branch_id: 4, cnic: '6110110000073', name: 'Bilal Hassan', designation: 'Manager', email: 'bilal.hassan@bank.pk' },
      { employee_id: 108, branch_id: 4, cnic: '6110110000085', name: 'Maryam Zafar', designation: 'Relationship Manager', email: 'maryam.zafar@bank.pk' },
      { employee_id: 109, branch_id: 5, cnic: '1730110000097', name: 'Junaid Iqbal', designation: 'Manager', email: 'junaid.iqbal@bank.pk' },
      { employee_id: 110, branch_id: 5, cnic: '1730110000109', name: 'Rabia Anwar', designation: 'Teller', email: 'rabia.anwar@bank.pk' },
      { employee_id: 111, branch_id: 1, cnic: '4210110000111', name: 'Areeba Khan', designation: 'Teller', email: 'areeba.khan@bank.pk' },
      { employee_id: 112, branch_id: 1, cnic: '4210110000123', name: 'Usman Farooq', designation: 'Head Teller', email: 'usman.farooq@bank.pk' },
      { employee_id: 113, branch_id: 1, cnic: '4210110000135', name: 'Hina Javed', designation: 'Customer Service Officer', email: 'hina.javed@bank.pk' },
      { employee_id: 114, branch_id: 1, cnic: '4210110000147', name: 'Omar Siddiqui', designation: 'Loan Officer', email: 'omar.siddiqui@bank.pk' },
      { employee_id: 115, branch_id: 1, cnic: '4210110000159', name: 'Nadia Pervez', designation: 'Operations Manager', email: 'nadia.pervez@bank.pk' },
    ],
    users: [
      { user_id: 1, username: 'teller1', password: 'teller123', role: 'teller', employee_id: 111 },
      { user_id: 2, username: 'head1', password: 'head123', role: 'head_teller', employee_id: 112 },
      { user_id: 3, username: 'cso1', password: 'cso123', role: 'cso', employee_id: 113 },
      { user_id: 4, username: 'rm1', password: 'rm123', role: 'relationship_manager', employee_id: 102 },
      { user_id: 5, username: 'loan1', password: 'loan123', role: 'loan_officer', employee_id: 114 },
      { user_id: 6, username: 'ops1', password: 'ops123', role: 'operations_manager', employee_id: 115 },
      { user_id: 7, username: 'manager1', password: 'manager123', role: 'manager', employee_id: 101 },
    ],
    accountTypes: [
      { account_type_id: 1, type_name: 'Savings', interest_rate: '5.50', min_balance: '1000.00' },
      { account_type_id: 2, type_name: 'Current', interest_rate: '0.00', min_balance: '5000.00' },
      { account_type_id: 3, type_name: 'Fixed Deposit', interest_rate: '8.00', min_balance: '50000.00' },
      { account_type_id: 4, type_name: 'Student', interest_rate: '3.00', min_balance: '500.00' },
    ],
    customers: [
      { customer_id: 1, cnic: '4220120000011', name: 'Ayesha Khan', phone: '0300-1110001', email: 'ayesha.khan@mail.pk', rm_employee_id: 102 },
      { customer_id: 2, cnic: '4220120000023', name: 'Ali Raza', phone: '0301-1110002', email: 'ali.raza@mail.pk', rm_employee_id: 102 },
      { customer_id: 3, cnic: '3520120000035', name: 'Zainab Malik', phone: '0302-1110003', email: 'zainab.malik@mail.pk', rm_employee_id: 108 },
      { customer_id: 4, cnic: '3520120000047', name: 'Hamza Sheikh', phone: '0303-1110004', email: 'hamza.sheikh@mail.pk', rm_employee_id: 108 },
      { customer_id: 5, cnic: '6110120000059', name: 'Sana Tariq', phone: '0304-1110005', email: 'sana.tariq@mail.pk', rm_employee_id: 102 },
      { customer_id: 6, cnic: '6110120000061', name: 'Usman Ghani', phone: '0305-1110006', email: 'usman.ghani@mail.pk', rm_employee_id: 108 },
      { customer_id: 7, cnic: '1730120000073', name: 'Fatima Noor', phone: '0306-1110007', email: 'fatima.noor@mail.pk', rm_employee_id: 102 },
      { customer_id: 8, cnic: '1730120000085', name: 'Danish Ahmed', phone: '0307-1110008', email: 'danish.ahmed@mail.pk', rm_employee_id: 108 },
      { customer_id: 9, cnic: '4220120000097', name: 'Nida Hussain', phone: '0308-1110009', email: 'nida.hussain@mail.pk', rm_employee_id: 102 },
      { customer_id: 10, cnic: '4220120000109', name: 'Bilal Rehman', phone: '0309-1110010', email: 'bilal.rehman@mail.pk', rm_employee_id: null },
    ],
    accounts: [
      { account_id: 1, account_number: 'ACC-1001', branch_id: 1, account_type_id: 1, balance: '150000.00', status: 'active' },
      { account_id: 2, account_number: 'ACC-1002', branch_id: 1, account_type_id: 2, balance: '320000.00', status: 'active' },
      { account_id: 3, account_number: 'ACC-1003', branch_id: 2, account_type_id: 1, balance: '45000.00', status: 'active' },
      { account_id: 4, account_number: 'ACC-1004', branch_id: 2, account_type_id: 3, balance: '1000000.00', status: 'active' },
      { account_id: 5, account_number: 'ACC-1005', branch_id: 3, account_type_id: 1, balance: '78000.00', status: 'active' },
      { account_id: 6, account_number: 'ACC-1006', branch_id: 3, account_type_id: 4, balance: '12000.00', status: 'active' },
      { account_id: 7, account_number: 'ACC-1007', branch_id: 4, account_type_id: 2, balance: '560000.00', status: 'active' },
      { account_id: 8, account_number: 'ACC-1008', branch_id: 4, account_type_id: 1, balance: '25000.00', status: 'frozen' },
      { account_id: 9, account_number: 'ACC-1009', branch_id: 5, account_type_id: 1, balance: '91000.00', status: 'active' },
      { account_id: 10, account_number: 'ACC-1010', branch_id: 5, account_type_id: 3, balance: '750000.00', status: 'active' },
      { account_id: 11, account_number: 'ACC-1011', branch_id: 1, account_type_id: 1, balance: '0.00', status: 'closed' },
      { account_id: 12, account_number: 'ACC-1012', branch_id: 3, account_type_id: 2, balance: '210000.00', status: 'active' },
    ],
    holders: [
      { customer_id: 1, account_id: 1, role: 'primary' },
      { customer_id: 2, account_id: 2, role: 'primary' },
      { customer_id: 3, account_id: 3, role: 'primary' },
      { customer_id: 4, account_id: 4, role: 'primary' },
      { customer_id: 5, account_id: 5, role: 'primary' },
      { customer_id: 6, account_id: 6, role: 'primary' },
      { customer_id: 7, account_id: 7, role: 'primary' },
      { customer_id: 8, account_id: 8, role: 'primary' },
      { customer_id: 9, account_id: 9, role: 'primary' },
      { customer_id: 1, account_id: 10, role: 'primary' },
      { customer_id: 5, account_id: 11, role: 'primary' },
      { customer_id: 2, account_id: 12, role: 'primary' },
      { customer_id: 3, account_id: 1, role: 'joint' },
    ],
    loans: [
      { loan_id: 1, customer_id: 1, branch_id: 1, approved_by: 101, reviewed_by: null, principal_amount: '500000.00', interest_rate: '12.50', term_months: 36, status: 'approved' },
      { loan_id: 2, customer_id: 2, branch_id: 1, approved_by: 101, reviewed_by: null, principal_amount: '1200000.00', interest_rate: '11.00', term_months: 60, status: 'approved' },
      { loan_id: 3, customer_id: 4, branch_id: 2, approved_by: 103, reviewed_by: 104, principal_amount: '300000.00', interest_rate: '13.00', term_months: 24, status: 'approved' },
      { loan_id: 4, customer_id: 6, branch_id: 3, approved_by: 105, reviewed_by: null, principal_amount: '750000.00', interest_rate: '12.00', term_months: 24, status: 'closed' },
      { loan_id: 5, customer_id: 7, branch_id: 4, approved_by: 107, reviewed_by: null, principal_amount: '2000000.00', interest_rate: '10.50', term_months: 84, status: 'approved' },
      { loan_id: 6, customer_id: 9, branch_id: 5, approved_by: 109, reviewed_by: null, principal_amount: '150000.00', interest_rate: '14.00', term_months: 12, status: 'approved' },
      { loan_id: 7, customer_id: 4, branch_id: 2, approved_by: null, reviewed_by: null, principal_amount: '100000.00', interest_rate: '13.50', term_months: 12, status: 'pending' },
      { loan_id: 8, customer_id: 1, branch_id: 1, approved_by: null, reviewed_by: null, principal_amount: '250000.00', interest_rate: '12.50', term_months: 24, status: 'pending' },
      { loan_id: 9, customer_id: 2, branch_id: 1, approved_by: null, reviewed_by: 114, principal_amount: '800000.00', interest_rate: '11.50', term_months: 36, status: 'recommended' },
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

function save(next) {
  localStorage.setItem(KEY, JSON.stringify(next));
}

let data = load();
const listeners = new Set();
const emit = () => listeners.forEach((fn) => fn());

function commit(next) {
  data = next;
  save(data);
  emit();
  return { ok: true };
}

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

function rates(interest_rate, min_balance) {
  if (!/^\d{1,2}(\.\d{1,2})?$/.test(String(interest_rate).trim())) return fail('Enter an interest rate from 0 to 99.99');
  if (!/^\d{1,10}(\.\d{1,2})?$/.test(String(min_balance).trim())) return fail('Enter a minimum balance');
  return { ok: true, interest_rate: money(interest_rate), min_balance: money(min_balance) };
}

function loginFields(username, password) {
  const name = username.trim();
  if (!/^[a-zA-Z0-9._]{3,30}$/.test(name)) return fail('Username must be 3 to 30 letters, digits, dots, or underscores');
  if (!password || password.length < 8) return fail('Password must be at least 8 characters');
  if (data.users.some((u) => u.username.toLowerCase() === name.toLowerCase())) return fail('That username already exists');
  return { ok: true, username: name };
}

export function addBranch({ branch_code, branch_name, city }) {
  const code = branch_code.trim().toUpperCase();
  const name = branch_name.trim();
  const place = city.trim();
  if (!/^[A-Z0-9-]{3,10}$/.test(code)) return fail('Branch code must be 3 to 10 letters, digits, or dashes');
  if (name.length < 2) return fail('Enter the branch name');
  if (place.length < 2) return fail('Enter the city');
  if (data.branches.some((b) => b.branch_code.toLowerCase() === code.toLowerCase())) return fail('That branch code already exists');
  return commit({
    ...data,
    seq: { ...data.seq, branch: data.seq.branch + 1 },
    branches: [...data.branches, { branch_id: data.seq.branch + 1, branch_code: code, branch_name: name, city: place, manager_id: null }],
  });
}

export function updateBranch(branchId, { branch_name, city }) {
  const branch = data.branches.find((b) => b.branch_id === Number(branchId));
  if (!branch) return fail('Branch not found');
  const name = branch_name.trim();
  const place = city.trim();
  if (name.length < 2) return fail('Enter the branch name');
  if (place.length < 2) return fail('Enter the city');
  return commit({
    ...data,
    branches: data.branches.map((b) => (b.branch_id === branch.branch_id ? { ...b, branch_name: name, city: place } : b)),
  });
}

export function assignManager(branchId, employeeId) {
  const branch = data.branches.find((b) => b.branch_id === Number(branchId));
  if (!branch) return fail('Branch not found');
  if (!employeeId) {
    return commit({
      ...data,
      branches: data.branches.map((b) => (b.branch_id === branch.branch_id ? { ...b, manager_id: null } : b)),
    });
  }
  const employee = data.employees.find((e) => e.employee_id === Number(employeeId));
  if (!employee || employee.designation !== 'Manager' || employee.branch_id !== branch.branch_id) {
    return fail('The manager must be a Manager at this branch');
  }
  return commit({
    ...data,
    branches: data.branches.map((b) => (b.branch_id === branch.branch_id ? { ...b, manager_id: employee.employee_id } : b)),
  });
}

export function addAccountType({ type_name, interest_rate, min_balance }) {
  const name = type_name.trim();
  if (name.length < 2) return fail('Enter the account type name');
  if (data.accountTypes.some((t) => t.type_name.toLowerCase() === name.toLowerCase())) return fail('That account type already exists');
  const rate = rates(interest_rate, min_balance);
  if (!rate.ok) return rate;
  return commit({
    ...data,
    seq: { ...data.seq, type: data.seq.type + 1 },
    accountTypes: [...data.accountTypes, {
      account_type_id: data.seq.type + 1,
      type_name: name,
      interest_rate: rate.interest_rate,
      min_balance: rate.min_balance,
    }],
  });
}

export function updateAccountType(typeId, { interest_rate, min_balance }) {
  const type = data.accountTypes.find((t) => t.account_type_id === Number(typeId));
  if (!type) return fail('Account type not found');
  const rate = rates(interest_rate, min_balance);
  if (!rate.ok) return rate;
  return commit({
    ...data,
    accountTypes: data.accountTypes.map((t) => (
      t.account_type_id === type.account_type_id
        ? { ...t, interest_rate: rate.interest_rate, min_balance: rate.min_balance }
        : t
    )),
  });
}

export function addStaff(form) {
  const name = form.name.trim();
  const email = form.email.trim().toLowerCase();
  const cnic = form.cnic.trim();
  const branch = data.branches.find((b) => b.branch_id === Number(form.branch_id));
  const role = roleFor(form.designation);
  const login = loginFields(form.username, form.password);
  if (!/^\d{13}$/.test(cnic)) return fail('CNIC must be 13 digits');
  if (name.length < 2) return fail('Enter the employee name');
  if (!/^\S+@\S+\.\S+$/.test(email)) return fail('Enter a valid email');
  if (!branch) return fail('Choose a branch');
  if (!role) return fail('Choose a designation');
  if (!login.ok) return login;
  if (data.employees.some((e) => e.cnic === cnic)) return fail('That CNIC already exists');
  if (data.employees.some((e) => e.email === email)) return fail('That email already exists');
  const employee_id = data.seq.employee + 1;
  const user_id = data.seq.user + 1;
  return commit({
    ...data,
    seq: { ...data.seq, employee: employee_id, user: user_id },
    employees: [...data.employees, { employee_id, branch_id: branch.branch_id, cnic, name, designation: form.designation, email }],
    users: [...data.users, { user_id, username: login.username, password: form.password, role, employee_id }],
  });
}

export function updateStaff(employeeId, form) {
  const employee = data.employees.find((e) => e.employee_id === Number(employeeId));
  if (!employee) return fail('Employee not found');
  const email = form.email.trim().toLowerCase();
  const branch = data.branches.find((b) => b.branch_id === Number(form.branch_id));
  const role = roleFor(form.designation);
  if (!/^\S+@\S+\.\S+$/.test(email)) return fail('Enter a valid email');
  if (!branch) return fail('Choose a branch');
  if (!role) return fail('Choose a designation');
  if (data.employees.some((e) => e.email === email && e.employee_id !== employee.employee_id)) return fail('That email already exists');
  const moved = employee.branch_id !== branch.branch_id || form.designation !== 'Manager';
  const branches = moved
    ? data.branches.map((b) => (b.manager_id === employee.employee_id ? { ...b, manager_id: null } : b))
    : data.branches;
  return commit({
    ...data,
    branches,
    employees: data.employees.map((e) => (
      e.employee_id === employee.employee_id
        ? { ...e, email, branch_id: branch.branch_id, designation: form.designation }
        : e
    )),
    users: data.users.map((u) => (u.employee_id === employee.employee_id ? { ...u, role } : u)),
  });
}

export function addLogin(employeeId, { username, password }) {
  const employee = data.employees.find((e) => e.employee_id === Number(employeeId));
  if (!employee) return fail('Employee not found');
  if (data.users.some((u) => u.employee_id === employee.employee_id)) return fail('This employee already has a login');
  const role = roleFor(employee.designation);
  const login = loginFields(username, password);
  if (!role) return fail('Choose a designation');
  if (!login.ok) return login;
  const user_id = data.seq.user + 1;
  return commit({
    ...data,
    seq: { ...data.seq, user: user_id },
    users: [...data.users, { user_id, username: login.username, password, role, employee_id: employee.employee_id }],
  });
}

export function statusTone(status) {
  if (status === 'active' || status === 'approved') return 'ok';
  if (status === 'frozen' || status === 'pending') return 'warn';
  if (status === 'recommended') return 'info';
  if (status === 'rejected') return 'bad';
  return 'muted';
}

export const rupees = new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR' });
