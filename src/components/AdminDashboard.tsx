import React from 'react';
import { 
  Users, 
  Wallet, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  ArrowUpRight,
  FileDown,
  ShieldCheck,
  X,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContributionPlan, Contribution, User, PayoutFrequency } from '../types';

interface AdminDashboardProps {
  plans: ContributionPlan[];
  contributions: Contribution[];
  onMarkAsPaid: (planId: string, position: number) => void;
  onApprovePayment: (contributionId: string) => void;
  onCreatePlan: (plan: Partial<ContributionPlan>) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  plans, 
  contributions,
  onMarkAsPaid,
  onApprovePayment,
  onCreatePlan
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [newPlan, setNewPlan] = React.useState({
    name: '',
    amount: 10000,
    frequency: 'MONTHLY' as PayoutFrequency,
    duration: 10,
    maxMembers: 10,
    adminFeePercent: 2,
    description: ''
  });

  const pendingContributions = contributions.filter(c => c.status === 'PENDING');
  const activePlans = plans.filter(p => p.status === 'ACTIVE');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreatePlan(newPlan);
    setIsCreateModalOpen(false);
    setNewPlan({
      name: '',
      amount: 10000,
      frequency: 'MONTHLY',
      duration: 10,
      maxMembers: 10,
      adminFeePercent: 2,
      description: ''
    });
  };

  const totalPooled = plans.reduce((acc, p) => acc + p.totalPooled, 0);
  const totalMembers = new Set(plans.flatMap(p => p.slots.map(s => s.memberId).filter(Boolean))).size;
  const totalPayouts = plans.reduce((acc, p) => {
    const paidSlots = p.slots.filter(s => s.status === 'PAID').length;
    return acc + (paidSlots * p.amount);
  }, 0);

  return (
    <div className="space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Control Center</h1>
          <p className="text-slate-400">Manage plans, approve payments, and control payout sequences.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all text-slate-300">
            <FileDown size={18} />
            Export Data
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-primary text-background px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:glow-primary transition-all"
          >
            <Plus size={18} />
            Create New Plan
          </button>
        </div>
      </div>

      {/* Create Plan Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl glass p-8 rounded-[2.5rem] border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Create Contribution Plan</h2>
                <button onClick={() => setIsCreateModalOpen(false)} className="p-2 text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Plan Name</label>
                  <input 
                    type="text" 
                    required
                    value={newPlan.name}
                    onChange={e => setNewPlan({...newPlan, name: e.target.value})}
                    placeholder="e.g. Lagos Techies Thrift"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Contribution Amount (₦)</label>
                  <input 
                    type="number" 
                    required
                    value={newPlan.amount}
                    onChange={e => setNewPlan({...newPlan, amount: Number(e.target.value)})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Frequency</label>
                  <select 
                    value={newPlan.frequency}
                    onChange={e => setNewPlan({...newPlan, frequency: e.target.value as PayoutFrequency})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary outline-none transition-all appearance-none"
                  >
                    <option value="WEEKLY">Weekly</option>
                    <option value="MONTHLY">Monthly</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Duration (Cycles)</label>
                  <input 
                    type="number" 
                    required
                    value={newPlan.duration}
                    onChange={e => setNewPlan({...newPlan, duration: Number(e.target.value)})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Admin Fee (%)</label>
                  <input 
                    type="number" 
                    required
                    value={newPlan.adminFeePercent}
                    onChange={e => setNewPlan({...newPlan, adminFeePercent: Number(e.target.value)})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary outline-none transition-all"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Description</label>
                  <textarea 
                    value={newPlan.description}
                    onChange={e => setNewPlan({...newPlan, description: e.target.value})}
                    placeholder="Describe the purpose of this group..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary outline-none transition-all h-24 resize-none"
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-primary text-background py-4 rounded-2xl font-bold text-lg hover:glow-primary transition-all flex items-center justify-center gap-2 group"
                  >
                    Launch Plan
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Pooled', value: `₦${(totalPooled / 1000000).toFixed(1)}M`, icon: Wallet, color: 'text-primary' },
          { label: 'Active Members', value: totalMembers.toString(), icon: Users, color: 'text-accent' },
          { label: 'Pending Approvals', value: pendingContributions.length.toString(), icon: Clock, color: 'text-warning' },
          { label: 'Total Payouts', value: `₦${(totalPayouts / 1000).toFixed(0)}K`, icon: CheckCircle2, color: 'text-success' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <stat.icon className={stat.color} size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{stat.label}</p>
                <h3 className="text-xl font-bold text-white">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        {/* Payout Queue Management */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" />
              Active Payout Sequences
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search plans..." 
                className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-primary outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {activePlans.map((plan) => {
              const currentSlot = plan.slots.find(s => s.status === 'CURRENT');
              const progress = (plan.currentPosition / plan.duration) * 100;
              const planPendingContributions = pendingContributions.filter(c => c.planId === plan.id);

              return (
                <div key={plan.id} className="glass p-8 rounded-[2.5rem] border-white/5 space-y-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center font-black text-2xl text-primary">
                        {plan.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-1">{plan.name}</h4>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">₦{plan.amount.toLocaleString()}</span>
                          <div className="w-1 h-1 rounded-full bg-slate-700" />
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{plan.frequency}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-8 lg:gap-12">
                      <div className="text-center">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Current Position</p>
                        <span className="text-2xl font-black text-primary">#{plan.currentPosition}</span>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Recipient</p>
                        <span className="text-sm font-bold text-white">{currentSlot?.memberName || 'Unassigned'}</span>
                      </div>
                      <button 
                        onClick={() => onMarkAsPaid(plan.id, plan.currentPosition)}
                        className="bg-success text-background px-6 py-3 rounded-2xl text-sm font-bold hover:glow-primary transition-all"
                      >
                        Release Payout
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      <span>Payout Progress</span>
                      <span>{plan.currentPosition} / {plan.duration} Cycles</span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex p-0.5 border border-white/5">
                      {plan.slots.map((s, i) => (
                        <div 
                          key={i}
                          className={`h-full border-r border-background/20 first:rounded-l-full last:rounded-r-full ${
                            s.status === 'PAID' ? 'bg-success' : s.status === 'CURRENT' ? 'bg-primary animate-pulse' : 'bg-slate-800'
                          }`}
                          style={{ width: `${100 / plan.duration}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Plan-Specific Approvals */}
                  {planPendingContributions.length > 0 && (
                    <div className="pt-8 border-t border-white/5">
                      <h5 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-accent" />
                        Pending Approvals for this Plan ({planPendingContributions.length})
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {planPendingContributions.map((c) => (
                          <div key={c.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.memberName}`} 
                                  className="w-8 h-8 rounded-full bg-white/10" 
                                  alt=""
                                />
                                <div>
                                  <p className="text-sm font-bold text-white">{c.memberName}</p>
                                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">₦{c.amount.toLocaleString()}</p>
                                </div>
                              </div>
                              <span className="text-[10px] bg-warning/20 text-warning px-2 py-1 rounded-md font-bold">PENDING</span>
                            </div>

                            {c.proofUrl && (
                              <div className="relative group rounded-xl overflow-hidden aspect-video bg-black">
                                <img src={c.proofUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Proof" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button className="bg-white text-background p-2 rounded-full shadow-xl">
                                    <ArrowUpRight size={20} />
                                  </button>
                                </div>
                              </div>
                            )}

                            <div className="flex gap-2">
                              <button 
                                onClick={() => onApprovePayment(c.id)}
                                className="flex-1 bg-success text-background py-2 rounded-xl text-xs font-bold hover:glow-primary transition-all"
                              >
                                Approve
                              </button>
                              <button className="flex-1 bg-danger/10 text-danger py-2 rounded-xl text-xs font-bold hover:bg-danger/20 transition-all">
                                Reject
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
