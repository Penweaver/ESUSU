import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Wallet, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  AlertCircle,
  ArrowUpRight,
  FileText,
  Shield
} from 'lucide-react';
import { motion } from 'motion/react';
import { ContributionPlan, Contribution, User } from '../types';

interface MemberDashboardProps {
  user: User;
  plans: ContributionPlan[];
  contributions: Contribution[];
  onViewPlan: (planId: string) => void;
  onExplore: () => void;
}

export const MemberDashboard: React.FC<MemberDashboardProps> = ({ 
  user, 
  plans, 
  contributions,
  onViewPlan,
  onExplore
}) => {
  const myPlans = plans.filter(p => p.slots.some(s => s.memberId === user.id));
  const totalSaved = contributions.filter(c => c.status === 'APPROVED' && c.memberId === user.id).reduce((acc, curr) => acc + curr.amount, 0);
  
  const nextPayoutSlot = myPlans
    .flatMap(p => p.slots.filter(s => s.memberId === user.id && s.status !== 'PAID'))
    .sort((a, b) => a.position - b.position)[0];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Hello, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-slate-400">Here's what's happening with your savings today.</p>
        </div>
        <button 
          onClick={onExplore}
          className="bg-primary text-background px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:glow-primary transition-all"
        >
          Join New Plan
          <ArrowUpRight size={18} />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-3xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Wallet className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Total Saved</p>
              <h3 className="text-2xl font-bold text-white">₦{totalSaved.toLocaleString()}</h3>
            </div>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: totalSaved > 0 ? '100%' : '0%' }} />
          </div>
        </div>

        <div className="glass p-6 rounded-3xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              <TrendingUp className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Active Plans</p>
              <h3 className="text-2xl font-bold text-white">{myPlans.length}</h3>
            </div>
          </div>
          <p className="text-xs text-slate-400">You are in {myPlans.length} active contribution cycles.</p>
        </div>

        <div className="glass p-6 rounded-3xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-warning/10 flex items-center justify-center">
              <Clock className="text-warning" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Next Payout</p>
              <h3 className="text-2xl font-bold text-white">
                {nextPayoutSlot ? `Slot #${nextPayoutSlot.position}` : 'N/A'}
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            {nextPayoutSlot ? `Estimated: ${new Date(nextPayoutSlot.estimatedDate).toLocaleDateString()}` : 'Join a plan to see estimates'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Plans List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Shield className="text-primary" size={20} />
              Your Active Plans
            </h2>
            <button className="text-sm text-primary font-semibold hover:underline">View All</button>
          </div>

          {myPlans.length > 0 ? (
            <div className="space-y-4">
              {myPlans.map((plan) => {
                const mySlot = plan.slots.find(s => s.memberId === user.id);
                const progress = (plan.currentPosition / plan.duration) * 100;
                
                return (
                  <div 
                    key={plan.id}
                    onClick={() => onViewPlan(plan.id)}
                    className="glass p-6 rounded-3xl hover:border-primary/30 transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl font-black text-primary/50">
                          {plan.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{plan.name}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Users size={12} /> {plan.slots.filter(s => s.memberId).length}/{plan.maxMembers}
                            </span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Wallet size={12} /> ₦{plan.amount.toLocaleString()} / {plan.frequency.toLowerCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Your Position</p>
                        <span className="text-2xl font-black text-accent">#{mySlot?.position}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                        <span className="text-slate-500">Progress: Cycle {plan.currentPosition} of {plan.duration}</span>
                        <span className="text-primary">{Math.round(progress)}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className="h-full bg-primary" 
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="glass p-12 rounded-3xl text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="text-slate-600" size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No active plans yet</h3>
              <p className="text-slate-400 mb-6">Join a contribution plan to start your savings journey.</p>
              <button 
                onClick={onExplore}
                className="bg-white/5 border border-white/10 px-6 py-2 rounded-full font-bold hover:bg-white/10 transition-all"
              >
                Explore Plans
              </button>
            </div>
          )}
        </div>

        {/* Recent Activity / Notifications */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="text-accent" size={20} />
            Recent Activity
          </h2>
          
          <div className="glass rounded-3xl overflow-hidden">
            <div className="p-6 space-y-6">
              {contributions.slice(0, 5).map((c, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    c.status === 'APPROVED' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                  }`}>
                    {c.status === 'APPROVED' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">
                      {c.status === 'APPROVED' ? 'Payment Approved' : 'Payment Pending'}
                    </p>
                    <p className="text-xs text-slate-500 truncate">₦{c.amount.toLocaleString()} • Plan ID: {c.planId.split('-')[1]}</p>
                    <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-widest">{new Date(c.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 border-t border-border text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
              View All Activity
            </button>
          </div>

          {/* Quick Support Card */}
          <div className="bg-primary/10 border border-primary/20 p-6 rounded-3xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
              <MessageSquare size={120} className="text-primary" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Need Help?</h4>
            <p className="text-sm text-slate-400 mb-4">Chat directly with our admin for any payment or plan issues.</p>
            <button className="bg-primary text-background px-4 py-2 rounded-xl text-xs font-bold hover:glow-primary transition-all">
              Open Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageSquare = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
