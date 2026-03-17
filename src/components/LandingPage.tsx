import React from 'react';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle2, 
  Globe, 
  Smartphone,
  ChevronRight,
  Lock,
  Eye,
  CreditCard,
  Upload,
  MessageSquare,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogin }) => {
  return (
    <div className="bg-background text-text-primary overflow-x-hidden selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Shield className="text-background w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter">ADASHE</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-text-secondary">
            <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onLogin} className="text-sm font-bold hover:text-primary transition-colors px-4 py-2">Login</button>
            <button 
              onClick={onStart}
              className="bg-primary text-background px-6 py-2.5 rounded-xl text-sm font-black hover:glow-primary hover:scale-105 transition-all active:scale-95"
            >
              Start Contributing
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/5 blur-[140px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-widest uppercase mb-8">
              <Zap size={14} />
              The Future of Ajo is Here
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]">
              Digital Adashe.<br />
              <span className="text-primary">Choose When You Get Paid.</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-xl mb-12 leading-relaxed font-medium">
              A modern rotational savings platform where members contribute together and receive payouts in a transparent, structured order.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto bg-primary text-background px-10 py-5 rounded-2xl text-lg font-black flex items-center justify-center gap-3 hover:glow-primary hover:-translate-y-1 transition-all group"
              >
                Start Contributing
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button 
                onClick={onLogin}
                className="w-full sm:w-auto px-10 py-5 rounded-2xl text-lg font-black border border-border hover:bg-white/5 transition-all"
              >
                Login to Portal
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
            <div className="relative glass rounded-[2.5rem] p-6 border-white/10 overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Smartphone className="text-primary w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm">Dashboard Preview</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-danger/50" />
                  <div className="w-2 h-2 rounded-full bg-warning/50" />
                  <div className="w-2 h-2 rounded-full bg-success/50" />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1">Total Pool</p>
                    <p className="text-2xl font-black text-accent">₦500,000</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1">Your Position</p>
                    <p className="text-2xl font-black text-primary">#08</p>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold">Cycle Progress</span>
                    <span className="text-xs font-bold text-primary">40%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[40%] bg-primary shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  </div>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">#{i}</div>
                        <div className="w-24 h-2 bg-white/10 rounded-full" />
                      </div>
                      <CheckCircle2 className="text-success w-4 h-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-y border-border bg-card/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Eye, label: "Transparent Cycles", sub: "Real-time tracking of all funds" },
              { icon: Shield, label: "Admin-Controlled", sub: "Secure fund release protocols" },
              { icon: Lock, label: "Secure Tracking", sub: "End-to-end contribution ledger" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary">{item.label}</h4>
                  <p className="text-xs text-text-secondary">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">How ADASHE Works</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Modernizing Africa's thrift systems with a simple, digital-first approach.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent -z-10" />
            {[
              { step: "01", title: "Join a Plan", desc: "Browse and select a contribution plan that fits your budget.", icon: Plus },
              { step: "02", title: "Choose Position", desc: "Select your payout slot from available positions in the cycle.", icon: Users },
              { step: "03", title: "Contribute", desc: "Make regular contributions via online or offline channels.", icon: CreditCard },
              { step: "04", title: "Receive Funds", desc: "Get your pooled payout automatically when your turn arrives.", icon: Zap }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 rounded-[2rem] bg-card border border-border hover:border-primary/30 transition-all group"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-background font-black text-xl shadow-lg shadow-primary/20">
                  {item.step}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="text-primary w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div>
              <h2 className="text-5xl font-black tracking-tighter mb-8 leading-tight">
                Powerful Features for <br />
                <span className="text-primary text-glow-primary">Modern Savings</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Position Control", desc: "Choose exactly when you get paid.", icon: Zap },
                  { title: "Live Tracking", desc: "Real-time contribution visibility.", icon: Eye },
                  { title: "Admin Security", desc: "Verified fund release protocols.", icon: Shield },
                  { title: "Flexible Pay", desc: "Online & offline payment options.", icon: CreditCard },
                  { title: "Direct Chat", desc: "Secure messaging with admins.", icon: MessageSquare },
                  { title: "Mobile Ready", desc: "Save and track from anywhere.", icon: Smartphone }
                ].map((feature, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-card border border-border hover:bg-white/5 transition-all">
                    <feature.icon className="text-primary w-6 h-6 mb-3" />
                    <h4 className="font-bold mb-1">{feature.title}</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full" />
              <div className="relative glass rounded-[3rem] p-10 border-white/10 aspect-square flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 w-full">
                  {[...Array(9)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: i * 0.2 
                      }}
                      className="aspect-square rounded-2xl bg-primary/20 border border-primary/30"
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-primary rounded-full blur-3xl opacity-50" />
                  <Shield className="text-primary w-20 h-20 relative z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Feature Highlight - Position System */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[160px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-black tracking-tighter mb-8">Choose Your Position — <br /><span className="text-accent">Control Your Cashflow</span></h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-16">
            The selected number determines when you receive the pooled contributions. Need money early for a project? Pick an early slot. Want to save for the end of the year? Pick a later one.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <motion.button
                key={num}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-xl font-black border transition-all ${
                  num === 8 
                    ? 'bg-accent text-background border-accent shadow-lg shadow-accent/30 scale-110 z-10' 
                    : num < 4 
                      ? 'bg-success/20 border-success/30 text-success opacity-50 cursor-not-allowed'
                      : 'bg-card border-border text-text-secondary hover:border-primary hover:text-primary'
                }`}
              >
                {num}
              </motion.button>
            ))}
          </div>

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-accent/10 border border-accent/20 text-accent font-bold">
            <CheckCircle2 size={20} />
            Position #8 Selected for your cashflow needs
          </div>
        </div>
      </section>

      {/* Sample Plan Display */}
      <section className="py-32 px-6 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-[3rem] p-8 md:p-12 border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl -z-10" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
              <div>
                <h3 className="text-3xl font-black mb-2">Premium Savings Plan</h3>
                <p className="text-text-secondary font-medium">Monthly Rotational Cycle</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-accent">₦50,000</p>
                <p className="text-xs text-text-secondary uppercase font-bold tracking-widest">Per Member / Month</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <Users className="text-primary w-5 h-5 mb-2" />
                <p className="text-[10px] text-text-secondary uppercase font-bold mb-1">Members</p>
                <p className="text-xl font-black">10</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <Zap className="text-accent w-5 h-5 mb-2" />
                <p className="text-[10px] text-text-secondary uppercase font-bold mb-1">Total Payout</p>
                <p className="text-xl font-black">₦500,000</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <Globe className="text-success w-5 h-5 mb-2" />
                <p className="text-[10px] text-text-secondary uppercase font-bold mb-1">Frequency</p>
                <p className="text-xl font-black">Monthly</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <Shield className="text-primary w-5 h-5 mb-2" />
                <p className="text-[10px] text-text-secondary uppercase font-bold mb-1">Status</p>
                <p className="text-xl font-black text-success">Active</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-bold">
                <span>Cycle Progress</span>
                <span className="text-text-secondary">4 / 10 Completed</span>
              </div>
              <div className="h-4 w-full bg-white/5 rounded-full flex overflow-hidden p-1 border border-white/5">
                <div className="h-full w-[30%] bg-success rounded-full mr-1" />
                <div className="h-full w-[10%] bg-primary rounded-full mr-1 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                <div className="h-full flex-1 bg-white/10 rounded-full" />
              </div>
              <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-success" /> Paid</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Current</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white/20" /> Pending</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">Flexible Payment Options</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">We support multiple ways to keep your contributions on track.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-10 rounded-[3rem] bg-card border border-border hover:border-primary/30 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <CreditCard className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black mb-4">Online Payment</h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                Seamlessly contribute using secure payment gateways like Paystack or Flutterwave. Instant verification and real-time ledger updates.
              </p>
              <div className="flex gap-4 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black tracking-widest uppercase">Paystack</div>
                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black tracking-widest uppercase">Flutterwave</div>
              </div>
            </div>

            <div className="p-10 rounded-[3rem] bg-card border border-border hover:border-accent/30 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Upload className="text-accent w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black mb-4">Offline Payment</h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                Pay externally via bank transfer or cash and upload your proof of payment (PDF, JPG, PNG). Our admins will verify and update your status.
              </p>
              <div className="flex gap-3">
                {['PDF', 'JPG', 'PNG'].map(ext => (
                  <div key={ext} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-text-secondary">
                    {ext}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">Simple, Transparent Pricing</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Choose the plan that best fits your savings group needs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Free Plan",
                price: "₦0",
                desc: "Basic contribution participation for individuals.",
                features: ["Join public plans", "Basic tracking", "Secure chat", "Email notifications"],
                cta: "Get Started",
                highlight: false
              },
              {
                name: "Subscription Plan",
                price: "₦2,500",
                period: "/mo",
                desc: "Enhanced features for serious savers and groups.",
                features: ["Manual payment verification", "Priority support", "Detailed analytics", "Custom payout alerts"],
                cta: "Start Free Trial",
                highlight: true
              },
              {
                name: "One-Time License",
                price: "₦75,000",
                period: "/once",
                desc: "Full enterprise features for large organizations.",
                features: ["Payment gateway integration", "Custom branding", "Unlimited groups", "Advanced admin tools"],
                cta: "Contact Sales",
                highlight: false
              }
            ].map((plan, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-[3rem] border transition-all flex flex-col ${
                  plan.highlight 
                    ? 'bg-primary/5 border-primary shadow-2xl shadow-primary/10 scale-105 z-10' 
                    : 'bg-card border-border hover:border-white/20'
                }`}
              >
                <div className="mb-8">
                  <h4 className={`text-sm font-black uppercase tracking-widest mb-4 ${plan.highlight ? 'text-primary' : 'text-text-secondary'}`}>
                    {plan.name}
                  </h4>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                    {plan.period && <span className="text-text-secondary font-bold">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{plan.desc}</p>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm font-medium">
                      <CheckCircle2 size={18} className={plan.highlight ? 'text-primary' : 'text-success'} />
                      {f}
                    </div>
                  ))}
                </div>

                <button className={`w-full py-4 rounded-2xl font-black transition-all ${
                  plan.highlight 
                    ? 'bg-primary text-background hover:glow-primary' 
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative glass rounded-[4rem] p-12 md:p-24 border-white/10 overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20 -z-10" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
            
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
              Start Your Adashe <br />Contribution Cycle Today
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              Join thousands of Nigerians digitizing their traditional savings systems with ADASHE. Secure, transparent, and built for your cashflow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto bg-primary text-background px-12 py-5 rounded-2xl text-xl font-black hover:glow-primary hover:-translate-y-1 transition-all"
              >
                Create Free Account
              </button>
              <button className="w-full sm:w-auto px-12 py-5 rounded-2xl text-xl font-black border border-white/10 hover:bg-white/5 transition-all">
                Join a Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">Frequently Asked Questions</h2>
            <p className="text-text-secondary">Everything you need to know about the ADASHE platform.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "What is Adashe?", a: "Adashe is a traditional rotational savings system common in Nigeria and Africa. Our platform digitizes this process, providing transparency, security, and structure to your contributions." },
              { q: "How are payouts distributed?", a: "Payouts are distributed based on the pre-selected positions of members. When a cycle reaches your position, the pooled funds are released to you automatically or via admin approval." },
              { q: "Can I choose my payout position?", a: "Yes! One of the unique features of ADASHE is the ability to select your payout slot when joining a plan, allowing you to plan your finances around your specific needs." },
              { q: "What happens if someone defaults on payment?", a: "Our platform includes multi-layer verification and admin-controlled releases. Admins can manage defaults, and we provide tools for group accountability and secure tracking." },
              { q: "How does the admin verify payments?", a: "For online payments, verification is instant via gateways. For offline payments, members upload proof of payment which admins review and approve in the management portal." }
            ].map((faq, i) => (
              <div key={i} className="glass rounded-3xl border-white/5 overflow-hidden">
                <button className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors group">
                  <span className="font-bold text-lg pr-8">{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Plus className="text-primary w-4 h-4" />
                  </div>
                </button>
                <div className="px-6 pb-6 text-text-secondary text-sm leading-relaxed">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-border bg-card/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="text-background w-5 h-5" />
                </div>
                <span className="text-xl font-black tracking-tighter">ADASHE</span>
              </div>
              <p className="text-text-secondary max-w-sm mb-8 leading-relaxed">
                Modern rotational contributory savings platform for Africa. Digitize your ajo, adashe, and thrift systems with guaranteed payout orders.
              </p>
              <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Product of DARE ADU</p>
            </div>
            <div>
              <h5 className="font-bold mb-6">Platform</h5>
              <ul className="space-y-4 text-sm text-text-secondary">
                <li><a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a></li>
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6">Legal</h5>
              <ul className="space-y-4 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-text-secondary font-medium">© 2026 ADASHE Platform. All rights reserved.</p>
            <div className="flex gap-6 text-text-secondary">
              <a href="#" className="hover:text-primary transition-colors"><Globe size={18} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Smartphone size={18} /></a>
              <a href="#" className="hover:text-primary transition-colors"><MessageSquare size={18} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
