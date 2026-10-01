import React from 'react';
import { 
  Flame, ArrowRight, UserPlus, LogIn, Compass, 
  X, Sparkles, MapPin, Calendar, BookOpen, Radio 
} from 'lucide-react';
import { AppTheme } from '../data/appThemes';

interface WelcomeSanctuaryProps {
  onEnterSanctuary?: () => void;
  onRegister?: () => void;
  onSignIn?: () => void;
  onExploreGuest?: () => void;
  onClose?: () => void;
  isAuthenticated?: boolean;
  onOpenRoster?: () => void;
  onToggleRadio?: () => void;
  isRadioPlaying?: boolean;
  onOpenThemeModal?: () => void;
  activeTheme?: AppTheme;
  [key: string]: any;
}

export const WelcomeSanctuary: React.FC<WelcomeSanctuaryProps> = ({
  onEnterSanctuary,
  onRegister,
  onSignIn,
  onExploreGuest,
  onClose,
  isAuthenticated = false,
  activeTheme
}) => {
  const accentColor = activeTheme?.accentHex || '#F59E0B';
  const smallGroupLocation = typeof window !== 'undefined'
    ? localStorage.getItem('youngfire_small_group_location') || "The White's Residence"
    : "The White's Residence";

  const handleRegisterClick = () => {
    if (onRegister) onRegister();
    else if (onEnterSanctuary) onEnterSanctuary();
  };

  const handleSignInClick = () => {
    if (onSignIn) onSignIn();
    else if (onEnterSanctuary) onEnterSanctuary();
  };

  const handleExploreGuestClick = () => {
    if (onExploreGuest) onExploreGuest();
    else if (onEnterSanctuary) onEnterSanctuary();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#040711] text-white flex flex-col items-center select-none font-['Outfit']">
      
      {/* 1. San Antonio Street Map Backdrop */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 bg-cover bg-center mix-blend-luminosity scale-105"
        style={{ backgroundImage: `url('/san_antonio_dark_map.png')` }}
      />

      {/* 2. Pure Obsidian Vertical Radial Gradient Overlays */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-[#040711]/40 via-[#040711]/80 to-[#040711]" />

      {/* Main Sanctuary Card Container */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center">
        
        {/* Close Button (if modal overlay) */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-black/60 hover:bg-black/90 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer z-30"
            title="Close Welcome Sanctuary"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* 3. Top Hero Photo dissolving smoothly through vertical gradient scrim */}
        <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-black">
          <img
            src="/welcome_sanctuary_cover.jpg"
            alt="YoungFire Sanctuary Worship"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/image_4.png';
            }}
          />

          {/* Smooth vertical dissolving scrim into San Antonio street map */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#040711] via-[#040711]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#040711]" />

          {/* Top Pill Insignia inside Hero */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-500/80 animate-pulse" />
            <span className="font-['Outfit'] font-black text-[10px] tracking-[0.2em] text-white uppercase">
              YOUNGFIRE SANCTUARY
            </span>
          </div>
        </div>

        {/* 4. Brand Heading & Facilitators Proclamation */}
        <div className="w-full text-center space-y-3 -mt-6 sm:-mt-8 relative z-20 px-2">
          
          {/* Flame Center Crest */}
          <div 
            className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl flex items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.5)] border border-amber-300/40"
            style={{ 
              backgroundColor: '#040711',
              boxShadow: `0 0 30px ${accentColor}40`
            }}
          >
            <div 
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-inner"
              style={{ backgroundColor: accentColor }}
            >
              <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-black fill-current drop-shadow" />
            </div>
          </div>

          <div>
            <h1 className="font-['Outfit'] text-2xl sm:text-3xl tracking-[0.2em] uppercase text-white font-black drop-shadow-md">
              YOUNG<span style={{ color: accentColor }}>FIRE</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono tracking-[0.16em] uppercase text-slate-300 font-bold mt-0.5">
              JOSHUA HOUSE OF WORSHIP &bull; SAN ANTONIO, TX
            </p>
          </div>

          {/* PROMINENT MANDATED TEXT */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-amber-500/30 shadow-xl max-w-lg mx-auto">
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-bold block mb-1">
              ANNUAL THEME PROCLAMATION &bull; LEADERSHIP
            </span>
            <p className="font-['Outfit'] text-sm sm:text-base font-black text-white tracking-wide leading-snug">
              Rebuilding Better Together (Ephesians 4:16) &bull; Lead Facilitators Trent D. White &amp; Whitney White
            </p>
          </div>

          {/* Gathering Quick Notice */}
          <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>Small Groups: <strong className="text-slate-200">{smallGroupLocation}</strong> (Bi-Weekly Mondays @ 7:00 PM CST)</span>
          </div>
        </div>

        {/* 5. DIRECT ACTION BUTTONS */}
        <div className="w-full max-w-md space-y-3 mt-6">
          
          {/* Button 1: Register New Disciple Profile → */}
          <button
            onClick={handleRegisterClick}
            className="w-full py-3.5 px-6 rounded-2xl text-slate-950 font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all cursor-pointer shadow-xl shadow-amber-500/25 group"
            style={{
              background: `linear-gradient(135deg, ${accentColor}, #EA580C)`
            }}
          >
            <UserPlus className="w-4 h-4 text-slate-950" />
            <span>Register New Disciple Profile &rarr;</span>
          </button>

          {/* Button 2: Sign In to Existing Account */}
          <button
            onClick={handleSignInClick}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#0B1329] hover:bg-[#101b38] border border-white/20 text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:border-white/40 active:scale-98 transition-all cursor-pointer shadow-lg"
          >
            <LogIn className="w-4 h-4 text-amber-400" />
            <span>Sign In to Existing Account</span>
          </button>

          {/* Button 3: Explore as Guest */}
          <button
            onClick={handleExploreGuestClick}
            className="w-full py-3 px-6 rounded-2xl bg-black/40 hover:bg-black/80 border border-white/10 text-slate-300 hover:text-white font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Explore as Guest</span>
          </button>

        </div>

        {/* Sanctuary Highlights Footer */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-md mt-6 pt-5 border-t border-white/10 text-center">
          <div className="p-2 rounded-xl bg-black/40 border border-white/5">
            <BookOpen className="w-3.5 h-3.5 mx-auto text-amber-400 mb-1" />
            <span className="text-[10px] font-mono text-slate-300 block font-bold">66-BOOK CANON</span>
            <span className="text-[9px] font-mono text-slate-500">Physical Bible Tracker</span>
          </div>

          <div className="p-2 rounded-xl bg-black/40 border border-white/5">
            <Radio className="w-3.5 h-3.5 mx-auto text-cyan-400 mb-1" />
            <span className="text-[10px] font-mono text-slate-300 block font-bold">24/7 GOSPEL AUDIO</span>
            <span className="text-[9px] font-mono text-slate-500">8 Curated Streams</span>
          </div>

          <div className="p-2 rounded-xl bg-black/40 border border-white/5">
            <Calendar className="w-3.5 h-3.5 mx-auto text-rose-400 mb-1" />
            <span className="text-[10px] font-mono text-slate-300 block font-bold">FELLOWSHIP</span>
            <span className="text-[9px] font-mono text-slate-500">In-Person &amp; Zoom</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default WelcomeSanctuary;
