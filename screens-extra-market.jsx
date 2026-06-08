// 열린문 커넥트 — 나눔 게시글 작성·수정 (FUNC-012, 013)

// ─────────────────────────────────────────────────────────────
// 19. 나눔 게시글 작성·수정
//   variants:
//     create     — 신규 작성 (필수 미입력 → 등록 비활성)
//     create-filled — 신규 작성 (필수 입력 완료 → 등록 활성)
//     edit       — 수정 모드 (자동 채움)
//     back-warn  — 작성 중 뒤로가기 경고 팝업
//     limit-toast — 활성 5개 초과 Toast
// ─────────────────────────────────────────────────────────────
function ScreenMarketCreate({ variant = 'create' }) {
  const isEdit = variant === 'edit';
  const isFilled = isEdit || variant === 'create-filled' || variant === 'back-warn' || variant === 'limit-toast';
  const showBackWarn = variant === 'back-warn';
  const showLimitToast = variant === 'limit-toast';

  const title = isFilled ? '아이 장난감 정리하면서 나눔합니다 (블록·인형 30점)' : '';
  const desc = isFilled ? `아이가 커서 더 이상 쓰지 않는 장난감 정리해요.
대부분 깨끗하게 사용한 것들이고, 블록류 20점 + 인형류 10점 정도 됩니다.
필요하신 분께 무료로 드려요!

수령은 토요일 오후 교회 1층 로비에서 가능합니다.` : '';
  const photos = isFilled ? [0, 1, 2] : [];
  const cat = isFilled ? 'baby' : null;
  const cond = isFilled ? 'used' : null;

  const titleLen = title.length;
  const descLen = desc.length;

  return (
    <Phone>
      {/* TopBar */}
      <div className="phone-topbar">
        <div className="back close">{Icon.cross(22)}<span>닫기</span></div>
        <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
          <div style={{
            fontSize: 'calc(16px * var(--app-fs-scale))',
            fontWeight: 700, letterSpacing: '-0.015em',
          }}>{isEdit ? '나눔 수정' : '나눔 등록'}</div>
        </div>
        <div className="actions" style={{ minWidth: 60, justifyContent: 'flex-end' }}>
          <div style={{
            padding: '6px 8px',
            fontSize: 'calc(14px * var(--app-fs-scale))', fontWeight: 700,
            color: isFilled ? 'var(--app-primary)' : 'var(--app-ink-hint)',
            cursor: isFilled ? 'pointer' : 'not-allowed',
          }}>{isEdit ? '저장' : '등록'}</div>
        </div>
      </div>

      <div className="phone-body" style={{ padding: 0 }}>
        {/* 사진 첨부 */}
        <div style={{ padding: '6px 0 18px' }}>
          <div style={{
            display: 'flex', gap: 10, overflowX: 'auto',
            padding: '4px 22px',
            scrollbarWidth: 'none',
          }}>
            {/* + 추가 버튼 */}
            <div style={{
              width: 90, height: 90, flexShrink: 0,
              borderRadius: 'var(--app-r-m)',
              border: '1.5px dashed var(--app-line-strong)',
              background: 'var(--app-surface-2)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              color: 'var(--app-ink-mute)',
              cursor: 'pointer', gap: 4,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="18" height="14" rx="2"/>
                <path d="M8 6l2-3h4l2 3"/>
                <circle cx="12" cy="13" r="3.4"/>
              </svg>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '-0.01em' }}>
                사진 {photos.length}/5
              </span>
            </div>
            {/* 추가된 사진 */}
            {photos.map((p, i) => (
              <div key={i} style={{ position: 'relative', flexShrink: 0 }}>
                <Thumb size={90} seed={p}/>
                {i === 0 && (
                  <div style={{
                    position: 'absolute', left: 6, bottom: 6,
                    padding: '3px 8px', borderRadius: 999,
                    background: 'var(--app-primary)', color: '#fff',
                    fontSize: 10, fontWeight: 700,
                    letterSpacing: '-0.01em',
                  }}>대표</div>
                )}
                <div style={{
                  position: 'absolute', top: 4, right: 4,
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'rgba(20,30,18,0.7)',
                  color: '#fff',
                  display: 'grid', placeItems: 'center',
                  cursor: 'pointer',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '8px 22px 0', fontSize: 'calc(11.5px * var(--app-fs-scale))', color: 'var(--app-ink-hint)' }}>
            최대 5장, JPG/PNG/WEBP, 5MB 이하
          </div>
        </div>

        <Divider/>

        {/* 카테고리 */}
        <Section2 label="카테고리" required>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '0 22px 0' }}>
            {MK_CATS.filter(c => c.key !== 'all').map(c => {
              const on = c.key === cat;
              return (
                <span key={c.key} className={'chip' + (on ? ' on' : '')}>{c.label}</span>
              );
            })}
          </div>
        </Section2>

        <Divider/>

        {/* 제목 */}
        <Section2 label="제목" required hint={`${titleLen}/30`}>
          <input
            className="input"
            placeholder="제목을 입력해주세요 (최대 30자)"
            defaultValue={title}
            readOnly
            maxLength={30}
            style={{ margin: '0 22px', width: 'calc(100% - 44px)' }}
          />
        </Section2>

        <Divider/>

        {/* 물품 상태 */}
        <Section2 label="물품 상태" required>
          <div style={{ padding: '0 22px', display: 'flex', gap: 8 }}>
            {[
              { v: 'new',     label: '새것' },
              { v: 'used',    label: '사용감 있음' },
              { v: 'damaged', label: '파손 있음' },
            ].map(o => {
              const on = o.v === cond;
              return (
                <div key={o.v} style={{
                  flex: 1, height: 42,
                  borderRadius: 'var(--app-r-m)',
                  background: on ? 'var(--app-primary-soft)' : 'var(--app-surface)',
                  border: '1px solid ' + (on ? 'var(--app-primary)' : 'var(--app-line)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 'calc(13px * var(--app-fs-scale))',
                  fontWeight: on ? 700 : 500,
                  color: on ? 'var(--app-primary-deep)' : 'var(--app-ink-soft)',
                  cursor: 'pointer',
                }}>{o.label}</div>
              );
            })}
          </div>
        </Section2>

        <Divider/>

        {/* 상세 설명 */}
        <Section2 label="상세 설명" required hint={`${descLen}/500`}>
          <div style={{ padding: '0 22px' }}>
            <textarea
              className="input"
              placeholder="물품 상태, 수령 방법, 일정 등을 자세히 적어주세요"
              defaultValue={desc}
              readOnly
              maxLength={500}
              rows={6}
              style={{
                width: '100%', height: 'auto',
                padding: '12px 14px',
                resize: 'none', fontFamily: 'inherit',
                lineHeight: 1.6,
              }}
            />
          </div>
        </Section2>

        {/* 안내 박스 */}
        <div style={{
          margin: '16px 22px 22px', padding: '12px 14px',
          borderRadius: 'var(--app-r-m)',
          background: 'var(--app-primary-soft)',
          display: 'flex', gap: 10,
        }}>
          <div style={{ color: 'var(--app-primary-deep)', flexShrink: 0, marginTop: 2 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity=".18"/><circle cx="12" cy="8" r="1.4"/><rect x="11" y="11" width="2" height="7" rx="1"/></svg>
          </div>
          <div className="t-sm" style={{ color: 'var(--app-primary-deep)', lineHeight: 1.5 }}>
            직거래 시 안전한 장소(교회 로비 등)에서 만나주세요.
          </div>
        </div>
      </div>

      {/* Overlays */}
      {showBackWarn && (
        <AlertDialog
          title="작성을 중단하시겠습니까?"
          message="작성 중인 내용이 사라지며 복구할 수 없어요."
          cancelText="계속 작성"
          confirmText="나가기"
          danger
        />
      )}
      {showLimitToast && (
        <CheckToast offset={28}>하루에 나눔은 5개까지 등록할 수 있어요</CheckToast>
      )}
    </Phone>
  );
}

function Divider() {
  return <div style={{ height: 8, background: 'var(--app-bg)' }}/>;
}

function Section2({ label, required, hint, children }) {
  return (
    <div style={{ padding: '14px 0' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 22px 10px',
      }}>
        <div style={{
          fontSize: 'calc(13.5px * var(--app-fs-scale))',
          fontWeight: 700, color: 'var(--app-ink)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          {label}
          {required && <span style={{ color: 'var(--app-primary)' }}>*</span>}
        </div>
        {hint && (
          <span style={{
            fontSize: 'calc(11.5px * var(--app-fs-scale))',
            color: 'var(--app-ink-hint)', fontWeight: 600,
          }}>{hint}</span>
        )}
      </div>
      {children}
    </div>
  );
}

Object.assign(window, { ScreenMarketCreate });
