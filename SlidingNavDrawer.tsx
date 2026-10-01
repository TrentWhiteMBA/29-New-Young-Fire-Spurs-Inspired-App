import React, { useState, useRef } from 'react';
import { 
  Flame, 
  BookOpen, 
  Compass, 
  Tv, 
  Radio, 
  PenTool, 
  Heart, 
  Settings, 
  ShieldAlert, 
  Sparkles,
  Users,
  Sliders,
  ChevronLeft,
  ChevronRight,
  X,
  Trash2,
  Calendar,
  Shield
} from 'lucide-react';
import { CurrentUser } from './SettingsHUDModal';
import { AppTheme } from '../data/appThemes';

interface SlidingNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, subView?: any) => void;
  onOpenSettingsModal: () => void;
  onOpenNotesModal: () => void;
  onOpenThemeModal: () => void;
  onOpenWelcomeModal: () => void;
  onDeleteProfile?: () => void;
  onToggleRadio?: () => void;
  isRadioPlaying?: boolean;
  currentStationName?: string;
  onNextStation?: () => void;
  onPrevStation?: () => void;
  onToggleMusicDock?: () => void;
  isMusicDockOpen?: boolean;
  onOpenZoomFlyer?: () => void;
  activeTheme?: AppTheme;
  currentUser?: CurrentUser | null;
}

export const SlidingNavDrawer: React.FC<SlidingNavDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenSettingsModal,
  onOpenNotesModal,
  onOpenThemeModal,
  onOpenWelcomeModal,
  onDeleteProfile,
  onToggleRadio,
  isRadioPlaying = false,
  currentStationName,
  onNextStation,
  onPrevStation,
  onToggleMusicDock,
  isMusicDockOpen = false,
  onOpenZoomFlyer,
  activeTheme,
  currentUser
}) => {
  const [dragOffset, setDragOffset] = useState<number>(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  if (!isOpen) return null;

  const accentColor = activeTheme?.accentHex || '#F59E0B';

  const isLeader = Boolean(
    currentUser?.isAdmin ||
    currentUser?.role?.toLowerCase().includes('facilitator') ||
    currentUser?.email?.toLowerCase().includes('trent') ||
    currentUser?.email?.toLowerCase().includes('whitney')
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    isDraggingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    if (deltaX > 0 && deltaX > Math.abs(deltaY) * 0.7) {
      isDraggingRef.current = true;
      setDragOffset(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (isDraggingRef.current && dragOffset > 60) {
      onClose();
    }
    setDragOffset(0);
    touchStartRef.current = null;
    isDraggingRef.current = false;
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your consecrated profile and check-in records? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      localStorage.removeItem('youngfire_device_session_v1');
      localStorage.removeItem('youngfire_user_session');
      localStorage.removeItem('youngfire_sword_streak_v1');
      localStorage.removeItem('youngfire_completed_bible_books');

      const rosterSaved = localStorage.getItem('youngfire_member_roster_v2');
      if (rosterSaved && currentUser?.id) {
        const roster = JSON.parse(rosterSaved);
        if (Array.isArray(roster)) {
          const filtered = roster.filter((m: any) => m.id !== currentUser.id && m.email !== currentUser.email);
          localStorage.setItem('youngfire_member_roster_v2', JSON.stringify(filtered));
        }
      }
    } catch {}

    if (currentUser?.id) {
      window.dispatchEvent(new CustomEvent('yf_delete_member', { detail: { id: currentUser.id } }));
    }

    onClose();

    if (onDeleteProfile) {
      onDeleteProfile();
    } else {
      window.dispatchEvent(new CustomEvent('yf_account_deleted'));
    }
  };

  // Primary Gateway Menu Items
  const menuItems = [
    {
      id: 'fellowship',
      label: 'Sanctuary Fellowship Hub (Curriculum, Men, Women)',
      icon: Users,
      action: () => { onNavigate('fellowship'); onClose(); }
    },
    {
      id: 'schedule',
      label: 'Fellowship Master Schedule & Calendar',
      icon: Calendar,
      action: () => { onNavigate('schedule'); onClose(); }
    },
    {
      id: 'word-bible',
      label: '66-Book Scripture Reader',
      icon: BookOpen,
      action: () => { onNavigate('word', 'bible'); onClose(); }
    },
    {
      id: 'word-atlas',
      label: 'Imperial Scripture Atlas',
      icon: Compass,
      action: () => { onNavigate('word', 'atlas'); onClose(); }
    },
    {
      id: 'tv',
      label: 'Worship Sanctuary TV & Video Vault',
      icon: Tv,
      action: () => { onNavigate('tv'); onClose(); }
    },
    {
      id: 'radio',
      label: '24/7 Gospel Radio Player (All 8 Stations)',
      icon: Radio,
      action: () => { onNavigate('radio'); onClose(); }
    },
    {
      id: 'prayer',
      label: 'Prayer Dock & Live Intercession',
      icon: Heart,
      action: () => { onNavigate('prayer_dock'); onClose(); }
    },
    {
      id: 'notes',
      label: 'Study Notes HUD & Revelation Journal',
      icon: PenTool,
      action: () => { onOpenNotesModal(); onClose(); }
    },
    {
      id: 'welcome',
      label: 'Welcome Sanctuary Portal',
      icon: Sparkles,
      action: () => { onOpenWelcomeModal(); onClose(); }
    },
    {
      id: 'settings',
      label: 'Sanctuary Settings & Profile Management',
      icon: Settings,
      action: () => { onOpenSettingsModal(); onClose(); }
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-40 text-white flex select-none overflow-hidden font-['Outfit'] pointer-events-none"
    >
      {/* Background backdrop blur */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto transition-opacity"
      />

      {/* 1. SLIDING RIGHT DRAWER CONTENT */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: dragOffset > 0 ? `translateX(${dragOffset}px)` : 'none',
          transition: isDraggingRef.current ? 'none' : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="ml-auto w-[90%] sm:w-[84%] max-w-xl h-full bg-[#000000] border-l border-white/20 shadow-[-30px_0_70px_rgba(0,0,0,0.95)] flex flex-col justify-between py-5 px-5 sm:px-7 relative z-10 overflow-y-auto no-scrollbar pointer-events-auto"
      >
        {/* Swipe Handle Indicator on Left Edge */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-white/20 rounded-full sm:hidden pointer-events-none" />

        {/* Top Header & Brand Insignia */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-20">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg border flex-shrink-0"
              style={{
                backgroundColor: accentColor,
                borderColor: `${accentColor}80`,
                boxShadow: `0 0 16px ${accentColor}40`
              }}
            >
              <Flame className="w-5 h-5 text-black fill-current" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black uppercase tracking-[0.2em] text-white font-['Outfit'] leading-tight">
                YOUNG<span style={{ color: accentColor }}>FIRE</span>
              </h3>
              <p className="text-[9px] font-mono tracking-[0.16em] uppercase text-slate-400">
                Joshua House of Worship &bull; San Antonio, TX
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10"
            title="Close Drawer"
            aria-label="Close Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Disciple Profile Quick Summary */}
        <div className="my-2.5 p-3 rounded-2xl bg-[#070C1C] border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center text-black font-black text-xs flex-shrink-0"
              style={{ backgroundColor: accentColor }}
            >
              {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : 'YF'}
            </div>
            <div className="min-w-0">
              <span className="font-bold text-xs text-white block truncate">
                {currentUser?.fullName || currentUser?.name || 'Sanctuary Disciple'}
              </span>
              <span className="text-[9px] font-mono text-amber-400 uppercase tracking-wider block truncate">
                {currentUser?.calling || 'Young Adult Disciple'}
              </span>
            </div>
          </div>
          <button
            onClick={() => { onOpenSettingsModal(); onClose(); }}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Open Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Gateway Menu Options */}
        <nav className="space-y-1.5 my-2 py-1 relative z-20 flex-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 px-1 pb-1">
            Primary Sanctuary Gateway
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full flex items-center gap-3 text-left text-slate-200 hover:text-white group cursor-pointer transition-colors py-2 px-2.5 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10"
              >
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/5 group-hover:bg-amber-500/20 text-slate-400 group-hover:text-amber-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold tracking-wide font-['Barlow_Condensed',sans-serif] uppercase truncate">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Facilitators Executive Admin CMS */}
          {isLeader && (
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('yf_open_admin_cms'));
                onClose();
              }}
              className="w-full flex items-center gap-3 text-left text-amber-300 hover:text-amber-200 group cursor-pointer transition-colors p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 mt-2"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 ml-1" />
              <span className="text-xs sm:text-sm font-bold tracking-wider font-['Barlow_Condensed',sans-serif] uppercase truncate">
                Executive Admin CMS (Facilitators)
              </span>
            </button>
          )}
        </nav>

        {/* BOTTOM DANGER SECTION: DELETE MY PROFILE */}
        <div className="pt-3 border-t border-white/10 relative z-20 space-y-2">
          <button
            onClick={handleDeleteClick}
            className="w-full py-2.5 px-3 rounded-xl border border-red-500/40 hover:border-red-500 bg-red-950/20 hover:bg-red-950/40 text-red-400 hover:text-red-300 text-xs font-black font-['Outfit'] uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 group active:scale-98"
            title="Permanently Delete Consecrated Disciple Profile & Records"
          >
            <Trash2 className="w-4 h-4 stroke-[2.5] text-red-500 group-hover:scale-110 transition-transform" />
            <span>DELETE MY PROFILE</span>
          </button>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>YoungFire 2026</span>
            <button 
              onClick={onClose}
              className="text-amber-400 hover:underline uppercase tracking-wider cursor-pointer font-bold"
            >
              Close &larr;
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SlidingNavDrawer;
