export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  school?: string;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  teacherName: string;
  school: string;
  students: number;
  progress?: number;
  image?: string;
}

export interface Assignment {
  id: string;
  title: string;
  courseName: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  audience: 'all' | 'students' | 'teachers';
}

export interface StatCard {
  label: string;
  value: string;
  change?: string;
  icon: string;
}
