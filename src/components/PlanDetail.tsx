import React from 'react';
import { 
  ArrowLeft, 
  Users, 
  Wallet, 
  Calendar, 
  Shield, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Upload,
  Info,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { ContributionPlan, User, Contribution } from '../types';

interface PlanDetailProps {
  plan: ContributionPlan;
  user: User;
  onBack: () => void;
  onJoin: (position: number) => void;
  onMakeContribution: (contribution: Partial<Contribution>) => void;
}

export const PlanDetail: React.FC<PlanDetailProps> = ({ plan, user, onBack, onJoin, onMakeContribution }) => {
  const mySlot = plan.slots.find(s => s.memberId === user.id);
  const isMember = !!mySlot;
  const [selectedSlot, setSelectedSlot] = React.useState<number | null>(null);

  const handleUploadProof = (file: File) => {
    // In a real app, we would upload to Storage and get a URL
    // For now, we'll simulate it
    onMakeContribution({
      planId: plan.id,
      amount: plan.amount,
      cycle: plan.currentPosition,
      paymentMethod: 'OFFLINE',
      proofUrl: 'https://picsum.photos/seed/proof/400/600'
    });
  };

  const progress = (plan.currentPosition / plan.duration) * 100;
  const nextPayout = plan.slots.find(s => s.status === 'CURRENT');

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">{plan.name}</h1>
          <p className="text-slate-400">Plan ID: {plan.id.toUpperCase()}</p>
        </div>
        <div className="ml-auto">
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
            plan.status === 'ACTIVE' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
          }`}>
            {plan.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Plan Info & Payout Queue */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info Card */}
          <div className="glass p-8 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Contribution</p>
                <p className="text-2xl font-black text-white">₦{plan.amount.toLocaleString()}</p>
                <p className="text-xs text-slate-400">{plan.frequency}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Duration</p>
                <p className="text-2xl font-black text-white">{plan.duration}</p>
                <p className="text-xs text-slate-400">Cycles</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Admin Fee</p>
                <p className="text-2xl font-black text-accent">{plan.adminFeePercent}%</p>
                <p className="text-xs text-slate-400">Per cycle</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Total Pool</p>
                <p className="text-2xl font-black text-primary">₦{plan.totalPooled.toLocaleString()}</p>
                <p className="text-xs text-slate-400">Gross Payout</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="font-bold text-white">Current Payout Progress</h4>
                  <p className="text-xs text-slate-400">Cycle {plan.currentPosition} of {plan.duration}</p>
                </div>
                <span className="text-primary font-black">{Math.round(progress)}%</span>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
                />
              </div>
            </div>
          </div>

          {/* Payout Queue (MANDATORY UI) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp size={20} className="text-primary" />
                Payout Sequencing Queue
              </h2>
              <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1.5 text-success"><div className="w-2 h-2 rounded-full bg-success" /> Paid</span>
                <span className="flex items-center gap-1.5 text-primary"><div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Current</span>
                <span className="flex items-center gap-1.5 text-slate-500"><div className="w-2 h-2 rounded-full bg-slate-700" /> Pending</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plan.slots.map((slot) => (
                <div 
                  key={slot.position}
                  className={`p-5 rounded-3xl border transition-all ${
                    slot.status === 'CURRENT' 
                      ? 'bg-primary/10 border-primary glow-primary' 
                      : slot.status === 'PAID'
                      ? 'bg-success/5 border-success/20 opacity-80'
                      : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black ${
                        slot.status === 'CURRENT' ? 'bg-primary text-background' : 'bg-white/5 text-slate-400'
                      }`}>
                        #{slot.position}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-white">
                          {slot.memberId === user.id ? 'YOU' : slot.memberName || 'Available Slot'}
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                          {new Date(slot.estimatedDate).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    {slot.status === 'PAID' ? (
                      <CheckCircle2 className="text-success" size={20} />
                    ) : slot.status === 'CURRENT' ? (
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-primary animate-pulse mb-1">PAYING OUT</span>
                        <div className="w-12 h-1 bg-primary/20 rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-2/3 animate-shimmer" />
                        </div>
                      </div>
                    ) : (
                      <Clock className="text-slate-700" size={20} />
                    )}
                  </div>
                  
                  {!slot.memberId && !isMember && (
                    <button 
                      onClick={() => setSelectedSlot(slot.position)}
                      className="w-full mt-2 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-background transition-all"
                    >
                      Select Position
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Details */}
        <div className="space-y-8">
          {/* User Status Card */}
          {isMember ? (
            <div className="glass p-8 rounded-[2.5rem] border-primary/30">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  <Shield className="text-primary" size={40} />
                </div>
                <h3 className="text-xl font-bold text-white">You're in the Plan!</h3>
                <p className="text-sm text-slate-400">Position #{mySlot.position}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-sm text-slate-400">Payout Date</span>
                  <span className="text-sm font-bold text-white">
                    {new Date(mySlot.estimatedDate).toLocaleDateString('en-NG', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-sm text-slate-400">Contribution</span>
                  <span className="text-sm font-bold text-white">₦{plan.amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                {user.subscriptionType === 'LICENSE' && (
                  <button className="w-full bg-primary text-background py-4 rounded-2xl font-bold hover:glow-primary transition-all flex items-center justify-center gap-2">
                    <Wallet size={18} />
                    Pay Online (Paystack)
                  </button>
                )}
                
                <div className="relative">
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={(e) => e.target.files?.[0] && handleUploadProof(e.target.files[0])}
                  />
                  <button className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-slate-300">
                    <Upload size={18} />
                    {user.subscriptionType === 'SAAS' ? 'Pay Offline & Upload Proof' : 'Upload Payment Proof'}
                  </button>
                </div>
                
                {user.subscriptionType === 'LICENSE' && (
                  <button 
                    onClick={() => onMakeContribution({
                      planId: plan.id,
                      amount: plan.amount,
                      cycle: plan.currentPosition,
                      paymentMethod: 'ONLINE'
                    })}
                    className="w-full bg-primary/10 border border-primary/20 text-primary py-4 rounded-2xl font-bold hover:bg-primary/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Shield size={18} />
                    Simulate Online Payment
                  </button>
                )}
                
                {user.subscriptionType === 'SAAS' && (
                  <p className="text-[10px] text-center text-slate-500 font-medium">
                    * SaaS accounts are limited to offline payments only.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="glass p-8 rounded-[2.5rem]">
              <h3 className="text-xl font-bold text-white mb-6">Join this Plan</h3>
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                  <p className="text-sm text-slate-400 mb-4">Select a payout position to continue. Earlier positions are paid first.</p>
                  <div className="grid grid-cols-4 gap-2">
                    {plan.slots.map(s => (
                      <button
                        key={s.position}
                        disabled={!!s.memberId}
                        onClick={() => setSelectedSlot(s.position)}
                        className={`h-10 rounded-xl text-xs font-bold transition-all ${
                          s.memberId 
                            ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                            : selectedSlot === s.position
                            ? 'bg-primary text-background'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {s.position}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  disabled={!selectedSlot}
                  onClick={() => selectedSlot && onJoin(selectedSlot)}
                  className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                    selectedSlot 
                      ? 'bg-primary text-background hover:glow-primary' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Confirm & Join Plan
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Plan Rules Card */}
          <div className="glass p-8 rounded-[2.5rem]">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <Info size={18} className="text-accent" />
              Plan Rules
            </h4>
            <ul className="space-y-3">
              {[
                "Contributions must be made by the 5th of every cycle.",
                "Admin fee is deducted from the final payout.",
                "Payouts are released within 24 hours of cycle completion.",
                "Proof of payment required for offline transfers."
              ].map((rule, i) => (
                <li key={i} className="flex gap-3 text-xs text-slate-400 leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrendingUp = ({ size, className }: { size: number, className?: string }) => (
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
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
