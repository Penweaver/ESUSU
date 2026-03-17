/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { Auth } from './components/Auth';
import { MemberDashboard } from './components/MemberDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { PlanDetail } from './components/PlanDetail';
import { Chat } from './components/Chat';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  getDoc,
  getDocFromServer
} from 'firebase/firestore';
import { User, ContributionPlan, Contribution, ChatMessage, UserRole } from './types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export default function App() {
  const [view, setView] = React.useState<'LANDING' | 'AUTH' | 'DASHBOARD'>('LANDING');
  const [user, setUser] = React.useState<User | null>(null);
  const [activeTab, setActiveTab] = React.useState('overview');
  const [plans, setPlans] = React.useState<ContributionPlan[]>([]);
  const [contributions, setContributions] = React.useState<Contribution[]>([]);
  const [selectedPlanId, setSelectedPlanId] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [notification, setNotification] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isAuthReady, setIsAuthReady] = React.useState(false);

  // Test Firestore Connection
  React.useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. The client is offline.");
        }
      }
    }
    testConnection();
  }, []);

  React.useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Try to get user from Firestore first
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        let userData: User;

        if (userDoc.exists()) {
          userData = userDoc.data() as User;
        } else {
          // Create user in Firestore if they don't exist
          const role: UserRole = firebaseUser.email?.toLowerCase().includes('admin') ? 'ADMIN' : 'MEMBER';
          userData = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            email: firebaseUser.email || '',
            role: role,
            subscriptionType: 'SAAS',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.uid}`,
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), userData);
        }

        setUser(userData);
        setView('DASHBOARD');
      } else {
        setUser(null);
        if (view === 'DASHBOARD') setView('LANDING');
      }
      setIsAuthReady(true);
    });

    return () => unsubscribeAuth();
  }, [view]);

  // Sync Plans and Contributions
  React.useEffect(() => {
    if (!user) return;

    const unsubscribePlans = onSnapshot(collection(db, 'plans'), (snapshot) => {
      const plansData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as ContributionPlan));
      setPlans(plansData);
    });

    const unsubscribeContributions = onSnapshot(collection(db, 'contributions'), (snapshot) => {
      const contributionsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Contribution));
      setContributions(contributionsData);
    });

    return () => {
      unsubscribePlans();
      unsubscribeContributions();
    };
  }, [user]);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
    const errInfo: FirestoreErrorInfo = {
      error: error instanceof Error ? error.message : String(error),
      authInfo: {
        userId: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        emailVerified: auth.currentUser?.emailVerified,
        isAnonymous: auth.currentUser?.isAnonymous,
        tenantId: auth.currentUser?.tenantId,
        providerInfo: auth.currentUser?.providerData.map(provider => ({
          providerId: provider.providerId,
          displayName: provider.displayName,
          email: provider.email,
          photoUrl: provider.photoURL
        })) || []
      },
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    showNotification('Database error occurred', 'error');
    throw new Error(JSON.stringify(errInfo));
  };

  const handleLogin = () => {
    // Auth state is handled by onAuthStateChanged
    setView('DASHBOARD');
    setActiveTab('overview');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setView('LANDING');
      setSelectedPlanId(null);
    } catch (error) {
      showNotification('Error signing out', 'error');
    }
  };

  const handleJoinPlan = async (planId: string, position: number) => {
    if (!user) return;
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    const newSlots = plan.slots.map(slot => {
      if (slot.position === position) {
        return { ...slot, memberId: user.id, memberName: user.name };
      }
      return slot;
    });

    try {
      await updateDoc(doc(db, 'plans', planId), { slots: newSlots });
      showNotification(`Successfully joined ${plan.name} at position #${position}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `plans/${planId}`);
    }
  };

  const handleMarkAsPaid = async (planId: string, position: number) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    const newSlots = plan.slots.map(slot => {
      if (slot.position === position) return { ...slot, status: 'PAID' as const };
      if (slot.position === position + 1) return { ...slot, status: 'CURRENT' as const };
      return slot;
    });

    try {
      await updateDoc(doc(db, 'plans', planId), { 
        slots: newSlots, 
        currentPosition: Math.min(plan.currentPosition + 1, plan.duration) 
      });
      showNotification('Payout released successfully');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `plans/${planId}`);
    }
  };

  const handleApprovePayment = async (contributionId: string) => {
    const contribution = contributions.find(c => c.id === contributionId);
    if (!contribution) return;

    try {
      await updateDoc(doc(db, 'contributions', contributionId), { status: 'APPROVED' as const });
      showNotification('Payment approved');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `contributions/${contributionId}`);
    }
  };

  const handleCreatePlan = async (newPlanData: Partial<ContributionPlan>) => {
    const id = `plan-${Date.now()}`;
    const newPlan: ContributionPlan = {
      id,
      name: newPlanData.name || 'New Plan',
      description: newPlanData.description || '',
      amount: newPlanData.amount || 10000,
      frequency: newPlanData.frequency || 'MONTHLY',
      duration: newPlanData.duration || 10,
      maxMembers: newPlanData.maxMembers || 10,
      adminFeePercent: newPlanData.adminFeePercent || 2,
      totalPooled: (newPlanData.amount || 10000) * (newPlanData.maxMembers || 10),
      status: 'ACTIVE',
      currentPosition: 1,
      createdAt: new Date().toISOString(),
      slots: Array.from({ length: newPlanData.maxMembers || 10 }, (_, i) => ({
        position: i + 1,
        memberId: null,
        memberName: null,
        status: i === 0 ? 'CURRENT' : 'PENDING',
        estimatedDate: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toISOString(),
      })),
    };

    try {
      await setDoc(doc(db, 'plans', id), newPlan);
      showNotification('New contribution plan launched!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `plans/${id}`);
    }
  };

  const handleMakeContribution = async (contributionData: Partial<Contribution>) => {
    if (!user) return;
    const id = `contrib-${Date.now()}`;
    const newContribution: Contribution = {
      id,
      planId: contributionData.planId!,
      memberId: user.id,
      memberName: user.name,
      amount: contributionData.amount!,
      cycle: contributionData.cycle || 1,
      status: 'PENDING',
      paymentMethod: contributionData.paymentMethod || 'OFFLINE',
      timestamp: new Date().toISOString(),
      proofUrl: contributionData.proofUrl || ''
    };

    try {
      await setDoc(doc(db, 'contributions', id), newContribution);
      showNotification('Contribution submitted for approval');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `contributions/${id}`);
    }
  };

  const handleSendMessage = (text: string) => {
    if (!user) return;
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: user.id,
      receiverId: user.role === 'ADMIN' ? 'member-id' : 'admin-id',
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (view === 'LANDING') {
    return <LandingPage onStart={() => setView('AUTH')} onLogin={() => setView('AUTH')} />;
  }

  if (view === 'AUTH') {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    if (selectedPlanId) {
      const plan = plans.find(p => p.id === selectedPlanId);
      if (!plan) return null;
      return (
        <PlanDetail 
          plan={plan} 
          user={user!} 
          onBack={() => setSelectedPlanId(null)}
          onJoin={(pos) => handleJoinPlan(plan.id, pos)}
          onMakeContribution={handleMakeContribution}
        />
      );
    }

    switch (activeTab) {
      case 'overview':
        return user?.role === 'ADMIN' ? (
          <AdminDashboard 
            plans={plans} 
            contributions={contributions} 
            onMarkAsPaid={handleMarkAsPaid}
            onApprovePayment={handleApprovePayment}
            onCreatePlan={handleCreatePlan}
          />
        ) : (
          <MemberDashboard 
            user={user!} 
            plans={plans} 
            contributions={contributions}
            onViewPlan={setSelectedPlanId}
            onExplore={() => setActiveTab('explore')}
          />
        );
      case 'explore':
      case 'plans':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map(plan => (
              <div 
                key={plan.id} 
                onClick={() => setSelectedPlanId(plan.id)}
                className="glass p-8 rounded-[2.5rem] cursor-pointer hover:border-primary/30 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl font-black text-primary">
                    {plan.name.charAt(0)}
                  </div>
                  <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {plan.frequency}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2">{plan.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Amount</p>
                    <p className="text-lg font-bold text-white">₦{plan.amount.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Slots</p>
                    <p className="text-lg font-bold text-white">{plan.slots.filter(s => s.memberId).length}/{plan.maxMembers}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'chat':
        return <Chat currentUser={user!} messages={messages} onSendMessage={handleSendMessage} />;
      default:
        return <div className="text-center py-20 text-slate-500">Feature coming soon...</div>;
    }
  };

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      activeTab={activeTab} 
      setActiveTab={(tab) => {
        setActiveTab(tab);
        setSelectedPlanId(null);
      }}
    >
      {renderContent()}
      
      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-8 right-8 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${
            notification.type === 'success' 
              ? 'bg-success/10 border-success/20 text-success' 
              : 'bg-danger/10 border-danger/20 text-danger'
          } backdrop-blur-xl`}>
            <div className={`w-2 h-2 rounded-full ${notification.type === 'success' ? 'bg-success' : 'bg-danger'} animate-pulse`} />
            <p className="font-bold text-sm">{notification.message}</p>
          </div>
        </div>
      )}
    </Layout>
  );
}
