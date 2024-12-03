export interface AdminRole {
  id: string;
  role: 'admin' | 'superadmin';
  permissions: string[];
  createdAt: any;
  updatedAt: any;
}