import React from 'react';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle2, 
  Globe, 
  Smartphone,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogin }) => {
  return (
    <div className="bg-background text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="text-background w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tighter">ESUSU</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
            <a href="#security" className="hover:text-primary transition-colors">Security</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onLogin} className="text-sm font-semibold hover:text-primary transition-colors">Login</button>
            <button 
              onClick={onStart}
              className="bg-primary text-background px-5 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-transform"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              The Future of Ajo is Here
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              Structured Contributions.<br />
              <span className="text-primary">Guaranteed Payout Order.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Digitize your traditional esusu and thrift systems. Choose your payout position, track contributions in real-time, and save with total transparency.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto bg-primary text-background px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 hover:glow-primary transition-all group"
              >
                Start Saving Now
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-bold border border-white/10 hover:bg-white/5 transition-all">
                View Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose ESUSU?</h2>
            <p className="text-slate-400">The most trusted digital rotational savings platform in Africa.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Choose Your Position",
                desc: "Select exactly when you want to receive your payout. Total control over your financial planning.",
                icon: Zap,
                color: "text-accent"
              },
              {
                title: "Transparent Cycles",
                desc: "Real-time tracking of every contribution and payout. No hidden fees, no surprises.",
                icon: Globe,
                color: "text-primary"
              },
              {
                title: "Secure & Verified",
                desc: "Admin-controlled fund release with multi-layer verification for every transaction.",
                icon: Shield,
                color: "text-success"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`${feature.color} w-7 h-7`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8 leading-tight">Simple Steps to <br /><span className="text-accent">Financial Freedom</span></h2>
              <div className="space-y-8">
                {[
                  { step: "01", title: "Join a Plan", desc: "Browse available contribution plans that fit your budget and goals." },
                  { step: "02", title: "Pick Your Slot", desc: "Choose your preferred payout position from the available slots." },
                  { step: "03", title: "Contribute Regularly", desc: "Make your periodic contributions via online or offline channels." },
                  { step: "04", title: "Get Paid", desc: "Receive your pooled funds automatically when your turn arrives." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-primary font-black text-2xl opacity-50">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full" />
              <div className="relative glass rounded-[2rem] p-8 border-white/10">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="font-bold">Payout Queue</h4>
                  <span className="text-xs bg-success/20 text-success px-3 py-1 rounded-full font-bold uppercase">Active Cycle</span>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((pos) => (
                    <div key={pos} className={`flex items-center justify-between p-4 rounded-2xl border ${pos === 2 ? 'bg-primary/10 border-primary' : 'bg-white/5 border-white/5'}`}>
                      <div className="flex items-center gap-4">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${pos === 2 ? 'bg-primary text-background' : 'bg-white/10'}`}>
                          #{pos}
                        </span>
                        <div>
                          <p className="text-sm font-bold">Member {pos}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Position Slot</p>
                        </div>
                      </div>
                      {pos < 2 ? (
                        <CheckCircle2 className="text-success w-5 h-5" />
                      ) : pos === 2 ? (
                        <span className="text-[10px] font-bold text-primary animate-pulse">CURRENT</span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-600">PENDING</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Shield className="text-primary w-6 h-6" />
            <span className="text-xl font-bold tracking-tighter">ESUSU</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 ESUSU Platform. Modernizing Africa's thrift systems.</p>
          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
