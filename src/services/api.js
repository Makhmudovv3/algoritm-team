// Generic Repository to simulate a Database connection (PostgreSQL in the future)
class BaseRepository {
  constructor(tableName, initialData = []) {
    this.tableName = tableName;
    if (!localStorage.getItem(this.tableName)) {
      localStorage.setItem(this.tableName, JSON.stringify(initialData));
    }
  }

  // Simulate network delay and async behavior
  async _delay(ms = 50) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this._delay();
    return JSON.parse(localStorage.getItem(this.tableName) || '[]');
  }

  async getById(id) {
    await this._delay();
    const items = await this.getAll();
    return items.find(item => item.id === id);
  }

  async findBy(field, value) {
    await this._delay();
    const items = await this.getAll();
    return items.find(item => String(item[field]) === String(value));
  }

  async create(data) {
    await this._delay();
    const items = await this.getAll();
    const newItem = {
      ...data,
      id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
      created_at: data.created_at || new Date().toISOString()
    };
    items.push(newItem);
    localStorage.setItem(this.tableName, JSON.stringify(items));
    return newItem;
  }

  async update(id, data) {
    await this._delay();
    const items = await this.getAll();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) throw new Error(`${this.tableName}: Record with id ${id} not found`);
    
    const updatedItem = { ...items[index], ...data, updated_at: new Date().toISOString() };
    items[index] = updatedItem;
    localStorage.setItem(this.tableName, JSON.stringify(items));
    return updatedItem;
  }

  async delete(id) {
    await this._delay();
    const items = await this.getAll();
    const filtered = items.filter(item => item.id !== id);
    localStorage.setItem(this.tableName, JSON.stringify(filtered));
    return true;
  }
}

// DrawSQL Schema based repositories
export const api = {
  // Admin
  Roles: new BaseRepository('roles', [
    { id: 'role-1', name: 'Admin', level: 1, created_at: new Date().toISOString() },
    { id: 'role-2', name: 'Manager', level: 2, created_at: new Date().toISOString() },
    { id: 'role-3', name: 'Teacher', level: 3, created_at: new Date().toISOString() }
  ]),
  Branches: new BaseRepository('branches', [
    { id: 'branch-1', name: 'Chilonzor Filiali', address: 'Chilonzor, Qatortol', created_at: new Date().toISOString() }
  ]),
  Rooms: new BaseRepository('rooms', [
    { id: 'room-1', branch_id: 'branch-1', name: 'Frontend xonasi', capacity: 20 }
  ]),
  Users: new BaseRepository('users', [
    { id: 'user-1', role_id: 'role-1', fullname: 'Super Admin', phone: '+998 (90) 123 45 67', email: 'admin@algoritm.uz', password_hash: 'hash', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ]),
  Teachers: new BaseRepository('teachers', [
    { id: 'teacher-1', user_id: 'user-1', branch_id: 'branch-1', salary_per_student: 150000, is_active: true, created_at: new Date().toISOString() }
  ]),

  // Academic
  Courses: new BaseRepository('courses', [
    { id: 'course-1', name: 'Frontend React', duration_month: 6, created_at: new Date().toISOString() }
  ]),
  Groups: new BaseRepository('groups', [
    { id: 'group-1', course_id: 'course-1', teacher_id: 'teacher-1', room_id: 'room-1', name: 'FR-01', start_date: '2026-08-01', end_date: '2027-02-01', lesson_duration: 120, monthly_lessons: 12, is_active: true }
  ]),
  Schedules: new BaseRepository('schedules', []),
  Lessons: new BaseRepository('lessons', []),
  StudentTransfers: new BaseRepository('student_transfer', []),

  // Finance
  FinanceAccounts: new BaseRepository('finance_accounts', [
    { id: 'acc-1', name: 'Asosiy Kassa', branch_id: 'branch-1', type: 'cash', created_at: new Date().toISOString() },
    { id: 'acc-2', name: 'Ipak Yo\'li Bank (So\'m)', branch_id: 'branch-1', type: 'bank', created_at: new Date().toISOString() },
    { id: 'acc-3', name: 'Click / Payme (Karta)', branch_id: 'branch-1', type: 'card', created_at: new Date().toISOString() }
  ]),
  Payments: new BaseRepository('payments', [
    { id: 'pay-1', student_id: 'student-1', sum: 350000, type: 'cash', date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(), finance_account_id: 'acc-1', created_at: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString() },
    { id: 'pay-2', student_id: 'student-1', sum: 400000, type: 'card', date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), finance_account_id: 'acc-3', created_at: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString() },
    { id: 'pay-3', student_id: 'student-1', sum: 200000, type: 'bank', date: new Date().toISOString(), finance_account_id: 'acc-2', created_at: new Date().toISOString() }
  ]),
  PendingPayments: new BaseRepository('pending_payments', [
    { id: 'pend-1', student_id: 'student-1', sum: 150000, due_date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(), created_at: new Date().toISOString() }
  ]),
  Invoices: new BaseRepository('invoices', []),
  Discounts: new BaseRepository('discounts', [
    { id: 'disc-1', name: 'Aka-uka chegirmasi', percent: 10, sum: null, comment: 'Bir oiladan 2 ta bola o\'qisa', created_at: new Date().toISOString() },
    { id: 'disc-2', name: 'Ijtimoiy himoya', percent: null, sum: 100000, comment: 'Kam ta\'minlangan oilalarga yordam', created_at: new Date().toISOString() }
  ]),
  Grants: new BaseRepository('grants', [
    { id: 'grant-1', name: 'IT Park Granti', percent: 100, sum: null, comment: 'IT Park tomonidan qoplab beriladi', created_at: new Date().toISOString() },
    { id: 'grant-2', name: 'Ichki iqtidor', percent: null, sum: 200000, comment: 'Eng a\'lochi o\'quvchilarga rag\'batlantirish', created_at: new Date().toISOString() }
  ]),
  CallLogs: new BaseRepository('call_logs', [
    { id: 'call-1', user_id: 'user-1', phone_number: '+998 90 123 45 67', call_date: new Date().toISOString(), call_status: 'success', comments: 'Kurs narxlarini so\'radi', created_at: new Date().toISOString() },
    { id: 'call-2', user_id: 'user-1', phone_number: '+998 99 987 65 43', call_date: new Date(Date.now() - 86400000).toISOString(), call_status: 'no_answer', comments: 'Band ekan', created_at: new Date(Date.now() - 86400000).toISOString() }
  ]),

  // Students
  Parents: new BaseRepository('parents', [
    { id: 'parent-1', name: 'Valiyev Ali', phone: '+998 (91) 234 56 78', phone2: '', relation: 'Ota', telegram: '@alivaliyev', created_at: new Date().toISOString() }
  ]),
  Students: new BaseRepository('students', [
    { id: 'student-1', fullname: 'Valiyev Gani', birthday: '2010-05-10', gender: 'Male', phone: '+998 (99) 987 65 43', parent_id: 'parent-1', created_at: new Date().toISOString() }
  ]),
  StudentGroups: new BaseRepository('student_groups', [
    { id: 'sg-1', student_id: 'student-1', group_id: 'group-1', joined_at: new Date().toISOString(), left_at: null, status: 'Active' }
  ]),
  Attendance: new BaseRepository('attendance', []),
  Ratings: new BaseRepository('ratings', [])
};
