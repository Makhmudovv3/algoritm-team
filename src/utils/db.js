// Boshlang'ich mock ma'lumotlar
const initialData = {
  roles: [
    { id: '11111111-1111-1111-1111-111111111111', name: 'Admin', level: 1, created_at: '2026-07-16T10:00:00Z' },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Manager', level: 2, created_at: '2026-07-16T11:00:00Z' },
    { id: '33333333-3333-3333-3333-333333333333', name: 'Teacher', level: 3, created_at: '2026-07-16T12:00:00Z' },
  ],
  branches: [
    { id: 1, name: 'Chilonzor filiali', address: 'Chilonzor metro yaqinida' },
    { id: 2, name: 'Yunusobod filiali', address: 'Yunusobod 4-mavze' },
  ],
  rooms: [
    { id: 1, name: '3-xona', capacity: 15, branch_id: 1 },
    { id: 2, name: 'Slack xonasi', capacity: 20, branch_id: 1 },
    { id: 3, name: 'Katta zal', capacity: 50, branch_id: 2 },
  ],
  users: [
    { id: 1, fullname: 'Abdulaziz Qodirov', phone: '+998 90 111 22 33', email: 'abdulaziz@example.com', role_id: '11111111-1111-1111-1111-111111111111', is_active: true, created_at: '2026-01-10' },
    { id: 2, fullname: 'Sardor Karimov', phone: '+998 93 987 65 43', email: 'sardor@example.com', role_id: '22222222-2222-2222-2222-222222222222', is_active: true, created_at: '2026-02-15' },
    { id: 3, fullname: 'Malika Rustamova', phone: '+998 97 111 22 33', email: 'malika@example.com', role_id: '33333333-3333-3333-3333-333333333333', is_active: false, created_at: '2026-03-20' },
    { id: 4, fullname: 'Zarina Aliyeva', phone: '+998 99 555 44 33', email: 'zarina@example.com', role_id: '22222222-2222-2222-2222-222222222222', is_active: true, created_at: '2026-04-05' },
  ],
  teachers: [
    // Note: in previous steps, user.name was used in teachers table, but users table has user.fullname. 
    // We will align the user keys here.
    { id: 1, user_id: 1, branch_id: 1, salary_per_student: 150000, is_active: true },
    { id: 2, user_id: 2, branch_id: 2, salary_per_student: 120000, is_active: true },
    { id: 3, user_id: 3, branch_id: 1, salary_per_student: 180000, is_active: false },
  ]
};

// LocalStorage ni tekshirib boshlang'ich ma'lumotlarni yozish
const initializeDB = () => {
  const keys = ['roles', 'branches', 'rooms', 'users', 'teachers'];
  keys.forEach(key => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(initialData[key]));
    }
  });
};

initializeDB();

// Getters
export const getRoles = () => JSON.parse(localStorage.getItem('roles'));
export const getBranches = () => JSON.parse(localStorage.getItem('branches'));
export const getRooms = () => JSON.parse(localStorage.getItem('rooms'));
export const getUsers = () => JSON.parse(localStorage.getItem('users'));
export const getTeachers = () => JSON.parse(localStorage.getItem('teachers'));

// Setters
export const saveRoles = (data) => localStorage.setItem('roles', JSON.stringify(data));
export const saveBranches = (data) => localStorage.setItem('branches', JSON.stringify(data));
export const saveRooms = (data) => localStorage.setItem('rooms', JSON.stringify(data));
export const saveUsers = (data) => localStorage.setItem('users', JSON.stringify(data));
export const saveTeachers = (data) => localStorage.setItem('teachers', JSON.stringify(data));
