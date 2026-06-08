// 열린문 커넥트 — shared library: Icons, Avatar, PhoneShell, TabBar, etc.
const { useState, useEffect, useMemo, useRef } = React;

// ─────────────────────────────────────────────────────────────
// Icons — outline / filled, 24px viewBox, currentColor stroke
// ─────────────────────────────────────────────────────────────
const Icon = {
  home:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>,
  homeOn:  (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l9 8h-2v9h-5v-6h-4v6H5v-9H3l9-8z"/></svg>,
  bag:     (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>,
  bagOn:   (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M9 6a3 3 0 116 0v2h3.4l-1.2 13H6.8L5.6 8H9V6zm2 2h2V6a1 1 0 10-2 0v2z"/></svg>,
  people:  (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="3.2"/><circle cx="17" cy="10" r="2.4"/><path d="M3.5 19c.5-3 3-4.5 5.5-4.5s5 1.5 5.5 4.5"/><path d="M15 19c.4-2.2 2-3.4 4-3.4s2.7.8 3 2"/></svg>,
  peopleOn:(s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="8.5" r="3.4"/><circle cx="17" cy="9.5" r="2.6"/><path d="M3 19.5c.6-3.4 3.2-5.2 6-5.2s5.4 1.8 6 5.2H3z"/><path d="M16 14.5c1 2 1.5 3.5 1.7 5h4.3c-.2-2.6-1.7-4.5-4-4.5-.7 0-1.4.2-2 .5z"/></svg>,
  pray:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3v8M10 11l-3 4v3h10v-3l-3-4M14 3v8"/><path d="M7 18h10"/></svg>,
  prayOn:  (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M9 3a1 1 0 012 0v7.2L8 14H6l3-3.5V3zm6 0a1 1 0 00-2 0v7.2L16 14h2l-3-3.5V3zM6 15h12v4H6z"/></svg>,
  book:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h10a3 3 0 013 3v13H8a3 3 0 01-3-3V4z"/><path d="M5 17a3 3 0 013-3h10"/></svg>,
  bookOn:  (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M5 4h10a3 3 0 013 3v13H8a3 3 0 01-3-3V4zm3 12h9V7a1 1 0 00-1-1H7v10z"/></svg>,
  user:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="3.6"/><path d="M5 20c1-3.6 3.8-5 7-5s6 1.4 7 5"/></svg>,
  userOn:  (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="9" r="3.8"/><path d="M4.5 20.5c.5-3.6 3.6-5.5 7.5-5.5s7 1.9 7.5 5.5H4.5z"/></svg>,
  bell:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15L6 16z"/><path d="M10 20a2 2 0 004 0"/></svg>,
  search:  (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/></svg>,
  plus:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  back:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7"/></svg>,
  more:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>,
  share:   (s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.6l6.8-3.9M8.6 13.4l6.8 3.9"/></svg>,
  heart:   (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 8.5a5.4 5.4 0 00-9-3 5.4 5.4 0 00-9 3c0 7 9 11.5 9 11.5s9-4.5 9-11.5z"/></svg>,
  heartOn: (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 8.5a5.4 5.4 0 00-9-3 5.4 5.4 0 00-9 3c0 7 9 11.5 9 11.5s9-4.5 9-11.5z"/></svg>,
  check:   (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 12 10 17 19 7"/></svg>,
  chevron: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>,
  chev:    (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>,
  chat:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v11H8l-4 4V5z"/></svg>,
  filter:  (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h18M6 12h12M10 19h4"/></svg>,
  cross:   (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  hand:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11V5.5a1.5 1.5 0 013 0V10"/><path d="M12 10V4.5a1.5 1.5 0 013 0V11"/><path d="M15 11V6.5a1.5 1.5 0 013 0v8a6 6 0 01-12 0v-2.5a1.5 1.5 0 013 0V13"/></svg>,
  cart:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h2.5L7 16h11l2-8H7"/><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>,
  gift:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="9" width="18" height="5" rx="1"/><path d="M5 14v7h14v-7M12 9v12"/><path d="M12 9c-3 0-5-1-5-3a2 2 0 015 0 2 2 0 015 0c0 2-2 3-5 3z"/></svg>,
  cal:     (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
  speech:  (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v10H10l-5 4v-4H4z"/></svg>,
  flame:   (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 3.5 4 5 4 9a5 5 0 11-10 0c0-1 0-2 .7-2.7-.4 1.7.7 2.5 1.5 2.2C7.5 8 9.5 6 12 2z"/></svg>,
  cross2:  (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M10.5 3h3v6.5H20v3h-6.5V21h-3v-8.5H4v-3h6.5z"/></svg>,
  cross2On:(s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M10.5 3h3v6.5H20v3h-6.5V21h-3v-8.5H4v-3h6.5z"/></svg>,
  hands:   (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.5s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10.5c0 5.5-7 10-7 10z"/></svg>,
  handsOn: (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.5s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10.5c0 5.5-7 10-7 10z"/></svg>,
};

// Status bar (mock iPhone)
function StatusBar() {
  return (
    <div className="phone-status">
      <span>9:41</span>
      <span style={{ display:'flex', alignItems:'center', gap: 5 }}>
        <svg width="16" height="10" viewBox="0 0 18 11" fill="currentColor"><rect x="0" y="6" width="3" height="5" rx="1"/><rect x="5" y="4" width="3" height="7" rx="1"/><rect x="10" y="2" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="11" rx="1"/></svg>
        <svg width="14" height="10" viewBox="0 0 24 18" fill="currentColor"><path d="M12 4c3.3 0 6.3 1.3 8.5 3.4l2.2-2.2C20 2.4 16.2 1 12 1S4 2.4 1.3 5.2L3.5 7.4C5.7 5.3 8.7 4 12 4zm0 5c2.1 0 4 .8 5.4 2.2l2.2-2.2C17.5 7 14.9 6 12 6S6.5 7 4.4 9l2.2 2.2C8 9.8 9.9 9 12 9zm0 5a3 3 0 100 6 3 3 0 000-6z"/></svg>
        <svg width="22" height="10" viewBox="0 0 26 13"><rect x="0.5" y="0.5" width="22" height="12" rx="3" fill="none" stroke="currentColor" strokeOpacity=".4"/><rect x="2" y="2" width="19" height="9" rx="2" fill="currentColor"/></svg>
      </span>
    </div>
  );
}

// Phone shell — wraps each artboard
function Phone({ children, statusbar = true, home = true, style }) {
  return (
    <div className="phone" style={style}>
      {statusbar && <StatusBar />}
      {children}
      {home && <div className="phone-home" />}
    </div>
  );
}

// Top bar (back + title + actions)
function TopBar({ title, onBack = true, right, transparent, backLabel = '뒤로', backStyle }) {
  return (
    <div className="phone-topbar" style={transparent ? { background: 'transparent' } : null}>
      <div style={{ display:'flex', alignItems:'center', gap: 4, minWidth: 0, flex: 1 }}>
        {onBack && (
          <div className="back" style={backStyle}>
            {Icon.back()}<span>{backLabel}</span>
          </div>
        )}
        <div className="title" style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{title}</div>
      </div>
      <div className="actions">{right}</div>
    </div>
  );
}

// Standard "solid pill" back style — soft white background for visibility
const BACK_PILL_STYLE = {
  background: 'rgba(255,255,255,0.92)',
  border: '1px solid var(--app-line)',
  boxShadow: '0 1px 2px rgba(20,30,18,0.04)',
};

// Floating tab bar — 5 tabs (중보기도 + 삶공부는 '신앙' 탭으로 묶임)
const TABS = [
  { key: 'home',   label: '홈',     icon: Icon.home,   iconOn: Icon.homeOn },
  { key: 'market', label: '나눔',   icon: Icon.bag,    iconOn: Icon.bagOn  },
  { key: 'group',  label: '소모임', icon: Icon.people, iconOn: Icon.peopleOn },
  { key: 'faith',  label: '동행',   icon: Icon.hands,  iconOn: Icon.handsOn },
  { key: 'me',     label: 'MY',     icon: Icon.user,   iconOn: Icon.userOn },
];
function TabBar({ active = 'home' }) {
  return (
    <div className="tabbar">
      {TABS.map(t => {
        const on = t.key === active;
        return (
          <button key={t.key} className={on ? 'on' : ''}>
            {on ? t.iconOn(20) : t.icon(20)}
            <span className="lbl">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Avatar — initial bubble with gentle gradient based on hash
const AV_GRADS = [
  ['#8FA882', '#B5C4A4'],   // sage
  ['#C7B89D', '#E2D6BD'],   // taupe
  ['#9FBFA0', '#C5DAB7'],   // mint
  ['#C97C6E', '#E3A597'],   // terracotta
  ['#A6B79A', '#CFDDC2'],   // moss
  ['#B79F8C', '#D5C2AE'],   // beige
  ['#7E9C8E', '#A8C2B3'],   // forest mist
];
function gradFor(seed) {
  if (typeof seed === 'number') return AV_GRADS[seed % AV_GRADS.length];
  let h = 0;
  for (let i = 0; i < (seed || '').length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return AV_GRADS[h % AV_GRADS.length];
}
function Avatar({ name = '?', size = 40, seed, style }) {
  const [a, b] = gradFor(seed != null ? seed : name);
  const ch = name.trim().slice(0, 1) || '?';
  return (
    <div className="av" style={{
      width: size, height: size, fontSize: size * 0.42,
      background: `linear-gradient(135deg, ${a}, ${b})`,
      ...style,
    }}>{ch}</div>
  );
}

// Squircle thumbnail placeholder with a subtle abstract shape
function Thumb({ size = 80, seed = 0, icon, color, style }) {
  const palettes = [
    ['#E6EBDB', '#C9D6B2'],
    ['#F3E8D7', '#DBC9A5'],
    ['#E0E9DE', '#B7CCB3'],
    ['#F3DED7', '#DCB1A6'],
    ['#E8E4D3', '#C9C2A4'],
    ['#DDE8E4', '#B0C9C0'],
  ];
  const [bg, fg] = color || palettes[seed % palettes.length];
  return (
    <div className="thumb" style={{
      width: size, height: size, background: bg, color: fg,
      ...style,
    }}>
      <svg className="deco" viewBox="0 0 100 100" preserveAspectRatio="none">
        <circle cx={20 + (seed * 17) % 60} cy={20 + (seed * 11) % 60} r="32" fill={fg} opacity=".35"/>
        <circle cx={60 + (seed * 7) % 30} cy={70 - (seed * 13) % 30} r="22" fill={fg} opacity=".22"/>
      </svg>
      {icon && <div style={{ position:'relative', zIndex:1, color: '#fff', mixBlendMode:'normal' }}>{icon}</div>}
    </div>
  );
}

// Group cover — wider rectangular variant
function Cover({ w = 320, h = 140, seed = 0, label, icon }) {
  const palettes = [
    ['#DDE5CD', '#8FA882'],
    ['#EAE0CB', '#C7B89D'],
    ['#D4E1D1', '#7E9C8E'],
    ['#E7D2CB', '#C97C6E'],
    ['#DEE5D4', '#A6B79A'],
    ['#D8E5DD', '#7BA194'],
  ];
  const [bg, fg] = palettes[seed % palettes.length];
  return (
    <div style={{
      width: w, height: h, borderRadius: 'var(--app-r-l)',
      background: `linear-gradient(135deg, ${bg}, ${fg}22)`,
      position:'relative', overflow:'hidden', flexShrink: 0,
    }}>
      <svg viewBox="0 0 200 100" preserveAspectRatio="none"
           style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
        <path d={`M0,${60+seed%20} Q${50+seed%20},${30-seed%10} ${100+seed%10},${70-seed%10} T200,${50+seed%20} L200,100 L0,100 Z`} fill={fg} opacity=".35"/>
        <circle cx={150+seed%20} cy={30+seed%15} r={28+seed%10} fill="#fff" opacity=".35"/>
      </svg>
      {(label || icon) && (
        <div style={{
          position:'absolute', left: 14, bottom: 12,
          color: fg, fontWeight: 700, display:'flex', alignItems:'center', gap:6, fontSize: 14,
          textShadow: '0 1px 0 rgba(255,255,255,.4)',
        }}>{icon}{label}</div>
      )}
    </div>
  );
}

// Section in scroll list
function Section({ title, more, children, style }) {
  return (
    <section style={style}>
      {(title || more) && (
        <div className="sec-head">
          <div className="title">{title}</div>
          {more && <div className="more">{more} ›</div>}
        </div>
      )}
      {children}
    </section>
  );
}

// Chip row with horizontal scroll
function ChipRow({ items, active, onChange, style }) {
  return (
    <div style={{
      display:'flex', gap: 8, overflowX:'auto', padding: '4px 18px 8px',
      scrollbarWidth:'none', ...style,
    }}>
      {items.map(it => (
        <span key={it.key} className={'chip' + (it.key === active ? ' on' : '')}>
          {it.label}
        </span>
      ))}
    </div>
  );
}

// Pill segmented tab (full width)
function SegTabs({ items, active }) {
  return (
    <div style={{
      display:'flex', gap: 4, padding: 4, margin: '0 18px',
      background: 'rgba(30,41,32,0.05)', borderRadius: 'var(--app-r-pill)',
    }}>
      {items.map(it => {
        const on = it.key === active;
        return (
          <div key={it.key} style={{
            flex: 1, textAlign:'center', padding: '8px 4px',
            borderRadius: 'var(--app-r-pill)',
            background: on ? 'var(--app-surface)' : 'transparent',
            boxShadow: on ? '0 1px 2px rgba(20,30,18,0.10)' : 'none',
            color: on ? 'var(--app-ink)' : 'var(--app-ink-mute)',
            fontWeight: on ? 700 : 600,
            fontSize: 'calc(13px * var(--app-fs-scale))',
          }}>{it.label}</div>
        );
      })}
    </div>
  );
}

// Underline tab row (used in detail screens)
function UnderlineTabs({ items, active }) {
  return (
    <div style={{ display:'flex', gap:18, padding:'4px 18px 0', borderBottom: '1px solid var(--app-line)' }}>
      {items.map(it => {
        const on = it.key === active;
        return (
          <div key={it.key} style={{
            padding:'10px 0', position:'relative',
            color: on ? 'var(--app-ink)' : 'var(--app-ink-mute)',
            fontWeight: on ? 700 : 500,
            fontSize:'calc(14px * var(--app-fs-scale))',
          }}>
            {it.label}
            {on && <div style={{
              position:'absolute', left:0, right:0, bottom:-1, height:2,
              background:'var(--app-primary)', borderRadius:2,
            }}/>}
          </div>
        );
      })}
    </div>
  );
}

function AlertDialog({ title, message, cancelText = '취소', confirmText = '확인', danger }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 80,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 28px',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(20,22,28,0.5)',
        backdropFilter: 'blur(2px)',
      }}/>
      <div style={{
        position: 'relative',
        background: '#fff',
        borderRadius: 18,
        padding: '24px 22px 16px',
        width: '100%', maxWidth: 280,
        boxShadow: '0 20px 50px -20px rgba(0,0,0,0.4)',
        animation: 'dialogPop 200ms cubic-bezier(.2,.7,.2,1)',
      }}>
        <div style={{
          fontSize: 'calc(16px * var(--app-fs-scale))',
          fontWeight: 700, letterSpacing: '-0.01em',
          textAlign: 'center', lineHeight: 1.4,
        }}>{title}</div>
        {message && (
          <div className="t-sm" style={{
            marginTop: 8, textAlign: 'center',
            color: 'var(--app-ink-soft)', lineHeight: 1.55,
          }}>{message}</div>
        )}
        <div style={{ marginTop: 22, display: 'flex', gap: 8 }}>
          <button style={{
            flex: 1, height: 44, border: 0, borderRadius: 12,
            background: 'var(--app-surface-2)',
            color: 'var(--app-ink-soft)',
            fontFamily: 'inherit', fontSize: 'calc(14px * var(--app-fs-scale))',
            fontWeight: 600, cursor: 'pointer',
          }}>{cancelText}</button>
          <button style={{
            flex: 1, height: 44, border: 0, borderRadius: 12,
            background: danger ? 'var(--app-danger)' : 'var(--app-primary)',
            color: '#fff',
            fontFamily: 'inherit', fontSize: 'calc(14px * var(--app-fs-scale))',
            fontWeight: 700, cursor: 'pointer',
          }}>{confirmText}</button>
        </div>
      </div>
      <style>{`@keyframes dialogPop { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

function CheckToast({ children, offset = 28 }) {
  if (!children) return null;
  return (
    <div style={{
      position: 'absolute', left: 16, right: 16, bottom: offset, zIndex: 40,
      background: 'rgba(28,38,30,0.94)', color: '#fff',
      padding: '12px 16px', borderRadius: 14,
      fontSize: 'calc(13px * var(--app-fs-scale))', fontWeight: 600,
      display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 14px 30px -10px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.18)',
      animation: 'toastUp 240ms cubic-bezier(.2,.7,.2,1)',
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: .9 }}>
        <polyline points="4 12 10 18 20 6"/>
      </svg>
      <span style={{ flex: 1, lineHeight: 1.4 }}>{children}</span>
      <style>{`@keyframes toastUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

function BottomSheet({ title, children, footer }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 80,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(20,22,28,0.45)',
        backdropFilter: 'blur(2px)',
      }}/>
      <div style={{
        position: 'relative',
        background: 'var(--app-bg)',
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        maxHeight: '85%',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 -14px 40px -10px rgba(0,0,0,0.18)',
        animation: 'sheetUp 240ms cubic-bezier(.2,.7,.2,1)',
      }}>
        <div style={{ display: 'grid', placeItems: 'center', padding: '10px 0 4px' }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--app-line-strong)' }}/>
        </div>
        {title && (
          <div style={{
            padding: '8px 22px 16px',
            fontWeight: 800, fontSize: 'calc(17px * var(--app-fs-scale))',
            letterSpacing: '-0.015em',
          }}>{title}</div>
        )}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 22px 8px' }}>
          {children}
        </div>
        {footer && (
          <div style={{ padding: '12px 16px 22px', display: 'flex', gap: 8 }}>
            {footer}
          </div>
        )}
      </div>
      <style>{`@keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
}

function RadioSheet({ title, options, value, hint, danger, cancelText = '취소', confirmText = '확인', footer }) {
  return (
    <BottomSheet
      title={title}
      footer={footer || (
        <>
          <button style={{
            flex: 1, height: 48, border: 0, borderRadius: 'var(--app-r-pill)',
            background: 'var(--app-surface)',
            color: 'var(--app-ink-soft)',
            fontFamily: 'inherit', fontSize: 'calc(14px * var(--app-fs-scale))',
            fontWeight: 600, cursor: 'pointer',
          }}>{cancelText}</button>
          <button style={{
            flex: 1, height: 48, border: 0, borderRadius: 'var(--app-r-pill)',
            background: danger ? 'var(--app-danger)' : 'var(--app-primary)',
            color: '#fff',
            fontFamily: 'inherit', fontSize: 'calc(14px * var(--app-fs-scale))',
            fontWeight: 700, cursor: 'pointer',
          }}>{confirmText}</button>
        </>
      )}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {options.map((o, i) => {
          const on = o.value === value;
          const disabled = o.disabled;
          return (
            <div key={o.value} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 4px',
              borderBottom: i < options.length - 1 ? '1px solid var(--app-line)' : 'none',
              opacity: disabled ? 0.4 : 1,
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: on ? 'var(--app-primary)' : 'transparent',
                border: on ? '0' : '1.5px solid var(--app-line-strong)',
                display: 'grid', placeItems: 'center',
                flexShrink: 0,
              }}>
                {on && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }}/>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 'calc(14.5px * var(--app-fs-scale))', fontWeight: on ? 700 : 500 }}>{o.label}</div>
                {o.sub && <div className="t-sm" style={{ color: 'var(--app-ink-mute)', marginTop: 2 }}>{o.sub}</div>}
              </div>
              {disabled && <span className="t-xs" style={{ color: 'var(--app-ink-mute)' }}>현재 상태</span>}
            </div>
          );
        })}
      </div>
      {hint && (
        <div style={{
          marginTop: 12, padding: '10px 12px',
          borderRadius: 'var(--app-r-m)',
          background: 'var(--app-surface)',
          fontSize: 'calc(12.5px * var(--app-fs-scale))',
          color: 'var(--app-ink-mute)', lineHeight: 1.5,
        }}>{hint}</div>
      )}
    </BottomSheet>
  );
}

function FormField({ label, hint, children, required, style }) {
  return (
    <div style={style}>
      {label && (
        <div className="t-sm" style={{ marginBottom: 6, fontWeight: 700, color: 'var(--app-ink-soft)' }}>
          {label}{required && <span style={{ color: 'var(--app-danger)' }}> *</span>}
        </div>
      )}
      {children}
      {hint && <div className="t-xs" style={{ marginTop: 6, lineHeight: 1.45 }}>{hint}</div>}
    </div>
  );
}

function BlockIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M5.6 5.6l12.8 12.8"/>
    </svg>
  );
}

// Helper: number formatter (Korean)
function won(n) { return n === 0 ? '나눔' : Number(n).toLocaleString('ko-KR') + '원'; }

Object.assign(window, {
  Icon, StatusBar, Phone, TopBar, TabBar, TABS,
  Avatar, Thumb, Cover, Section, ChipRow, SegTabs, UnderlineTabs,
  AlertDialog, CheckToast, BottomSheet, RadioSheet, FormField, BlockIcon,
  won, gradFor, BACK_PILL_STYLE,
});
