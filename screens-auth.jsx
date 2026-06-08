// 열린문 커넥트 — Auth & Onboarding screens
const { useState: useStateAuth } = React;

// ─────────────────────────────────────────────────────────────
// Shared bits
// ─────────────────────────────────────────────────────────────
function Spinner({ size = 18, color = '#fff', stroke = 2.2 }) {
  return (
    <span
      style={{
        width: size, height: size, display: 'inline-block',
        borderRadius: '50%',
        border: `${stroke}px solid ${color}`,
        borderTopColor: 'transparent',
        animation: 'authSpin 720ms linear infinite',
      }}
    />
  );
}

function ErrorIcon({ size = 14, color = 'var(--app-danger)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6M12 16.5v.5" />
    </svg>
  );
}

function InlineError({ children }) {
  if (!children) return null;
  return (
    <div style={{
      marginTop: 6, display: 'flex', alignItems: 'center', gap: 6,
      color: 'var(--app-danger)',
      fontSize: 'calc(12px * var(--app-fs-scale))',
      fontWeight: 500, lineHeight: 1.4,
    }}>
      <ErrorIcon />
      <span>{children}</span>
    </div>
  );
}

function FieldHint({ children, tone = 'mute' }) {
  if (!children) return null;
  const color = tone === 'ok' ? 'var(--app-success)'
              : tone === 'warn' ? 'var(--app-warn)'
              : 'var(--app-ink-mute)';
  return (
    <div style={{
      marginTop: 6, color,
      fontSize: 'calc(12px * var(--app-fs-scale))', lineHeight: 1.4,
    }}>{children}</div>
  );
}

function FieldLabel({ children }) {
  return (
    <div style={{
      marginBottom: 6,
      fontSize: 'calc(13px * var(--app-fs-scale))', fontWeight: 600,
      color: 'var(--app-ink-soft)',
      letterSpacing: '-0.005em',
    }}>{children}</div>
  );
}

function EyeButton({ on }) {
  return (
    <button
      aria-label={on ? '비밀번호 숨기기' : '비밀번호 보기'}
      style={{
        position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
        width: 36, height: 36, borderRadius: '50%',
        background: 'transparent', border: 0, padding: 0,
        display: 'grid', placeItems: 'center',
        cursor: 'pointer', color: 'var(--app-ink-mute)',
      }}
    >
      {on ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3l18 18"/>
          <path d="M10.6 6.2A10 10 0 0112 6c6.5 0 10 6 10 6a17 17 0 01-3.3 4.1"/>
          <path d="M6.8 6.8A17 17 0 002 12s3.5 7 10 7a10 10 0 005.2-1.5"/>
          <path d="M9.9 9.9a3 3 0 004.2 4.2"/>
        </svg>
      )}
    </button>
  );
}

// PasswordField: shared password input w/ eye toggle
function PasswordInput({ value, onChange, placeholder, hasError, show, onToggle }) {
  const controlled = typeof onChange === 'function';
  return (
    <div style={{ position: 'relative' }}>
      <input
        className="input"
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        {...(controlled
          ? { value: value || '', onChange }
          : { defaultValue: value || '', readOnly: true })}
        style={{
          paddingRight: 48,
          borderColor: hasError ? 'var(--app-danger)' : undefined,
          background: hasError ? '#FDF4F1' : undefined,
        }}
      />
      <span onClick={onToggle} style={{ display: 'contents', cursor: 'pointer' }}>
        <EyeButton on={show} />
      </span>
    </div>
  );
}

// Generic text input wrapper that supports error state styling
function TextInput({ value, onChange, placeholder, hasError, inputMode, paddingRight }) {
  const controlled = typeof onChange === 'function';
  return (
    <input
      className="input"
      placeholder={placeholder}
      {...(controlled
        ? { value: value || '', onChange }
        : { defaultValue: value || '', readOnly: true })}
      inputMode={inputMode}
      style={{
        paddingRight: paddingRight || undefined,
        borderColor: hasError ? 'var(--app-danger)' : undefined,
        background: hasError ? '#FDF4F1' : undefined,
      }}
    />
  );
}

// Floating toast that sits above the bottom action area
//   offset: distance from phone bottom (px). Defaults to safe-area (28).
//   Pass higher value when there's a bottom-bar / tabbar to clear.
function Toast({ children, tone = 'ink', offset = 28 }) {
  if (!children) return null;
  const bg = tone === 'danger' ? 'rgba(186,64,52,0.96)'
           : tone === 'warn' ? 'rgba(140,100,30,0.96)'
           : 'rgba(28,38,30,0.94)';
  return (
    <div style={{
      position: 'absolute', left: 16, right: 16, bottom: offset, zIndex: 40,
      background: bg, color: '#fff',
      padding: '12px 16px', borderRadius: 14,
      fontSize: 'calc(13px * var(--app-fs-scale))', fontWeight: 600,
      letterSpacing: '-0.01em',
      display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 14px 30px -10px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.18)',
      animation: 'authToastUp 240ms cubic-bezier(.2,.7,.2,1)',
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: .9 }}>
        <path d="M12 2v6"/>
        <path d="M4.2 8.8A9 9 0 0021 12"/>
        <path d="M19.8 15.2A9 9 0 013 12"/>
      </svg>
      <span style={{ flex: 1, lineHeight: 1.4 }}>{children}</span>
    </div>
  );
}

// Shared keyframes (rendered once per Phone via tag in body — safe to re-inject)
function AuthStyles() {
  return (
    <style>{`
      @keyframes authSpin { to { transform: rotate(360deg); } }
      @keyframes authToastUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
    `}</style>
  );
}

// Primary submit button supporting loading / disabled
function SubmitButton({ children, loading, disabled, onClick }) {
  const off = loading || disabled;
  return (
    <button
      className="btn btn-primary"
      disabled={off}
      onClick={onClick}
      style={{
        flex: 1,
        opacity: disabled ? 0.4 : 1,
        cursor: off ? 'not-allowed' : 'pointer',
        pointerEvents: off ? 'none' : 'auto',
      }}
    >
      {loading ? <Spinner size={18} color="#fff" /> : children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// 스플래시 (0)
// ─────────────────────────────────────────────────────────────
function ScreenSplash() {
  return (
    <Phone statusbar={false} home={false}>
      <AuthStyles/>
      <div style={{
        flex: 1, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        background: 'linear-gradient(160deg, var(--app-primary), var(--app-primary-deep))',
        color: '#fff', position:'relative', overflow:'hidden',
      }}>
        <div className="phone-status" style={{ color:'#fff', position:'absolute', top:0, left:0, right:0, background:'transparent' }}>
          <span>9:41</span>
          <span style={{ display:'flex', alignItems:'center', gap: 5 }}>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="6" width="3" height="4" rx="0.5"/><rect x="4" y="4" width="3" height="6" rx="0.5"/><rect x="8" y="2" width="3" height="8" rx="0.5"/><rect x="12" y="0" width="3" height="10" rx="0.5"/></svg>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 4 C 4 1, 10 1, 13 4 M3 6 C 5 4, 9 4, 11 6 M5.5 8 C 6.5 7, 7.5 7, 8.5 8"/></svg>
            <svg width="22" height="10" viewBox="0 0 22 10" fill="none"><rect x="0.5" y="0.5" width="18" height="9" rx="2" stroke="currentColor" strokeOpacity=".55"/><rect x="2" y="2" width="15" height="6" rx="1" fill="currentColor"/><rect x="19.5" y="3.5" width="1.5" height="3" rx="0.5" fill="currentColor" fillOpacity=".55"/></svg>
          </span>
        </div>
        <div style={{ position:'absolute', top:-80, right:-60, width: 260, height: 260, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }}/>
        <div style={{ position:'absolute', bottom:-100, left:-80, width: 320, height: 320, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }}/>

        <div style={{
          width: 112, height: 112, borderRadius: 32,
          background: 'rgba(255,255,255,0.16)', backdropFilter:'blur(8px)',
          display:'grid', placeItems:'center',
          boxShadow:'0 18px 40px -12px rgba(0,0,0,0.25)',
          position:'relative', zIndex: 1,
        }}>
          <svg width="56" height="56" viewBox="0 0 44 44" fill="none">
            <path d="M10 8 L26 5 L26 39 L10 36 Z" fill="#fff" opacity=".98"/>
            <path d="M26 5 L34 9 L34 35 L26 39 Z" fill="#fff" opacity=".70"/>
            <circle cx="22" cy="22" r="1.7" fill="var(--app-primary-deep)"/>
          </svg>
        </div>

        <div style={{ marginTop: 22, fontSize:'calc(24px * var(--app-fs-scale))', fontWeight: 800, letterSpacing:'-0.02em', zIndex: 1 }}>열린문 커넥트</div>
        <div style={{ marginTop: 8, fontSize:'calc(13px * var(--app-fs-scale))', color:'rgba(255,255,255,0.82)', zIndex: 1 }}>성도와 성도, 마음과 마음을 이어요</div>

        <div style={{ position:'absolute', bottom: 64, left:'50%', transform:'translateX(-50%)', display:'flex', gap: 6, zIndex: 1 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 6, height: 6, borderRadius:'50%', background:'rgba(255,255,255,0.85)', opacity: 0.4 + i * 0.2 }}/>
          ))}
        </div>
      </div>
    </Phone>
  );
}

// ─────────────────────────────────────────────────────────────
// 로그인 (FUNC-001) — variants: default | error | loading | toast
// ─────────────────────────────────────────────────────────────
function ScreenLogin({ variant = 'default' }) {
  const isError = variant === 'error';
  const isLoading = variant === 'loading';
  const isToast = variant === 'toast';

  const id = isError ? 'gracekim' : (variant === 'default' ? '' : 'gracekim');
  const pw = isError ? '••••••' : (variant === 'default' ? '' : '••••••••');
  const filled = id.length > 0 && pw.length > 0;

  return (
    <Phone>
      <AuthStyles/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 24px 0' }}>
        {/* Logo + tagline */}
        <div style={{ marginTop: 28, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
          <div style={{
            width: 76, height: 76, borderRadius: 22,
            background: 'linear-gradient(135deg, var(--app-primary), var(--app-primary-deep))',
            display:'grid', placeItems:'center', color:'#fff',
            boxShadow: '0 12px 26px -10px rgba(91,122,176,0.55)',
          }}>
            <svg width="38" height="38" viewBox="0 0 44 44" fill="none">
              <path d="M10 8 L26 5 L26 39 L10 36 Z" fill="#fff" opacity=".95"/>
              <path d="M26 5 L34 9 L34 35 L26 39 Z" fill="#fff" opacity=".70"/>
              <circle cx="22" cy="22" r="1.7" fill="var(--app-primary-deep)"/>
            </svg>
          </div>
          <div style={{ marginTop: 16, fontSize:'calc(22px * var(--app-fs-scale))', fontWeight: 800, letterSpacing:'-0.02em' }}>
            열린문 커넥트
          </div>
          <div className="t-sm" style={{ marginTop: 6 }}>
            교회 가족과 함께하는 일상
          </div>
        </div>

        {/* Form */}
        <div style={{ marginTop: 36, display:'flex', flexDirection:'column', gap: 14 }}>
          <div>
            <FieldLabel>아이디</FieldLabel>
            <TextInput value={id} placeholder="아이디를 입력해주세요" hasError={isError} />
          </div>
          <div>
            <FieldLabel>비밀번호</FieldLabel>
            <PasswordInput value={pw} placeholder="비밀번호를 입력해주세요" hasError={isError} show={false} />
            {isError && <InlineError>아이디 또는 비밀번호가 올바르지 않습니다</InlineError>}
          </div>

          {/* Login button */}
          <button
            className="btn btn-primary"
            style={{
              width: '100%', marginTop: 8,
              opacity: (!filled && variant === 'default') ? 0.4 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              pointerEvents: isLoading ? 'none' : 'auto',
            }}
          >
            {isLoading ? <Spinner size={18} /> : '로그인'}
          </button>

        </div>

        {/* Divider */}
        <div style={{ display:'flex', alignItems:'center', gap: 12, margin: '24px 0 16px', color:'var(--app-ink-hint)' }}>
          <div style={{ flex: 1, height: 1, background:'var(--app-line)' }}/>
          <span style={{ fontSize:'calc(12px * var(--app-fs-scale))' }}>처음이신가요?</span>
          <div style={{ flex: 1, height: 1, background:'var(--app-line)' }}/>
        </div>

        {/* 회원가입하기 */}
        <button
          className="btn btn-line"
          style={{ width: '100%' }}
        >
          회원가입
        </button>

        <div style={{ flex: 1 }}/>
        <div className="t-xs" style={{ textAlign:'center', padding: '12px 0 28px', color:'var(--app-ink-hint)' }}>
          © 열린문교회
        </div>
      </div>

      {isToast && <Toast tone="ink" offset={28}>네트워크 연결을 확인해주세요</Toast>}
    </Phone>
  );
}

// ─────────────────────────────────────────────────────────────
// 약관 동의 (FUNC-003) — 기존 유지
// ─────────────────────────────────────────────────────────────
function CheckCircle({ on, big }) {
  const sz = big ? 24 : 20;
  return (
    <div style={{
      width: sz, height: sz, borderRadius: '50%',
      background: on ? 'var(--app-primary)' : 'transparent',
      border: on ? '0' : '1.5px solid var(--app-line-strong)',
      display: 'grid', placeItems:'center', color: '#fff', flexShrink: 0,
    }}>
      {on && <svg width={sz*0.55} height={sz*0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 12 10 17 19 7"/></svg>}
    </div>
  );
}

const TERMS_LIST = [
  { key:'tos',     label: '서비스 이용약관',          req: true  },
  { key:'privacy', label: '개인정보 처리방침',        req: true  },
  { key:'loc',     label: '위치 기반 서비스 이용약관', req: false },
  { key:'mkt',     label: '마케팅 정보 수신 동의',    req: false },
];

const TERMS_FULLTEXT = {
  tos: { title:'서비스 이용약관', body:
`제1조 (목적)
본 약관은 열린문커넥트(이하 "서비스")가 제공하는 모바일 애플리케이션 및 관련 제반 서비스의 이용과 관련하여 회사와 회원의 권리·의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조 (정의)
1. "회원"이란 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 자를 말합니다.
2. "콘텐츠"란 회원이 서비스에 게시한 글, 사진, 댓글 등을 의미합니다.
3. "교회 커뮤니티"란 동일 교회 소속 회원으로 구성된 폐쇄형 그룹을 말합니다.

제3조 (약관의 효력 및 변경)
본 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다. 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.

제4조 (회원가입)
회원이 되고자 하는 자는 회사가 정한 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.

제5조 (서비스의 제공 및 변경)
회사는 다음과 같은 서비스를 제공합니다.
- 교회 내 중고거래 및 나눔 플랫폼
- 소모임 개설 및 참여
- 중보기도 모임
- 삶공부 과정 안내 및 수강 신청` },
  privacy: { title:'개인정보 처리방침', body:
`제1조 (수집하는 개인정보 항목)
회사는 회원가입, 서비스 제공 및 상담 등을 위해 아래와 같은 개인정보를 수집합니다.
- 필수: 아이디, 비밀번호, 이름, 연락처
- 선택: 목장/부서 정보

제2조 (개인정보의 수집 및 이용 목적)
회원 관리, 서비스 제공, 부정 이용 방지, 통계 분석을 위해 사용됩니다.

제3조 (개인정보의 보유 및 이용 기간)
회원 탈퇴 시 즉시 파기하며, 법령에서 정한 보존 기간이 있는 경우 해당 기간 동안 보관합니다.` },
  loc: { title:'위치 기반 서비스 이용약관', body:
`제1조 (목적)
본 약관은 회사가 제공하는 위치기반서비스 이용과 관련된 사항을 규정합니다.

제2조 (위치정보 이용·제공)
회원의 사전 동의 없이 개인 위치정보를 제3자에게 제공하지 않습니다. 단, 모임 장소 안내 등 서비스 제공에 필수적인 범위에 한해 이용될 수 있습니다.` },
  mkt: { title:'마케팅 정보 수신 동의', body:
`회사가 제공하는 서비스 안내, 이벤트, 신규 기능 등의 마케팅 정보를 푸시 알림 및 이메일로 수신하는 데 동의합니다. 본 동의는 선택 사항이며, 동의하지 않아도 서비스 이용에 제한이 없습니다. 동의 후에도 언제든지 수신을 거부할 수 있습니다.` },
};

function TermsSheet({ termKey, onClose }) {
  if (!termKey) return null;
  const t = TERMS_FULLTEXT[termKey];
  return (
    <div style={{
      position:'absolute', inset: 0, zIndex: 50,
      display:'flex', flexDirection:'column', justifyContent:'flex-end',
    }}>
      <div onClick={onClose} style={{
        position:'absolute', inset: 0,
        background:'rgba(20,22,28,0.45)',
        backdropFilter:'blur(2px)',
      }}/>
      <div style={{
        position:'relative',
        background:'var(--app-bg)', color:'var(--app-ink)',
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        maxHeight:'80%', display:'flex', flexDirection:'column',
        boxShadow:'0 -14px 40px -10px rgba(0,0,0,0.18)',
        animation:'sheetUp 240ms cubic-bezier(.2,.7,.2,1)',
      }}>
        <div style={{ display:'grid', placeItems:'center', padding:'10px 0 4px' }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background:'var(--app-line-strong)' }}/>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 18px 12px' }}>
          <div style={{ fontWeight:800, fontSize:'calc(16px * var(--app-fs-scale))', letterSpacing:'-0.015em' }}>{t.title}</div>
          <button onClick={onClose} aria-label="close" style={{
            width: 32, height: 32, borderRadius: 16, border:'none',
            background:'var(--app-surface)', display:'grid', placeItems:'center',
            cursor:'pointer', color:'var(--app-ink-soft)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6L18 18M18 6L6 18"/></svg>
          </button>
        </div>
        <div style={{
          padding:'4px 20px 28px', overflowY:'auto',
          fontSize:'calc(13.5px * var(--app-fs-scale))',
          color:'var(--app-ink-soft)', lineHeight: 1.75,
          whiteSpace:'pre-line',
        }}>
          <div style={{ marginBottom: 10, color:'var(--app-ink-mute)', fontSize:'calc(12px * var(--app-fs-scale))' }}>
            시행일자: 2026년 1월 1일
          </div>
          {t.body}
        </div>
      </div>
    </div>
  );
}

function ScreenTerms() {
  const [agreed, setAgreed] = useStateAuth({ tos:false, privacy:false, loc:false, mkt:false });
  const [sheet, setSheet] = useStateAuth(null);
  const btnOverride = React.useContext(window.ButtonStateContext);
  const allOn = TERMS_LIST.every(t => agreed[t.key]);
  const checked = TERMS_LIST.filter(t => t.req).every(t => agreed[t.key]);
  const requiredOn = btnOverride === 'enabled' ? true : btnOverride === 'disabled' ? false : checked;

  const toggle = (k) => setAgreed(prev => ({ ...prev, [k]: !prev[k] }));
  const toggleAll = () => {
    const next = !allOn;
    setAgreed({ tos: next, privacy: next, loc: next, mkt: next });
  };

  return (
    <Phone>
      <AuthStyles/>
      <TopBar title="서비스 이용 동의" />
      <div className="phone-body" style={{ padding: '0 24px' }}>
        <div className="t-display">약관에 동의해주세요</div>
        <div className="t-body" style={{ marginTop: 10 }}>서비스 이용을 위해 약관 동의가 필요해요.</div>

        <div
          onClick={toggleAll}
          style={{
            marginTop: 28, padding: '18px 18px',
            borderRadius: 'var(--app-r-l)',
            background: allOn ? 'var(--app-primary-tint)' : 'var(--app-surface)',
            display:'flex', alignItems:'center', gap: 14,
            cursor:'pointer', transition:'background 160ms ease',
          }}
        >
          <CheckCircle on={allOn} big />
          <div style={{ fontSize:'calc(16px * var(--app-fs-scale))', fontWeight: 700 }}>전체 동의하기</div>
        </div>

        <div style={{ marginTop: 8, padding: '4px 4px' }}>
          {TERMS_LIST.map((t) => (
            <div key={t.key} style={{ display:'flex', alignItems:'center', gap: 14, padding: '14px 14px' }}>
              <div onClick={() => toggle(t.key)} style={{ cursor:'pointer' }}>
                <CheckCircle on={agreed[t.key]} />
              </div>
              <div onClick={() => toggle(t.key)} style={{ flex: 1, fontSize:'calc(14px * var(--app-fs-scale))', cursor:'pointer' }}>
                <span style={{ color: t.req ? 'var(--app-primary-deep)' : 'var(--app-ink-mute)', fontWeight: 600, marginRight: 6 }}>
                  [{t.req ? '필수' : '선택'}]
                </span>
                {t.label}
              </div>
              <div onClick={() => setSheet(t.key)} style={{ color:'var(--app-ink-soft)', cursor:'pointer', fontSize:'calc(12px * var(--app-fs-scale))', display:'inline-flex', alignItems:'center', gap: 2 }}>
                <span style={{ textDecoration:'underline', textUnderlineOffset: 3 }}>전문 보기</span>
                {Icon.chevron(14)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom-flat">
        <button
          className="btn btn-primary"
          disabled={!requiredOn}
          style={{
            flex: 1,
            opacity: requiredOn ? 1 : 0.4,
            cursor: requiredOn ? 'pointer' : 'not-allowed',
            pointerEvents: requiredOn ? 'auto' : 'none',
          }}
        >다음</button>
      </div>

      <TermsSheet termKey={sheet} onClose={() => setSheet(null)} />
    </Phone>
  );
}

function ScreenTermsSheet() {
  return (
    <Phone>
      <AuthStyles/>
      <TopBar title="서비스 이용 동의" />
      <div className="phone-body" style={{ padding: '0 24px' }}>
        <div className="t-display" style={{ opacity:.5 }}>약관에 동의해주세요</div>
        <div className="t-body" style={{ marginTop: 10, opacity:.5 }}>서비스 이용을 위해 약관 동의가 필요해요.</div>
        <div style={{
          marginTop: 28, padding: '18px 18px',
          borderRadius: 'var(--app-r-l)', background: 'var(--app-surface)',
          display:'flex', alignItems:'center', gap: 14, opacity:.5,
        }}>
          <CheckCircle on={false} big />
          <div style={{ fontSize:'calc(16px * var(--app-fs-scale))', fontWeight: 700 }}>전체 동의하기</div>
        </div>
      </div>
      <TermsSheet termKey="tos" onClose={() => {}} />
    </Phone>
  );
}

// ─────────────────────────────────────────────────────────────
// 회원가입 (FUNC-002) — variants: default | id-dup | pw-error | phone-error | phone-dup | loading
// ─────────────────────────────────────────────────────────────

// Mini auto-avatar preview (이름 두 글자 + 메인 컬러)
function AutoAvatar({ name }) {
  const trimmed = (name || '').trim();
  const initials = trimmed ? trimmed.slice(-2) : '';
  return (
    <div style={{
      width: 88, height: 88, borderRadius: '50%',
      background: trimmed
        ? 'linear-gradient(135deg, var(--app-primary), var(--app-primary-deep))'
        : 'var(--app-surface-2)',
      border: trimmed ? '0' : '1.5px dashed var(--app-line-strong)',
      display:'grid', placeItems:'center', color:'#fff',
      boxShadow: trimmed ? '0 8px 22px -10px rgba(91,122,176,0.5)' : 'none',
      transition: 'all 240ms ease',
    }}>
      {trimmed ? (
        <span style={{ fontWeight: 800, fontSize: 30, letterSpacing:'-0.02em' }}>{initials}</span>
      ) : (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--app-ink-hint)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="9" r="3.4"/>
          <path d="M5 20c1-3.6 3.8-5 7-5s6 1.4 7 5"/>
        </svg>
      )}
    </div>
  );
}

function ScreenSignup({ variant = 'default' }) {
  const isIdDup = variant === 'id-dup';
  const isPwError = variant === 'pw-error';
  const isPhoneError = variant === 'phone-error';
  const isPhoneDup = variant === 'phone-dup';
  const isLoading = variant === 'loading';

  // Sample data per variant
  const isDefault = variant === 'default';
  const id = isDefault ? '' : 'gracekim';
  const pw = isDefault ? '' : (isPwError ? '1234' : 'spring2026!');
  const pw2 = isDefault ? '' : (isPwError ? 'spring2026' : 'spring2026!');
  const name = isDefault ? '' : '김은혜';
  const phone = isDefault ? ''
    : isPhoneError ? '010-2222'
    : '010-2345-6789';

  const allFilled = !isDefault;

  return (
    <Phone>
      <AuthStyles/>
      <TopBar title="회원가입" />
      <div className="phone-body" style={{ padding: '0 24px 8px' }}>
        <div className="t-display">정보를 입력해주세요</div>

        {/* 자동 아바타 미리보기 */}
        <div style={{ marginTop: 22, display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', gap: 8 }}>
          <AutoAvatar name={name} />
          <div className="t-xs" style={{ color:'var(--app-ink-mute)' }}>
            {name ? '이름 두 글자로 자동 생성된 프로필' : '이름을 입력하면 미리보기가 표시됩니다'}
          </div>
        </div>

        <div style={{ marginTop: 28, display:'flex', flexDirection:'column', gap: 20 }}>
          {/* 아이디 + 중복확인 */}
          <div>
            <FieldLabel>아이디</FieldLabel>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <TextInput value={id} placeholder="아이디" hasError={isIdDup} />
              </div>
              <button
                style={{
                  height: 48, padding: '0 14px',
                  borderRadius: 'var(--app-r-m)',
                  background: 'var(--app-surface)',
                  border: '1px solid var(--app-line-strong)',
                  color: 'var(--app-ink)',
                  fontFamily: 'inherit',
                  fontSize: 'calc(13px * var(--app-fs-scale))',
                  fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >중복 확인</button>
            </div>
            {isIdDup && <InlineError>이미 사용 중인 아이디입니다</InlineError>}
          </div>

          {/* 비밀번호 */}
          <div>
            <FieldLabel>비밀번호</FieldLabel>
            <PasswordInput value={pw} placeholder="비밀번호" hasError={isPwError} show={false} />
            {isPwError ? (
              <InlineError>비밀번호는 8자 이상, 영문·숫자를 모두 포함해야 합니다</InlineError>
            ) : (
              <FieldHint>8자 이상, 영문·숫자 조합</FieldHint>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <FieldLabel>비밀번호 확인</FieldLabel>
            <PasswordInput value={pw2} placeholder="비밀번호 확인" hasError={isPwError} show={false} />
            {isPwError && <InlineError>비밀번호가 일치하지 않습니다</InlineError>}
          </div>

          {/* 이름 */}
          <div>
            <FieldLabel>이름</FieldLabel>
            <TextInput value={name} placeholder="실명을 입력해주세요" />
            <FieldHint>2~10자, 특수문자는 사용할 수 없어요</FieldHint>
          </div>

          {/* 연락처 */}
          <div>
            <FieldLabel>연락처</FieldLabel>
            <TextInput
              value={phone}
              placeholder="010-XXXX-XXXX"
              hasError={isPhoneError || isPhoneDup}
              inputMode="numeric"
            />
            {isPhoneError && <InlineError>연락처는 010-XXXX-XXXX 형식으로 입력해주세요</InlineError>}
            {isPhoneDup && <InlineError>이미 가입된 연락처입니다</InlineError>}
            {!isPhoneError && !isPhoneDup && <FieldHint>숫자만 입력하면 자동으로 하이픈이 추가돼요</FieldHint>}
          </div>
        </div>

      </div>

      <div className="bottom-flat">
        <SubmitButton loading={isLoading} disabled={!allFilled && isDefault}>
          가입 완료
        </SubmitButton>
      </div>
    </Phone>
  );
}

function ScreenSignupResult({ variant = 'matched' }) {
  const isPending = variant === 'pending';
  return (
    <Phone>
      <AuthStyles/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '44px 24px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 46 }}>
          <div style={{
            width: 82, height: 82, borderRadius: 26,
            background: isPending ? 'var(--app-surface-2)' : 'linear-gradient(135deg, var(--app-primary), var(--app-primary-deep))',
            color: isPending ? 'var(--app-primary-deep)' : '#fff',
            display: 'grid', placeItems: 'center',
            boxShadow: isPending ? 'none' : '0 12px 26px -10px rgba(91,122,176,0.55)',
          }}>
            {isPending ? (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 7v5l3 2"/>
              </svg>
            ) : (
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            )}
          </div>
        </div>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 'calc(24px * var(--app-fs-scale))', fontWeight: 850, letterSpacing: '-0.02em' }}>
            {isPending ? '승인 대기 중이에요' : '가입이 완료됐어요'}
          </div>
          <div className="t-body" style={{ marginTop: 10, lineHeight: 1.55 }}>
            {isPending
              ? '사전 등록 명단에서 확인되지 않아 관리자 승인 후 이용할 수 있어요.'
              : '사전 등록 명단에서 확인되어 바로 이용할 수 있어요.'}
          </div>
        </div>

        <div className="card" style={{ marginTop: 34, padding: 18, boxShadow: '0 1px 3px rgba(20,30,18,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className={isPending ? 'badge badge-amber' : 'badge badge-primary'}>
              {isPending ? '승인 대기' : '가입 완료'}
            </span>
            <div style={{ fontWeight: 800, fontSize: 'calc(14px * var(--app-fs-scale))' }}>
              {isPending ? '가입 신청이 접수되었습니다' : '회원 정보가 확인되었습니다'}
            </div>
          </div>
          <div className="t-sm" style={{ marginTop: 10, lineHeight: 1.55 }}>
            {isPending
              ? '승인 완료 시 알림으로 알려드릴게요.'
              : '지금부터 열린문 커넥트를 이용할 수 있습니다.'}
          </div>
        </div>

        <div style={{ flex: 1 }} />
        <button className={isPending ? 'btn btn-line' : 'btn btn-primary'} style={{ width: '100%' }}>
          {isPending ? '로그인으로 돌아가기' : '홈으로 이동'}
        </button>
      </div>
    </Phone>
  );
}

Object.assign(window, {
  ScreenSplash, ScreenLogin,
  ScreenTerms, ScreenTermsSheet, ScreenSignup, ScreenSignupResult,
  // shared helpers
  AuthStyles, Spinner, InlineError, FieldHint, FieldLabel,
  TextInput, PasswordInput, SubmitButton, Toast,
});
