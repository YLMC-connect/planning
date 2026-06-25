// 열린문 커넥트 — shared library: Icons, Avatar, PhoneShell, TabBar, etc.
const { useState, useEffect, useMemo, useRef } = React;

// ─────────────────────────────────────────────────────────────
// Icons — Lucide-style 24px outline set, kept behind the existing Icon API
// ─────────────────────────────────────────────────────────────
function makeIcon(nodes, opts = {}) {
  return (s = 22) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill={opts.fill || 'none'}
      stroke="currentColor"
      strokeWidth={opts.strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {nodes.map((node, i) => {
        if (node.tag === 'circle') return <circle key={i} cx={node.cx} cy={node.cy} r={node.r} />;
        if (node.tag === 'rect') return <rect key={i} x={node.x} y={node.y} width={node.width} height={node.height} rx={node.rx} />;
        if (node.tag === 'line') return <line key={i} x1={node.x1} y1={node.y1} x2={node.x2} y2={node.y2} />;
        if (node.tag === 'polyline') return <polyline key={i} points={node.points} />;
        return <path key={i} d={node.d} />;
      })}
    </svg>
  );
}

const I = {
  home: [{ d:'m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }, { d:'M9 22V12h6v10' }],
  bag: [{ d:'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z' }, { line:true, tag:'line', x1:3, y1:6, x2:21, y2:6 }, { d:'M16 10a4 4 0 0 1-8 0' }],
  people: [{ tag:'circle', cx:9, cy:8, r:4 }, { d:'M17 11a3 3 0 1 0-2.83-4' }, { d:'M3 21a6 6 0 0 1 12 0' }, { d:'M17 21a5 5 0 0 0-3-4.58' }],
  pray: [{ d:'M12 2v20' }, { d:'M7 7h10' }, { d:'M6 22h12' }],
  book: [{ d:'M12 7v14' }, { d:'M3 5a2 2 0 0 1 2-2h6a1 1 0 0 1 1 1v17a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2z' }, { d:'M21 5a2 2 0 0 0-2-2h-6a1 1 0 0 0-1 1v17a1 1 0 0 1 1-1h6a2 2 0 0 0 2-2z' }],
  user: [{ tag:'circle', cx:12, cy:8, r:5 }, { d:'M20 21a8 8 0 0 0-16 0' }],
  bell: [{ d:'M10.27 21a2 2 0 0 0 3.46 0' }, { d:'M3.26 15.33A2 2 0 0 0 5 18h14a2 2 0 0 0 1.74-2.67C20.25 14.09 19 12.8 19 9a7 7 0 0 0-14 0c0 3.8-1.25 5.09-1.74 6.33' }],
  search: [{ tag:'circle', cx:11, cy:11, r:8 }, { d:'m21 21-4.35-4.35' }],
  plus: [{ d:'M5 12h14' }, { d:'M12 5v14' }],
  back: [{ d:'m15 18-6-6 6-6' }],
  more: [{ tag:'circle', cx:12, cy:12, r:1 }, { tag:'circle', cx:19, cy:12, r:1 }, { tag:'circle', cx:5, cy:12, r:1 }],
  share: [{ tag:'circle', cx:18, cy:5, r:3 }, { tag:'circle', cx:6, cy:12, r:3 }, { tag:'circle', cx:18, cy:19, r:3 }, { d:'m8.59 13.51 6.83 3.98' }, { d:'m15.41 6.51-6.82 3.98' }],
  heart: [{ d:'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 12 5a5.5 5.5 0 0 0-10 3.5c0 2.3 1.5 4.05 3 5.5l7 7Z' }],
  check: [{ tag:'polyline', points:'20 6 9 17 4 12' }],
  chevron: [{ d:'m9 18 6-6-6-6' }],
  chat: [{ d:'M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z' }],
  filter: [{ d:'M4 21v-7' }, { d:'M4 10V3' }, { d:'M12 21v-9' }, { d:'M12 8V3' }, { d:'M20 21v-5' }, { d:'M20 12V3' }, { d:'M2 14h4' }, { d:'M10 8h4' }, { d:'M18 16h4' }],
  cross: [{ d:'M18 6 6 18' }, { d:'m6 6 12 12' }],
  hand: [{ d:'M18 11V6a2 2 0 0 0-4 0v5' }, { d:'M14 10V4a2 2 0 0 0-4 0v7' }, { d:'M10 10.5V6a2 2 0 0 0-4 0v8' }, { d:'M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-16 0' }],
  cart: [{ tag:'circle', cx:8, cy:21, r:1 }, { tag:'circle', cx:19, cy:21, r:1 }, { d:'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L22 7H5.12' }],
  gift: [{ tag:'rect', x:3, y:8, width:18, height:4, rx:1 }, { d:'M12 8v13' }, { d:'M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7' }, { d:'M7.5 8A2.5 2.5 0 1 1 12 6a2.5 2.5 0 1 1 4.5 2' }],
  cal: [{ tag:'rect', x:3, y:4, width:18, height:18, rx:2 }, { d:'M16 2v4' }, { d:'M8 2v4' }, { d:'M3 10h18' }],
  speech: [{ d:'M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z' }],
  flame: [{ d:'M8.5 14.5A2.5 2.5 0 0 0 11 17c2 0 3-1.4 3-3.2 0-2.3-2-3.6-2-5.8 2.8 1.6 5 4.4 5 7.4A5 5 0 1 1 7 15c0-1.5.7-2.9 1.5-4 .1 1.2.4 2.2 0 3.5Z' }],
  cross2: [{ d:'M11 2h2v7h7v2h-7v11h-2V11H4V9h7z' }],
  hands: [{ d:'M11 14H5a2 2 0 0 0-2 2v1a3 3 0 0 0 3 3h3' }, { d:'M13 14h6a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-3' }, { d:'M8 11V7a2 2 0 1 1 4 0v4' }, { d:'M12 11V6a2 2 0 1 1 4 0v5' }],
};

const Icon = {
  home: makeIcon(I.home),
  homeOn: makeIcon(I.home, { strokeWidth: 2.5 }),
  bag: makeIcon(I.bag),
  bagOn: makeIcon(I.bag, { strokeWidth: 2.5 }),
  people: makeIcon(I.people),
  peopleOn: makeIcon(I.people, { strokeWidth: 2.5 }),
  pray: makeIcon(I.pray),
  prayOn: makeIcon(I.pray, { strokeWidth: 2.5 }),
  book: makeIcon(I.book),
  bookOn: makeIcon(I.book, { strokeWidth: 2.5 }),
  user: makeIcon(I.user),
  userOn: makeIcon(I.user, { strokeWidth: 2.5 }),
  bell: makeIcon(I.bell),
  search: makeIcon(I.search),
  plus: makeIcon(I.plus, { strokeWidth: 2.5 }),
  back: makeIcon(I.back),
  more: makeIcon(I.more),
  share: makeIcon(I.share),
  heart: makeIcon(I.heart),
  heartOn: makeIcon(I.heart, { fill: 'currentColor' }),
  check: makeIcon(I.check, { strokeWidth: 3 }),
  chevron: makeIcon(I.chevron),
  chev: makeIcon(I.chevron),
  chat: makeIcon(I.chat),
  filter: makeIcon(I.filter),
  cross: makeIcon(I.cross),
  hand: makeIcon(I.hand),
  cart: makeIcon(I.cart),
  gift: makeIcon(I.gift),
  cal: makeIcon(I.cal),
  speech: makeIcon(I.speech),
  flame: makeIcon(I.flame),
  cross2: makeIcon(I.cross2),
  cross2On: makeIcon(I.cross2, { strokeWidth: 2.5 }),
  hands: makeIcon(I.hands),
  handsOn: makeIcon(I.hands, { strokeWidth: 2.5 }),
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

// Floating tab bar — 5 primary tabs
const TABS = [
  { key: 'home',      label: '홈',     icon: Icon.home,   iconOn: Icon.homeOn },
  { key: 'market',    label: '나눔',   icon: Icon.bag,    iconOn: Icon.bagOn  },
  { key: 'companion', label: '동행',   icon: Icon.people, iconOn: Icon.peopleOn },
  { key: 'prayer',    label: '기도',   icon: Icon.pray,   iconOn: Icon.prayOn },
  { key: 'study',     label: '삶공부', icon: Icon.book,   iconOn: Icon.bookOn },
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
function SegTabs({ items, active, onChange }) {
  return (
    <div style={{
      display:'flex', gap: 4, padding: 4, margin: '0 18px',
      background: 'rgba(30,41,32,0.05)', borderRadius: 'var(--app-r-pill)',
    }} data-preview-ui>
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
            cursor: onChange ? 'pointer' : 'default',
          }} onClick={() => onChange?.(it.key)}>{it.label}</div>
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
          {cancelText && <button style={{
            flex: 1, height: 44, border: 0, borderRadius: 12,
            background: 'var(--app-surface-2)',
            color: 'var(--app-ink-soft)',
            fontFamily: 'inherit', fontSize: 'calc(14px * var(--app-fs-scale))',
            fontWeight: 600, cursor: 'pointer',
          }}>{cancelText}</button>}
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

function AppFab({ children, icon, style }) {
  return (
    <button style={{
      position: 'absolute',
      right: 16,
      bottom: 90,
      zIndex: 20,
      height: 52,
      padding: '0 18px 0 16px',
      borderRadius: 'var(--app-r-pill)',
      background: 'var(--app-primary)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      border: 0,
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: 'calc(14px * var(--app-fs-scale))',
      fontWeight: 700,
      boxShadow: '0 10px 24px -8px rgba(91,122,176,0.5), 0 4px 8px -2px rgba(20,30,18,0.14)',
      ...style,
    }}>
      {icon}
      {children}
    </button>
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
  AlertDialog, CheckToast, BottomSheet, RadioSheet, FormField, AppFab, BlockIcon,
  won, gradFor, BACK_PILL_STYLE,
});
