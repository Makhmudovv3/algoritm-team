import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Phone, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('+998');
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    let val = e.target.value;
    
    // Barcha raqam bo'lmagan belgilarni tozalaymiz
    let digits = val.replace(/\D/g, '');
    
    // Majburiy 998 prefiksini tekshiramiz
    if (digits.startsWith('998')) {
      digits = digits.substring(3);
    } else if (digits.length < 3) {
      digits = '';
    }
    
    // Faqat 9 ta raqam (998 dan keyin) ruxsat etiladi
    digits = digits.substring(0, 9);
    
    // Formatlash: +998 (XX) XXX XX XX
    let formatted = '+998';
    if (digits.length > 0) {
      formatted += ' (' + digits.substring(0, 2);
    }
    if (digits.length >= 3) {
      formatted += ') ' + digits.substring(2, 5);
    }
    if (digits.length >= 6) {
      formatted += ' ' + digits.substring(5, 7);
    }
    if (digits.length >= 8) {
      formatted += ' ' + digits.substring(7, 9);
    }

    setPhone(formatted);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 dark:bg-slate-950 selection:bg-blue-100 selection:text-blue-900 overflow-hidden relative">
      
      {/* Background Decorative Blur Orbs for the whole page */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[50%] h-[50%] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-[30%] left-[30%] w-[30%] h-[30%] rounded-full bg-yellow-400/10 dark:bg-yellow-500/5 blur-[100px]" />
      </div>

      {/* Left Side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex flex-col items-center w-full max-w-lg"
        >
          {/* Custom SVG Logo */}
          <div className="bg-white/80 dark:bg-slate-900/50 p-8 rounded-3xl backdrop-blur-md border border-slate-200/60 dark:border-white/5 mb-10 w-full flex flex-col items-center justify-center shadow-lg shadow-slate-200/50 dark:shadow-none transition-colors">
             <div className="flex items-center gap-4">
               {/* Algoritm Triangle Logo SVG */}
               <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
                 <path d="M24 4L44 38H4L24 4Z" fill="#FACC15" />
                 <path fillRule="evenodd" clipRule="evenodd" d="M24 16L32 30H16L24 16ZM21 38H27L24 33L21 38Z" fill="currentColor" className="text-slate-900 dark:text-white" />
               </svg>
               <span className="text-3xl font-bold tracking-widest text-slate-900 dark:text-white uppercase">
                 Algoritm
               </span>
             </div>
          </div>
          
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight text-center leading-tight">
            Algoritm CRM <br/> 
            <span className="text-blue-600 dark:text-blue-500">Boshqaruv Tizimi</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-5 text-center text-[15px] leading-relaxed max-w-md">
            O'quv markazining barcha jarayonlarini yagona markazlashgan tizimda oson va samarali boshqaring.
          </p>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        
        {/* Mobile Logo (Visible only on small screens) */}
        <div className="absolute top-8 left-0 w-full flex justify-center lg:hidden text-slate-900 dark:text-white">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md mr-2">
            <path d="M24 4L44 38H4L24 4Z" fill="#FACC15" />
            <path fillRule="evenodd" clipRule="evenodd" d="M24 16L32 30H16L24 16ZM21 38H27L24 33L21 38Z" fill="currentColor" className="text-slate-900 dark:text-white" />
          </svg>
          <span className="text-xl font-bold tracking-widest uppercase">Algoritm</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-[420px]"
        >
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              Tizimga kirish
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-[15px]">
              Davom etish uchun telefon raqam va parolingizni kiriting.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 ml-1">
                Telefon raqam
              </label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="tel" 
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+998 (90) 123 45 67"
                  minLength={19}
                  maxLength={19}
                  className="w-full h-12 pl-11 pr-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/20 dark:focus:border-blue-500 transition-all font-medium tracking-wide"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Parol
                </label>
                <a href="#" className="text-[13px] font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                  Parolni unutdingizmi?
                </a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full h-12 pl-11 pr-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/20 dark:focus:border-blue-500 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[15px] font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 disabled:opacity-70 disabled:pointer-events-none relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Kirish <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" /></>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </form>

        </motion.div>
      </div>
    </div>
  );
}
