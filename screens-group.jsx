// 열린문 커넥트 — 소모임 목록 (FUNC-021) + 상세 (FUNC-022, 024~027, 031, 033)

const GP_CATS = [
  { key:'all',    label:'전체' },
  { key:'bible',  label:'성경공부·예배' },
  { key:'pray',   label:'기도모임' },
  { key:'volun',  label:'봉사' },
  { key:'hobby',  label:'취미·문화' },
  { key:'sport',  label:'운동·건강' },
  { key:'cell',   label:'목장' },
  { key:'mission',label:'선교' },
  { key:'etc',    label:'기타' },
];

// Cat colors for status badges
function recruitBadge(status) {
  if (status === 'open') return { label: '모집중', bg: 'rgba(143,168,130,0.20)', fg: '#4F6B45' };
  return { label: '모집완료', bg: 'rgba(30,41,32,0.06)', fg: 'var(--app-ink-mute)' };
}

const GP_LIST = [
  { id:1, name:'토요 산악회',     cat:'sport',  desc:'매주 토요일 함께 산을 오르며 자연을 느끼고 신앙을 나누는 모임입니다. 등산 초보도 환영해요.', cur:18, max:25, status:'open',   seed:0 },
  { id:2, name:'독서 나눔',       cat:'hobby',  desc:'매월 한 권의 책을 함께 읽고 나눠요. 신앙서부터 에세이까지 다양하게 선정합니다.', cur:12, max:15, status:'open',   seed:1 },
  { id:3, name:'엄마들의 수다방',  cat:'cell',   desc:'아이 키우는 엄마들이 일상과 신앙을 나누는 따뜻한 공간입니다.', cur:24, max:30, status:'open',   seed:3 },
  { id:4, name:'화요 새벽기도회', cat:'pray',   desc:'화요일 새벽 5시 30분, 함께 무릎 꿇는 자리. 한 주를 기도로 시작해요.', cur:32, max:50, status:'open',   seed:2 },
  { id:5, name:'어르신 돌봄 봉사', cat:'volun',  desc:'한 달에 두 번 인근 요양원을 방문해 어르신들과 시간을 보내요.', cur:8,  max:12, status:'open',   seed:4 },
  { id:6, name:'찬양 동아리',     cat:'hobby',  desc:'함께 찬양하고 연주하며 마음을 모아요. 매주 금요일 저녁 7시에 모입니다.', cur:15, max:15, status:'closed', seed:5 },
];

// ─────────────────────────────────────────────────────────────
// 20. 소모임 목록 (FUNC-021)
//   variants: all (default) | mine | mine-empty | network-error
// ─────────────────────────────────────────────────────────────
function ScreenGroupList({ variant = 'all' }) {
  const isMine = variant === 'mine' || variant === 'mine-empty';
  const isEmpty = variant === 'mine-empty';
  const isError = variant === 'network-error';

  const list = isError
    ? []
    : isMine
      ? (isEmpty ? [] : GP_LIST.filter(g => [1, 2, 3].includes(g.id)))
      : GP_LIST;

  return (
    <Phone>
      <div className="phone-topbar">
        <div style={{ flex: 1 }}>
          <div className="title">소모임</div>
        </div>
        <div className="actions">
          <div style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', color: 'var(--app-ink-soft)' }}>{Icon.search()}</div>
        </div>
      </div>

      {/* 상단 탭 */}
      <div style={{ padding: '4px 0 10px' }}>
        <SegTabs
          items={[{ key: 'all', label: '전체' }, { key: 'mine', label: '내 소모임' }]}
          active={isMine ? 'mine' : 'all'}
        />
      </div>

      {/* 카테고리 칩 */}
      <div style={{ padding: '0 0 6px' }}>
        <ChipRow items={GP_CATS} active="all"/>
      </div>

      <div className="phone-body" style={{ padding: 0 }}>
        {isError ? (
          <ErrorState/>
        ) : list.length === 0 ? (
          <EmptyMine/>
        ) : (
          <div style={{ padding: '6px 18px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {list.map(g => <GroupCard key={g.id} g={g}/>)}
          </div>
        )}
      </div>

      {/* FAB */}
      <button style={{
        position: 'absolute', right: 16, bottom: 90, zIndex: 20,
        height: 52, padding: '0 18px 0 16px',
        borderRadius: 'var(--app-r-pill)',
        background: 'var(--app-primary)', color: '#fff',
        display: 'flex', alignItems: 'center', gap: 8,
        border: 0, cursor: 'pointer',
        fontFamily: 'inherit', fontSize: 'calc(14px * var(--app-fs-scale))', fontWeight: 700,
        boxShadow: '0 10px 24px -8px rgba(91,122,176,0.5), 0 4px 8px -2px rgba(20,30,18,0.14)',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
        개설
      </button>

      <TabBar active="group"/>
    </Phone>
  );
}

function GroupCard({ g }) {
  const closed = g.status === 'closed';
  const badge = recruitBadge(g.status);
  const cat = GP_CATS.find(c => c.key === g.cat)?.label || '기타';
  return (
    <div className="card" style={{ padding: 16, opacity: closed ? 0.5 : 1, cursor: 'pointer' }}>
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: 12, marginBottom: 6,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: 700, fontSize: 'calc(17px * var(--app-fs-scale))',
            letterSpacing: '-0.015em', lineHeight: 1.3,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{g.name}</div>
        </div>
        <span style={{
          padding: '3px 10px', borderRadius: 999,
          background: badge.bg, color: badge.fg,
          fontSize: 'calc(11px * var(--app-fs-scale))', fontWeight: 700,
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>{badge.label}</span>
      </div>
      <span className="chip soft" style={{ padding: '4px 10px', fontSize: 'calc(11px * var(--app-fs-scale))' }}>{cat}</span>
      <div style={{
        marginTop: 10,
        fontSize: 'calc(13.5px * var(--app-fs-scale))',
        color: 'var(--app-ink-soft)', lineHeight: 1.55,
        overflow: 'hidden', textOverflow: 'ellipsis',
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
      }}>{g.desc}</div>
      <div style={{
        marginTop: 12, display: 'flex', alignItems: 'center', gap: 6,
        color: 'var(--app-ink-mute)', fontSize: 'calc(12.5px * var(--app-fs-scale))',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="9" r="3.2"/>
          <circle cx="17" cy="10" r="2.4"/>
          <path d="M3.5 19c.5-3 3-4.5 5.5-4.5s5 1.5 5.5 4.5"/>
        </svg>
        <span style={{ fontWeight: 600 }}>
          현재 <span style={{ color: 'var(--app-primary-deep)' }}>{g.cur}</span> / 최대 {g.max}
        </span>
      </div>
    </div>
  );
}

function EmptyMine() {
  return (
    <div style={{
      padding: '80px 32px 60px',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', textAlign: 'center',
    }}>
      <div style={{
        width: 96, height: 96, borderRadius: '50%',
        background: 'var(--app-surface-2)',
        display: 'grid', placeItems: 'center',
        marginBottom: 18, color: 'var(--app-ink-hint)',
      }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="9" r="4"/>
          <circle cx="17" cy="10" r="3"/>
          <path d="M3 20c.5-3.5 3-5.5 6-5.5s5.5 2 6 5.5"/>
          <path d="M15 18c.4-2 2-3.4 4-3.4 1.5 0 2.5 .8 3 2"/>
        </svg>
      </div>
      <div style={{ fontWeight: 700, fontSize: 'calc(15px * var(--app-fs-scale))', color: 'var(--app-ink-soft)' }}>
        참여 중인 소모임이 없습니다
      </div>
      <div className="t-sm" style={{ marginTop: 8, color: 'var(--app-ink-mute)', lineHeight: 1.55 }}>
        관심 가는 소모임을 찾아<br/>
        함께할 친구들을 만나보세요.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 21. 소모임 상세 (FUNC-022, 024, 025, 026, 027, 031, 033)
//   variants:
//     leader (default)    — 소모임장
//     leader-closed       — 소모임장 + 모집완료
//     member              — 일반 멤버
//     non-member          — 비멤버 (참여 신청 가능)
//     non-closed          — 비멤버 + 모집완료 (비활성)
//     apply-confirm       — 참여 신청 확인 팝업
//     full-toast          — 인원 초과 Toast
//     leave-confirm       — 탈퇴 확인 팝업
//     leader-leave-toast  — 소모임장 탈퇴 시도 Toast
//     delete-confirm      — 소모임 삭제 확인
//     deleted-exception   — 삭제된 소모임 예외
// ─────────────────────────────────────────────────────────────
function ScreenGroupDetail({ variant = 'leader' }) {
  if (variant === 'deleted-exception') {
    return <MarketException title="존재하지 않는 소모임입니다" sub="삭제되었거나 더 이상 접근할 수 없는 소모임이에요." />;
  }

  const isLeader = variant === 'leader' || variant === 'leader-closed' || variant === 'delete-confirm';
  const isMember = variant === 'member' || variant === 'leave-confirm' || variant === 'leader-leave-toast';
  const isNonMember = variant === 'non-member' || variant === 'non-closed' || variant === 'apply-confirm' || variant === 'full-toast';
  const isClosed = variant === 'leader-closed' || variant === 'non-closed';

  const showApplyConfirm = variant === 'apply-confirm';
  const showFullToast = variant === 'full-toast';
  const showLeaveConfirm = variant === 'leave-confirm';
  const showLeaderLeaveToast = variant === 'leader-leave-toast';
  const showDeleteConfirm = variant === 'delete-confirm';

  const group = {
    name: '토요 산악회',
    cat: 'sport',
    desc: `매주 토요일 함께 산을 오르며 자연을 느끼고 신앙을 나누는 모임입니다.
등산 초보도 환영해요. 등산화·물·간식만 챙겨오시면 돼요.
모임 일정과 코스는 매주 화요일 공지로 안내드립니다.`,
    cur: isClosed ? 25 : 18,
    max: 25,
    leader: '한지수',
    leaderTitle: isLeader ? '김은혜' : '한지수',
  };

  const members = [
    { name: isLeader ? '김은혜' : '한지수', leader: true },
    { name: '박정아' },
    { name: '이수진' },
    { name: '김지영' },
    { name: '정혜진' },
    { name: '조미경' },
  ];

  const notices = [
    { title: '5월 18일 토요일 모임 안내', preview: '이번 주 토요일은 북한산 도선사 코스로 갑니다. 오전 7시 교회 앞에서 모입니다.', when: '2일 전', edited: false },
    { title: '신규 멤버 환영합니다', preview: '이번 달에 새로 합류해주신 분들 진심으로 환영해요. 다음 모임 때 소개 시간이 있을 예정입니다.', when: '1주 전', edited: true },
  ];

  return (
    <Phone>
      <TopBar title="소모임"/>

      <div className="phone-body" style={{ padding: '0 0 16px' }}>
        {/* 헤더 */}
        <div style={{ padding: '4px 22px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span className="chip soft" style={{ padding: '4px 10px', fontSize: 'calc(11.5px * var(--app-fs-scale))' }}>
              {GP_CATS.find(c => c.key === group.cat)?.label}
            </span>
            <span style={{
              padding: '3px 10px', borderRadius: 999,
              background: recruitBadge(isClosed ? 'closed' : 'open').bg,
              color: recruitBadge(isClosed ? 'closed' : 'open').fg,
              fontSize: 'calc(11px * var(--app-fs-scale))', fontWeight: 700,
            }}>{recruitBadge(isClosed ? 'closed' : 'open').label}</span>
          </div>
          <div style={{
            fontWeight: 800, fontSize: 'calc(24px * var(--app-fs-scale))',
            letterSpacing: '-0.02em', lineHeight: 1.25,
          }}>{group.name}</div>

          <div style={{
            marginTop: 10, display: 'flex', alignItems: 'center', gap: 6,
            color: 'var(--app-ink-soft)', fontSize: 'calc(13.5px * var(--app-fs-scale))',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="9" r="3.2"/>
              <circle cx="17" cy="10" r="2.4"/>
              <path d="M3.5 19c.5-3 3-4.5 5.5-4.5s5 1.5 5.5 4.5"/>
            </svg>
            <span style={{ fontWeight: 600 }}>
              현재 <span style={{ color: 'var(--app-primary-deep)' }}>{group.cur}</span> / 최대 {group.max}
            </span>
          </div>

          <div style={{
            marginTop: 14,
            fontSize: 'calc(14px * var(--app-fs-scale))',
            color: 'var(--app-ink-soft)', lineHeight: 1.7,
            whiteSpace: 'pre-line',
          }}>{group.desc}</div>

          {/* 소모임장 */}
          <div style={{
            marginTop: 16, padding: '12px 14px',
            borderRadius: 'var(--app-r-m)', background: 'var(--app-surface-2)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <Avatar name={group.leaderTitle} size={36} seed={group.leaderTitle}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="t-xs" style={{ color: 'var(--app-ink-mute)' }}>소모임장</div>
              <div style={{ marginTop: 2, fontWeight: 700, fontSize: 'calc(14.5px * var(--app-fs-scale))' }}>{group.leaderTitle}</div>
            </div>
            <span style={{
              padding: '4px 10px', borderRadius: 999,
              background: 'var(--app-primary)', color: '#fff',
              fontSize: 'calc(10.5px * var(--app-fs-scale))', fontWeight: 700,
              letterSpacing: '-0.01em',
            }}>소모임장</span>
          </div>
        </div>

        {/* 권한별 액션 */}
        <div style={{ padding: '0 16px 22px' }}>
          {isLeader && (
            <div className="card" style={{ padding: 4, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <ActionBtn icon={<EditIcon/>} label="수정"/>
              <ActionBtn icon={<NoticeIcon/>} label="공지"/>
              <ActionBtn icon={<MembersIcon/>} label="멤버"/>
              <ActionBtn icon={<DeleteIcon/>} label="삭제" danger/>
            </div>
          )}
          {isMember && (
            <button style={{
              width: '100%', height: 52,
              borderRadius: 'var(--app-r-pill)',
              background: 'transparent',
              border: '1px solid var(--app-line-strong)',
              color: 'var(--app-ink-soft)',
              fontFamily: 'inherit',
              fontSize: 'calc(14px * var(--app-fs-scale))', fontWeight: 600,
              cursor: 'pointer',
            }}>탈퇴하기</button>
          )}
          {isNonMember && (
            <button
              disabled={isClosed}
              style={{
                width: '100%', height: 52,
                borderRadius: 'var(--app-r-pill)',
                background: isClosed ? 'var(--app-line-strong)' : 'var(--app-primary)',
                color: '#fff', border: 0,
                fontFamily: 'inherit',
                fontSize: 'calc(15px * var(--app-fs-scale))', fontWeight: 700,
                cursor: isClosed ? 'not-allowed' : 'pointer',
                opacity: isClosed ? 0.6 : 1,
                boxShadow: isClosed ? 'none' : '0 6px 14px -6px rgba(91,122,176,0.45)',
              }}>
              {isClosed ? '모집이 마감됐어요' : '참여 신청하기'}
            </button>
          )}
        </div>

        {/* 멤버 목록 */}
        <SectionHeader title={`멤버 ${members.length}명`}/>
        <div style={{ padding: '0 22px 12px' }}>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
            {members.map((m, i) => (
              <div key={i} style={{
                width: 56, display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 6, flexShrink: 0,
              }}>
                <div style={{ position: 'relative' }}>
                  <Avatar name={m.name} size={48} seed={m.name}/>
                  {m.leader && (
                    <div style={{
                      position: 'absolute', bottom: -2, right: -2,
                      width: 18, height: 18, borderRadius: '50%',
                      background: 'var(--app-primary)', color: '#fff',
                      display: 'grid', placeItems: 'center',
                      border: '2px solid var(--app-bg)',
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17l3-7 4 3 4-8 4 8 4-3-3 7H3z"/></svg>
                    </div>
                  )}
                </div>
                <span style={{
                  fontSize: 'calc(11.5px * var(--app-fs-scale))',
                  color: 'var(--app-ink-soft)', fontWeight: 600,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  maxWidth: 56, textAlign: 'center',
                }}>{m.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 공지사항 */}
        <SectionHeader title="공지사항"/>
        <div style={{ padding: '0 22px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {notices.map((n, i) => (
            <div key={i} className="card" style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 'calc(14.5px * var(--app-fs-scale))' }}>{n.title}</span>
                    {n.edited && <span className="t-xs" style={{ color: 'var(--app-ink-hint)' }}>수정됨</span>}
                  </div>
                  <div style={{
                    marginTop: 6,
                    fontSize: 'calc(13px * var(--app-fs-scale))',
                    color: 'var(--app-ink-soft)', lineHeight: 1.55,
                    overflow: 'hidden', textOverflow: 'ellipsis',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                  }}>{n.preview}</div>
                  <div className="t-xs" style={{ marginTop: 8 }}>{n.when}</div>
                </div>
              </div>
              {isLeader && (
                <div style={{ display: 'flex', gap: 14, marginTop: 8, paddingTop: 10, borderTop: '1px solid var(--app-line)' }}>
                  <CommentMiniAction icon={<EditIcon size={14}/>} label="수정"/>
                  <CommentMiniAction icon={<DeleteIcon size={14}/>} label="삭제" danger/>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Overlays */}
      {showApplyConfirm && (
        <AlertDialog
          title="참여 신청하시겠습니까?"
          message="신청 즉시 소모임에 가입됩니다."
          cancelText="취소"
          confirmText="신청"
        />
      )}
      {showLeaveConfirm && (
        <AlertDialog
          title="탈퇴하시겠습니까?"
          message="다시 참여하려면 신청을 새로 해야 해요."
          cancelText="취소"
          confirmText="탈퇴"
          danger
        />
      )}
      {showDeleteConfirm && (
        <AlertDialog
          title="소모임을 삭제하시겠습니까?"
          message={'소모임을 삭제하면 모든 멤버가 퇴장됩니다.\n이 작업은 되돌릴 수 없어요.'}
          cancelText="취소"
          confirmText="삭제"
          danger
        />
      )}
      {showFullToast && <CheckToast offset={28}>인원이 꽉 찼습니다</CheckToast>}
      {showLeaderLeaveToast && <CheckToast offset={28}>소모임장은 탈퇴할 수 없어요. 먼저 이관해주세요</CheckToast>}
    </Phone>
  );
}

function SectionHeader({ title, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 22px 12px',
    }}>
      <div style={{ fontWeight: 700, fontSize: 'calc(15px * var(--app-fs-scale))', letterSpacing: '-0.01em' }}>{title}</div>
      {right}
    </div>
  );
}

function NoticeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4v14l-7-3H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h8z"/>
    </svg>
  );
}
function MembersIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="3.2"/>
      <circle cx="17" cy="10" r="2.4"/>
      <path d="M3.5 19c.5-3 3-4.5 5.5-4.5s5 1.5 5.5 4.5"/>
    </svg>
  );
}

Object.assign(window, {
  ScreenGroupList, ScreenGroupDetail,
  GP_CATS, GP_LIST, recruitBadge,
  NoticeIcon, MembersIcon,
});
