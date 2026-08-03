import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, Lock, KeyRound } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      setError('');
      onLogin();
    } else {
      setError('Incorrect password. Access denied.');
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      {/* Kenya flag stripe at top */}
      <div className="fixed top-0 left-0 right-0 flex h-1.5">
        <div className="flex-1 bg-[#006600]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#BB0000]" />
      </div>

      <div className={`w-full max-w-md transition-all ${shaking ? 'animate-shake' : ''}`}>
        {/* Card */}
        <div className="bg-[#09090b] border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header stripe */}
          <div className="h-1 bg-gradient-to-r from-[#006600] via-white to-[#BB0000]" />

          <div className="p-8 space-y-7">
            {/* Logo / Branding */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-xl bg-[#006600]/20 border border-[#006600]/40 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8 text-[#4ade80]" />
              </div>
              <div>
                <h1 className="font-cinzel text-2xl font-bold text-white tracking-wider">
                  FESTIVAL<span className="text-white/40 font-light">OS</span>
                </h1>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mt-1">
                  Super Admin Command Desk
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                <KeyRound className="w-3 h-3 text-[#4ade80]" />
                <span>Secured Access</span>
              </div>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-white/50">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 absolute left-3.5 top-3.5 text-white/30" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter access code"
                    autoFocus
                    className={`w-full pl-10 pr-10 py-3 rounded-lg bg-[#050505] border font-mono text-sm text-white placeholder-white/20 focus:outline-none transition-all ${
                      error
                        ? 'border-[#BB0000]/60 focus:border-[#BB0000]'
                        : 'border-white/15 focus:border-[#4ade80]/60'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-white/30 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {error && (
                  <p className="text-[11px] font-mono text-[#f87171] flex items-center gap-1.5 pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BB0000] inline-block" />
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#006600] hover:bg-[#15803d] text-white font-mono font-bold text-sm uppercase tracking-[0.15em] transition-all shadow-lg shadow-green-900/30 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Authenticate & Enter
              </button>
            </form>

            <p className="text-center text-[10px] font-mono text-white/20 leading-relaxed">
              Kenya National Music Festival · FestivalOS v2.6<br />
              Unauthorized access is strictly prohibited.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
};
