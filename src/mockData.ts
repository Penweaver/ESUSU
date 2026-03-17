import { ContributionPlan, User, Contribution } from './types';

export const MOCK_ADMIN: User = {
  id: 'admin-1',
  name: 'Adashe Admin',
  email: 'admin@adashe.com',
  role: 'ADMIN',
  subscriptionType: 'LICENSE',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
};

export const MOCK_USER: User = {
  id: 'user-1',
  name: 'Adu Dare',
  email: 'adu.dare16@gmail.com',
  role: 'MEMBER',
  subscriptionType: 'SAAS',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Adu',
};

export const MOCK_PLANS: ContributionPlan[] = [];

export const MOCK_CONTRIBUTIONS: Contribution[] = [];
