export const users = [
  {
    id: 1,
    name: 'Dr. Patricia Martinez',
    email: 'patricia.martinez@hospital.com',
    password: 'admin123',
    role: 'Hospital Operations Manager',
    permissions: ['view_all', 'approve_schedules', 'generate_schedules', 'view_analytics']
  },
  {
    id: 2,
    name: 'Jennifer Thompson, RN',
    email: 'jennifer.thompson@hospital.com',
    password: 'nurse123',
    role: 'Nurse Manager',
    permissions: ['view_schedules', 'approve_schedules', 'generate_schedules']
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@hospital.com',
    password: 'staff123',
    role: 'Clinical Staff',
    permissions: ['view_schedules']
  }
];
