// 열린문 커넥트 — 마이페이지 (FUNC-005) + 프로필 수정 + 탈퇴 + 타 성도 프로필 + 로그아웃 다이얼로그

// ─────────────────────────────────────────────────────────────
// Shared: AlertDialog (centered modal w/ cancel + confirm)
// ─────────────────────────────────────────────────────────────
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

// Simple confirm toast (success)
//   offset: distance from phone bottom (px). Defaults to safe-area (28).
//   Pass ~96 when there's a tab bar / bottom action bar to clear.
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

// Block icon (slashed circle) — used for "차단" actions
function BlockIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M5.6 5.6l12.8 12.8"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared: BottomSheet (slides up from bottom)
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// Shared: RadioSheet — bottom-sheet w/ radio options
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// 5. 마이페이지 (FUNC-005)
// ─────────────────────────────────────────────────────────────
function ScreenMyPage({ variant = 'default' }) {
  const showLogout = variant === 'logout-confirm';

  const MenuRow = ({ icon, label, last, danger }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '16px 18px',
      borderBottom: last ? 'none' : '1px solid var(--app-line)',
      cursor: 'pointer',
    }}>
      <div style={{ color: danger ? 'var(--app-danger)' : 'var(--app-ink-soft)', flexShrink: 0 }}>{icon}</div>
      <div style={{
        flex: 1, fontSize: 'calc(14.5px * var(--app-fs-scale))',
        fontWeight: 500,
        color: danger ? 'var(--app-danger)' : 'var(--app-ink)',
      }}>{label}</div>
      <div style={{ color: 'var(--app-ink-hint)' }}>{Icon.chev(16)}</div>
    </div>
  );

  const SectionLabel = ({ children }) => (
    <div style={{
      padding: '22px 22px 8px',
      fontSize: 'calc(12px * var(--app-fs-scale))',
      fontWeight: 700,
      color: 'var(--app-ink-mute)',
      letterSpacing: '0.02em',
    }}>{children}</div>
  );

  return (
    <Phone>
      <div className="phone-topbar">
        <div style={{ flex: 1 }}>
          <div className="title">마이페이지</div>
        </div>
      </div>

      <div className="phone-body">
        {/* 프로필 카드 */}
        <div style={{
          margin: '0 18px', padding: '18px',
          borderRadius: 'var(--app-r-l)', background: 'var(--app-surface)',
          display: 'flex', alignItems: 'center', gap: 16,
          boxShadow: 'var(--app-shadow-card)',
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--app-primary), var(--app-primary-deep))',
            display: 'grid', placeItems: 'center', color: '#fff',
            flexShrink: 0,
            boxShadow: '0 6px 16px -8px rgba(91,122,176,0.45)',
          }}>
            <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>은혜</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 'calc(17px * var(--app-fs-scale))', letterSpacing: '-0.015em' }}>김은혜</div>
            <div className="t-sm" style={{ marginTop: 3 }}>열린문교회</div>
          </div>
          <button style={{
            background: 'transparent', border: 0,
            color: 'var(--app-primary-deep)',
            fontFamily: 'inherit', fontSize: 'calc(13px * var(--app-fs-scale))',
            fontWeight: 600, padding: '6px 4px', cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}>프로필 수정</button>
        </div>

        {/* 활동 관리 */}
        <SectionLabel>활동 관리</SectionLabel>
        <div className="card" style={{ margin: '0 18px', overflow: 'hidden' }}>
          <MenuRow
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 7v5l3.5 2"/>
              </svg>
            }
            label="내 활동"
          />
          <MenuRow
            icon={<BlockIcon size={20}/>}
            label="차단 관리"
            last
          />
        </div>

        {/* 고객센터 */}
        <SectionLabel>고객센터</SectionLabel>
        <div className="card" style={{ margin: '0 18px', overflow: 'hidden' }}>
          <MenuRow
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"/>
                <path d="M9.4 9.5a2.6 2.6 0 015.1.5c0 1.6-2.5 2.2-2.5 4M12 17v.5"/>
              </svg>
            }
            label="FAQ"
          />
          <MenuRow
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3h12v18H6z"/>
                <path d="M9 8h6M9 12h6M9 16h4"/>
              </svg>
            }
            label="약관"
          />
          <MenuRow
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l8 3v6c0 4.5-3.4 8.5-8 9-4.6-.5-8-4.5-8-9V6l8-3z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            }
            label="개인정보 처리방침"
            last
          />
        </div>

        {/* 계정 */}
        <SectionLabel>계정</SectionLabel>
        <div className="card" style={{ margin: '0 18px', overflow: 'hidden' }}>
          <MenuRow
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/>
                <path d="M9 8l-4 4 4 4M5 12h11"/>
              </svg>
            }
            label="로그아웃"
            last
          />
        </div>

        {/* 계정 관리 */}
        <SectionLabel>계정 관리</SectionLabel>
        <div className="card" style={{ margin: '0 18px', overflow: 'hidden' }}>
          <MenuRow
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="9" r="3.4"/>
                <path d="M5 20c1-3.6 3.8-5 7-5"/>
                <path d="M16 16l5 5M21 16l-5 5"/>
              </svg>
            }
            label="회원탈퇴"
            danger
            last
          />
        </div>

        <div style={{ textAlign: 'center', padding: '24px 0 8px', color: 'var(--app-ink-hint)', fontSize: 'calc(11px * var(--app-fs-scale))' }}>v 1.0.2 · 열린문 커넥트</div>
      </div>

      <TabBar active="me"/>

      {showLogout && (
        <AlertDialog
          title="로그아웃 하시겠습니까?"
          cancelText="취소"
          confirmText="로그아웃"
        />
      )}
    </Phone>
  );
}

// Wrapper for the logout dialog artboard
function ScreenLogoutConfirm() {
  return <ScreenMyPage variant="logout-confirm"/>;
}

// ─────────────────────────────────────────────────────────────
// 6. 프로필 수정 (FUNC-006)
//    variants: default | changed | phone-dup | current-pw-error | pw-mismatch
// ─────────────────────────────────────────────────────────────
function ScreenEditProfile({ variant = 'default' }) {
  const isDefault = variant === 'default';
  const isPhoneDup = variant === 'phone-dup';
  const isCurrentPwError = variant === 'current-pw-error';
  const isPwMismatch = variant === 'pw-mismatch';
  const hasChange = !isDefault;

  const phone = isDefault
    ? '010-2345-6789'
    : isPhoneDup ? '010-9999-9999' : '010-2345-6789';

  return (
    <Phone>
      <AuthStyles/>
      <TopBar
        title="프로필 수정"
        right={
          <div style={{
            fontSize: 'calc(14px * var(--app-fs-scale))',
            fontWeight: 700,
            color: hasChange ? 'var(--app-primary)' : 'var(--app-ink-hint)',
            padding: '6px 8px',
            cursor: hasChange ? 'pointer' : 'not-allowed',
          }}>저장</div>
        }
      />
      <div className="phone-body" style={{ padding: '0 18px 28px' }}>
        {/* 이름 + 아바타 (읽기 전용, 회색) */}
        <div style={{
          padding: '16px 16px', display: 'flex', alignItems: 'center', gap: 14,
          borderRadius: 'var(--app-r-l)', background: 'var(--app-surface-2)',
          border: '1px solid var(--app-line)',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'rgba(120,120,120,0.32)',
            display: 'grid', placeItems: 'center', color: 'rgba(255,255,255,0.85)',
            flexShrink: 0,
          }}>
            <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>은혜</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="t-xs" style={{ color: 'var(--app-ink-mute)' }}>이름</div>
            <div style={{ marginTop: 2, fontWeight: 700, fontSize: 'calc(16px * var(--app-fs-scale))', color: 'var(--app-ink-soft)' }}>김은혜</div>
            <div className="t-xs" style={{ marginTop: 4, color: 'var(--app-ink-mute)' }}>이름과 프로필은 변경할 수 없어요</div>
          </div>
        </div>

        {/* 연락처 */}
        <div style={{ marginTop: 22 }}>
          <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600, color: 'var(--app-ink-soft)' }}>연락처</div>
          <TextInput
            value={phone}
            placeholder="010-XXXX-XXXX"
            hasError={isPhoneDup}
            inputMode="numeric"
          />
          {isPhoneDup ? (
            <InlineError>이미 사용 중인 연락처입니다</InlineError>
          ) : (
            <FieldHint>숫자만 입력하면 자동으로 하이픈이 추가돼요</FieldHint>
          )}
        </div>

        {/* 구분선 */}
        <div style={{ margin: '28px 0 18px', height: 1, background: 'var(--app-line)' }}/>

        {/* 비밀번호 변경 */}
        <div style={{ fontWeight: 700, fontSize: 'calc(15px * var(--app-fs-scale))', marginBottom: 14 }}>비밀번호 변경</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600, color: 'var(--app-ink-soft)' }}>현재 비밀번호</div>
            <PasswordInput
              value={hasChange ? '••••••••' : ''}
              placeholder="현재 비밀번호"
              hasError={isCurrentPwError}
              show={false}
            />
            {isCurrentPwError && <InlineError>현재 비밀번호가 올바르지 않습니다</InlineError>}
          </div>

          <div>
            <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600, color: 'var(--app-ink-soft)' }}>새 비밀번호</div>
            <PasswordInput
              value={hasChange ? 'spring2026!' : ''}
              placeholder="새 비밀번호"
              show={false}
            />
            <FieldHint>8자 이상, 영문·숫자 조합</FieldHint>
          </div>

          <div>
            <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600, color: 'var(--app-ink-soft)' }}>새 비밀번호 확인</div>
            <PasswordInput
              value={hasChange ? (isPwMismatch ? 'spring2025' : 'spring2026!') : ''}
              placeholder="새 비밀번호 확인"
              hasError={isPwMismatch}
              show={false}
            />
            {isPwMismatch && <InlineError>비밀번호가 일치하지 않습니다</InlineError>}
          </div>
        </div>
      </div>
    </Phone>
  );
}

// ─────────────────────────────────────────────────────────────
// 12. 회원 탈퇴 (FUNC-009)
//    variants: default | confirm
// ─────────────────────────────────────────────────────────────
function ScreenWithdraw({ variant = 'default' }) {
  const showConfirm = variant === 'confirm';
  const cautions = [
    '작성한 나눔 게시글·댓글은 익명으로 남습니다',
    '탈퇴 후 재가입해도 기존 데이터는 복구할 수 없습니다',
    '탈퇴 즉시 개인정보가 파기됩니다',
    '소모임장인 경우 가장 먼저 가입한 멤버에게 자동 이관됩니다',
  ];
  return (
    <Phone>
      <TopBar title="회원 탈퇴"/>
      <div className="phone-body" style={{ padding: '0 18px' }}>
        <div style={{ paddingTop: 4, paddingBottom: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 'calc(20px * var(--app-fs-scale))', letterSpacing: '-0.02em', lineHeight: 1.35 }}>
            정말 떠나시나요?
          </div>
          <div className="t-body" style={{ marginTop: 10 }}>
            탈퇴 전에 아래 안내를 꼭 확인해주세요.
          </div>
        </div>

        {/* 주의사항 박스 */}
        <div style={{
          padding: '16px',
          borderRadius: 'var(--app-r-l)',
          background: 'rgba(201,124,110,0.10)',
          border: '1px solid rgba(201,124,110,0.20)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: 'var(--app-danger)', fontWeight: 700, fontSize: 'calc(13px * var(--app-fs-scale))' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 9v4M12 17v.5"/>
              <path d="M10.6 3.6 2.4 18a1.6 1.6 0 0 0 1.4 2.4h16.4a1.6 1.6 0 0 0 1.4-2.4L13.4 3.6a1.6 1.6 0 0 0-2.8 0z"/>
            </svg>
            <span>탈퇴 전 안내사항</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {cautions.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--app-danger)', marginTop: 8, flexShrink: 0 }}/>
                <div style={{ flex: 1, fontSize: 'calc(13.5px * var(--app-fs-scale))', color: '#7B3A2D', lineHeight: 1.55 }}>{c}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: 18, padding: 14,
          borderRadius: 'var(--app-r-m)', background: 'var(--app-surface)',
          border: '1px solid var(--app-line)',
        }}>
          <div className="t-sm" style={{ color: 'var(--app-ink-soft)', lineHeight: 1.55 }}>
            계정과 모든 활동 내역이 영구적으로 삭제됩니다. 신중히 결정해주세요.
          </div>
        </div>
      </div>

      <div className="bottom-flat">
        <button className="btn btn-primary" style={{
          flex: 1, background: 'var(--app-danger)',
          boxShadow: '0 6px 16px -8px rgba(201,124,110,0.6)',
        }}>탈퇴하기</button>
      </div>

      {showConfirm && (
        <AlertDialog
          title="정말 탈퇴하시겠습니까?"
          message="이 작업은 되돌릴 수 없으며, 모든 데이터가 즉시 삭제됩니다."
          cancelText="취소"
          confirmText="탈퇴"
          danger
        />
      )}
    </Phone>
  );
}

// ─────────────────────────────────────────────────────────────
// 13. 타 성도 프로필 (FUNC-007, 020)
//    variants: default | block-confirm | block-toast | blocked | withdrawn
// ─────────────────────────────────────────────────────────────
function ScreenUserProfile({ variant = 'default' }) {
  const isConfirm = variant === 'block-confirm';
  const isToast = variant === 'block-toast';
  const isBlockedView = variant === 'blocked';
  const isWithdrawn = variant === 'withdrawn';

  const name = isWithdrawn ? '알 수 없음' : '박정아';
  const initial = isWithdrawn ? '?' : '정아';

  // Blocked view = "확인할 수 없는 프로필입니다"
  if (isBlockedView) {
    return (
      <Phone>
        <TopBar title="프로필"/>
        <div className="phone-body" style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '0 32px', textAlign: 'center',
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--app-surface-2)',
            display: 'grid', placeItems: 'center',
            marginBottom: 22,
            border: '1.5px solid var(--app-line-strong)',
          }}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="var(--app-ink-hint)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9"/>
              <path d="M5.6 5.6l12.8 12.8"/>
            </svg>
          </div>
          <div style={{ fontWeight: 700, fontSize: 'calc(17px * var(--app-fs-scale))', letterSpacing: '-0.015em' }}>
            확인할 수 없는 프로필입니다
          </div>
          <div className="t-sm" style={{ marginTop: 10, color: 'var(--app-ink-mute)', lineHeight: 1.6 }}>
            차단한 사용자의 프로필은 볼 수 없어요.<br/>
            마이페이지 &gt; 차단 사용자 관리에서 해제할 수 있어요.
          </div>
        </div>
      </Phone>
    );
  }

  return (
    <Phone>
      <TopBar title="프로필"/>
      <div className="phone-body" style={{ padding: '0 24px' }}>
        <div style={{
          padding: '40px 0 32px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center',
        }}>
          <div style={{
            width: 104, height: 104, borderRadius: '50%',
            background: isWithdrawn
              ? 'var(--app-surface-2)'
              : 'linear-gradient(135deg, var(--app-primary), var(--app-primary-deep))',
            border: isWithdrawn ? '1.5px solid var(--app-line-strong)' : 'none',
            display: 'grid', placeItems: 'center',
            color: isWithdrawn ? 'var(--app-ink-hint)' : '#fff',
            boxShadow: isWithdrawn ? 'none' : '0 12px 30px -10px rgba(91,122,176,0.5)',
          }}>
            <span style={{ fontWeight: 800, fontSize: 36, letterSpacing: '-0.02em' }}>{initial}</span>
          </div>
          <div style={{
            marginTop: 18,
            fontWeight: 800, fontSize: 'calc(22px * var(--app-fs-scale))',
            letterSpacing: '-0.02em',
            color: isWithdrawn ? 'var(--app-ink-mute)' : 'var(--app-ink)',
          }}>
            {name}
          </div>
          {isWithdrawn && (
            <div className="t-sm" style={{ marginTop: 6, color: 'var(--app-ink-mute)' }}>탈퇴한 사용자</div>
          )}
        </div>

        {!isWithdrawn && (
          <button style={{
            width: '100%',
            height: 52, borderRadius: 'var(--app-r-pill)',
            background: 'transparent',
            border: '1px solid var(--app-line-strong)',
            color: 'var(--app-ink-soft)',
            fontFamily: 'inherit', fontSize: 'calc(14px * var(--app-fs-scale))',
            fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            cursor: 'pointer',
          }}>
            <BlockIcon size={18}/>
            차단
          </button>
        )}
      </div>

      {isConfirm && (
        <AlertDialog
          title={`${name}님을 차단할까요?`}
          message="차단한 사용자의 게시글과 댓글은 보이지 않으며, 상대도 회원님의 활동을 볼 수 없어요."
          cancelText="취소"
          confirmText="차단"
          danger
        />
      )}

      {isToast && <CheckToast>차단되었습니다</CheckToast>}
    </Phone>
  );
}

Object.assign(window, {
  ScreenMyPage, ScreenLogoutConfirm,
  ScreenEditProfile, ScreenWithdraw, ScreenUserProfile,
  AlertDialog, CheckToast, BlockIcon, BottomSheet, RadioSheet,
});
