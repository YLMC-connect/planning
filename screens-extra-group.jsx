// 열린문 커넥트 — 소모임 개설/수정 (FUNC-023) + 공지 작성/수정 (FUNC-028~030) + 멤버 관리 (FUNC-027, 032)

// ─────────────────────────────────────────────────────────────
// 22. 소모임 개설·수정
//   variants: create | create-filled | edit | range-error | member-error
// ─────────────────────────────────────────────────────────────
function ScreenGroupCreate({ variant = 'create' }) {
  const isEdit = variant === 'edit' || variant === 'range-error' || variant === 'member-error';
  const isFilled = isEdit || variant === 'create-filled';
  const isRangeError = variant === 'range-error';
  const isMemberError = variant === 'member-error';

  const name = isFilled ? '토요 산악회' : '';
  const desc = isFilled ? `매주 토요일 함께 산을 오르며 자연을 느끼고 신앙을 나누는 모임입니다.
등산 초보도 환영해요. 등산화·물·간식만 챙겨오시면 돼요.` : '';
  const cap = isRangeError ? '150' : isMemberError ? '15' : (isFilled ? '25' : '');
  const cat = isFilled ? 'sport' : null;

  return (
    <Phone>
      <div className="phone-topbar">
        <div className="back close">{Icon.cross(22)}<span>닫기</span></div>
        <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
          <div style={{ fontSize: 'calc(16px * var(--app-fs-scale))', fontWeight: 700, letterSpacing: '-0.015em' }}>
            {isEdit ? '소모임 수정' : '소모임 개설'}
          </div>
        </div>
        <div className="actions" style={{ minWidth: 60, justifyContent: 'flex-end' }}>
          <div style={{
            padding: '6px 8px',
            fontSize: 'calc(14px * var(--app-fs-scale))', fontWeight: 700,
            color: isFilled ? 'var(--app-primary)' : 'var(--app-ink-hint)',
            cursor: isFilled ? 'pointer' : 'not-allowed',
          }}>완료</div>
        </div>
      </div>

      <div className="phone-body" style={{ padding: 0 }}>
        <Section2 label="카테고리" required>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '0 22px' }}>
            {GP_CATS.filter(c => c.key !== 'all').map(c => {
              const on = c.key === cat;
              return <span key={c.key} className={'chip' + (on ? ' on' : '')}>{c.label}</span>;
            })}
          </div>
        </Section2>

        <Divider/>

        <Section2 label="소모임명" required hint={`${name.length}/20`}>
          <input
            className="input"
            placeholder="소모임 이름을 입력해주세요 (최대 20자)"
            defaultValue={name}
            readOnly
            maxLength={20}
            style={{ margin: '0 22px', width: 'calc(100% - 44px)' }}
          />
        </Section2>

        <Divider/>

        <Section2 label="설명" required hint={`${desc.length}/200`}>
          <div style={{ padding: '0 22px' }}>
            <textarea
              className="input"
              placeholder="어떤 소모임인지, 어떻게 모이는지 알려주세요"
              defaultValue={desc}
              readOnly
              maxLength={200}
              rows={5}
              style={{ width: '100%', height: 'auto', padding: '12px 14px', resize: 'none', fontFamily: 'inherit', lineHeight: 1.6 }}
            />
          </div>
        </Section2>

        <Divider/>

        <Section2 label="최대인원" required>
          <div style={{ padding: '0 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input
                className="input"
                placeholder="숫자"
                defaultValue={cap}
                readOnly
                inputMode="numeric"
                style={{
                  width: 120, textAlign: 'center',
                  borderColor: (isRangeError || isMemberError) ? 'var(--app-danger)' : undefined,
                  background: (isRangeError || isMemberError) ? '#FDF4F1' : undefined,
                }}
              />
              <span style={{ fontSize: 'calc(14px * var(--app-fs-scale))', color: 'var(--app-ink-soft)' }}>명</span>
              <span className="t-xs" style={{ marginLeft: 'auto', color: 'var(--app-ink-mute)' }}>2~100명</span>
            </div>
            {isRangeError && <InlineError>2~100명 사이로 입력해주세요</InlineError>}
            {isMemberError && <InlineError>현재 멤버수(18명)보다 적게 설정할 수 없습니다</InlineError>}
          </div>
        </Section2>

        <div style={{
          margin: '22px 22px', padding: '14px 16px',
          borderRadius: 'var(--app-r-m)', background: 'var(--app-primary-soft)',
          display: 'flex', gap: 10,
        }}>
          <div style={{ color: 'var(--app-primary-deep)', flexShrink: 0, marginTop: 2 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity=".18"/><circle cx="12" cy="8" r="1.4"/><rect x="11" y="11" width="2" height="7" rx="1"/></svg>
          </div>
          <div className="t-sm" style={{ color: 'var(--app-primary-deep)', lineHeight: 1.55 }}>
            비슷한 목적의 소모임이 이미 있다면 기존 소모임 참여를 먼저 고려해주세요.
          </div>
        </div>
      </div>
    </Phone>
  );
}

// ─────────────────────────────────────────────────────────────
// 23. 공지 작성·수정 (FUNC-028~030)
//   variants: create | create-filled | edit | delete-confirm
// ─────────────────────────────────────────────────────────────
function ScreenGroupNotices({ variant = 'create' }) {
  const isEdit = variant === 'edit' || variant === 'delete-confirm';
  const isFilled = isEdit || variant === 'create-filled';
  const showDelete = variant === 'delete-confirm';

  const title = isFilled ? '5월 18일 토요일 모임 안내' : '';
  const body = isFilled ? `이번 주 토요일은 북한산 도선사 코스로 갑니다.
오전 7시 교회 앞에서 모이며, 등산 시간은 약 4시간 예상해요.

준비물:
- 등산화, 물 1L 이상
- 간단한 간식
- 우산 또는 우비 (오후 비 예보 있음)

문의는 단톡방으로 부탁드려요. 함께 오르며 좋은 시간 보내요!` : '';

  return (
    <Phone>
      <div className="phone-topbar">
        <div className="back close">{Icon.cross(22)}<span>닫기</span></div>
        <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
          <div style={{ fontSize: 'calc(16px * var(--app-fs-scale))', fontWeight: 700, letterSpacing: '-0.015em' }}>
            {isEdit ? '공지 수정' : '공지 작성'}
          </div>
        </div>
        <div className="actions" style={{ minWidth: 60, justifyContent: 'flex-end', gap: 4 }}>
          {isEdit && (
            <div style={{
              padding: '6px 8px',
              fontSize: 'calc(13px * var(--app-fs-scale))', fontWeight: 600,
              color: 'var(--app-danger)', cursor: 'pointer',
            }}>삭제</div>
          )}
          <div style={{
            padding: '6px 8px',
            fontSize: 'calc(14px * var(--app-fs-scale))', fontWeight: 700,
            color: isFilled ? 'var(--app-primary)' : 'var(--app-ink-hint)',
            cursor: isFilled ? 'pointer' : 'not-allowed',
          }}>{isEdit ? '저장' : '등록'}</div>
        </div>
      </div>

      <div className="phone-body" style={{ padding: 0 }}>
        <div style={{
          margin: '8px 22px 14px', padding: '12px 14px',
          borderRadius: 'var(--app-r-m)', background: 'var(--app-primary-soft)',
          display: 'flex', gap: 10,
        }}>
          <div style={{ color: 'var(--app-primary-deep)', flexShrink: 0, marginTop: 2 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity=".18"/><circle cx="12" cy="8" r="1.4"/><rect x="11" y="11" width="2" height="7" rx="1"/></svg>
          </div>
          <div className="t-sm" style={{ color: 'var(--app-primary-deep)', lineHeight: 1.55 }}>
            소모임 멤버에게만 공개됩니다.
          </div>
        </div>

        <Section2 label="제목" required hint={`${title.length}/30`}>
          <input
            className="input"
            placeholder="공지 제목 (최대 30자)"
            defaultValue={title}
            readOnly
            maxLength={30}
            style={{ margin: '0 22px', width: 'calc(100% - 44px)' }}
          />
        </Section2>

        <Divider/>

        <Section2 label="내용" required hint={`${body.length}/500`}>
          <div style={{ padding: '0 22px' }}>
            <textarea
              className="input"
              placeholder="공지 내용을 입력해주세요"
              defaultValue={body}
              readOnly
              maxLength={500}
              rows={10}
              style={{ width: '100%', height: 'auto', padding: '12px 14px', resize: 'none', fontFamily: 'inherit', lineHeight: 1.65 }}
            />
          </div>
        </Section2>
      </div>

      {showDelete && (
        <AlertDialog
          title="공지를 삭제하시겠습니까?"
          message="삭제한 공지는 복구할 수 없어요."
          cancelText="취소"
          confirmText="삭제"
          danger
        />
      )}
    </Phone>
  );
}

// ─────────────────────────────────────────────────────────────
// 24. 멤버 관리 (FUNC-027, 032)
//   variants: default | kick-confirm | kick-toast | transfer | transfer-confirm
// ─────────────────────────────────────────────────────────────
function ScreenGroupMembers({ variant = 'default' }) {
  const isTransfer = variant === 'transfer' || variant === 'transfer-confirm';
  const showKickConfirm = variant === 'kick-confirm';
  const showKickToast = variant === 'kick-toast';
  const showTransferConfirm = variant === 'transfer-confirm';

  const members = [
    { name: '김은혜', leader: true,  joined: '2024.03.12', me: true },
    { name: '박정아', joined: '2024.04.02' },
    { name: '이수진', joined: '2024.05.18' },
    { name: '김지영', joined: '2024.07.21' },
    { name: '정혜진', joined: '2024.09.04' },
    { name: '조미경', joined: '2024.11.10' },
    { name: '한유라', joined: '2025.01.22' },
    { name: '강민서', joined: '2025.03.05' },
  ];

  const total = members.length;
  const transferTarget = isTransfer ? '박정아' : null;

  return (
    <Phone>
      <TopBar
        title={isTransfer ? '소모임장 이관' : '멤버 관리'}
      />

      <div className="phone-body" style={{ padding: 0 }}>
        {isTransfer && (
          <div style={{
            margin: '4px 18px 14px', padding: '12px 14px',
            borderRadius: 'var(--app-r-m)', background: 'rgba(217,131,92,0.10)',
            color: '#A8643F', fontSize: 'calc(13px * var(--app-fs-scale))', lineHeight: 1.55,
            display: 'flex', gap: 10,
          }}>
            <div style={{ flexShrink: 0, marginTop: 2 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v4M12 17v.5"/>
                <path d="M10.6 3.6 2.4 18a1.6 1.6 0 0 0 1.4 2.4h16.4a1.6 1.6 0 0 0 1.4-2.4L13.4 3.6a1.6 1.6 0 0 0-2.8 0z"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              이관 후에는 일반 멤버로 변경되며 권한이 즉시 사라집니다.
            </div>
          </div>
        )}

        {!isTransfer && (
          <div style={{ padding: '8px 22px 6px', fontSize: 'calc(12px * var(--app-fs-scale))', color: 'var(--app-ink-mute)', fontWeight: 600 }}>
            전체 {total}명
          </div>
        )}

        {members.map((m, i) => {
          const isTransferCandidate = isTransfer && !m.leader;
          const isSelected = transferTarget && m.name === transferTarget;
          return (
            <div key={m.name} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 22px',
              borderBottom: i < members.length - 1 ? '1px solid var(--app-line)' : 'none',
              opacity: isTransfer && m.leader ? 0.4 : 1,
              background: isSelected ? 'var(--app-primary-soft)' : 'transparent',
              cursor: isTransferCandidate ? 'pointer' : 'default',
            }}>
              {isTransferCandidate && (
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: isSelected ? 'var(--app-primary)' : 'transparent',
                  border: isSelected ? '0' : '1.5px solid var(--app-line-strong)',
                  display: 'grid', placeItems: 'center',
                  flexShrink: 0,
                }}>
                  {isSelected && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }}/>}
                </div>
              )}
              <Avatar name={m.name} size={42} seed={m.name}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 'calc(14.5px * var(--app-fs-scale))' }}>{m.name}</span>
                  {m.me && <span className="t-xs" style={{ color: 'var(--app-primary-deep)', fontWeight: 700 }}>(나)</span>}
                  {m.leader && (
                    <span style={{
                      padding: '2px 8px', borderRadius: 999,
                      background: 'var(--app-primary)', color: '#fff',
                      fontSize: 'calc(10.5px * var(--app-fs-scale))', fontWeight: 700,
                      letterSpacing: '-0.01em',
                    }}>소모임장</span>
                  )}
                </div>
                <div className="t-sm" style={{ color: 'var(--app-ink-mute)', marginTop: 2 }}>{m.joined} 가입</div>
              </div>
              {!isTransfer && !m.leader && (
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  height: 32, padding: '0 12px',
                  borderRadius: 'var(--app-r-pill)',
                  background: 'rgba(201,124,110,0.10)',
                  border: 0, color: 'var(--app-danger)',
                  fontFamily: 'inherit', fontSize: 'calc(12px * var(--app-fs-scale))',
                  fontWeight: 700, cursor: 'pointer',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
                  강퇴
                </button>
              )}
            </div>
          );
        })}
      </div>

      {isTransfer && (
        <div className="bottom-bar">
          <button
            disabled={!transferTarget}
            style={{
              flex: 1, height: 48, border: 0,
              borderRadius: 'var(--app-r-pill)',
              background: transferTarget ? 'var(--app-primary)' : 'var(--app-line-strong)',
              color: '#fff',
              fontFamily: 'inherit', fontSize: 'calc(14px * var(--app-fs-scale))', fontWeight: 700,
              cursor: transferTarget ? 'pointer' : 'not-allowed',
            }}>
            이관하기
          </button>
        </div>
      )}

      {showKickConfirm && (
        <AlertDialog
          title="이수진님을 강퇴하시겠습니까?"
          message="강퇴된 멤버는 다시 신청할 수 없어요."
          cancelText="취소"
          confirmText="강퇴"
          danger
        />
      )}
      {showKickToast && <CheckToast offset={28}>이수진님이 강퇴되었습니다</CheckToast>}
      {showTransferConfirm && (
        <AlertDialog
          title="박정아님께 소모임장을 이관할까요?"
          message="이관 즉시 본인은 일반 멤버로 변경되며 되돌릴 수 없습니다."
          cancelText="취소"
          confirmText="이관"
        />
      )}
    </Phone>
  );
}

Object.assign(window, { ScreenGroupCreate, ScreenGroupNotices, ScreenGroupMembers });
