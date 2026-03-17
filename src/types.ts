import { LucideIcon } from 'lucide-react';

export type UserRole = 'ADMIN' | 'MEMBER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subscriptionType: 'SAAS' | 'LICENSE';
  avatar?: string;
}

export type PayoutFrequency = 'WEEKLY' | 'MONTHLY';

export interface PayoutSlot {
  position: number;
  memberId: string | null;
  memberName: string | null;
  status: 'PENDING' | 'PAID' | 'CURRENT';
  estimatedDate: string;
}

export interface ContributionPlan {
  id: string;
  name: string;
  description: string;
  amount: number;
  frequency: PayoutFrequency;
  duration: number; // in cycles
  maxMembers: number;
  adminFeePercent: number;
  totalPooled: number;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED';
  slots: PayoutSlot[];
  currentPosition: number;
  createdAt: string;
}

export interface Contribution {
  id: string;
  planId: string;
  memberId: string;
  memberName: string;
  amount: number;
  cycle: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  proofUrl?: string;
  paymentMethod: 'ONLINE' | 'OFFLINE';
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  fileUrl?: string;
}
