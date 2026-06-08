// 열린문 커넥트 — 나눔 목록 (FUNC-010) + 상세 (FUNC-011, 013, 014, 015, 019, 020)

const MK_CATS = [
  { key:'all', label:'전체' },
  { key:'cloth', label:'의류·잡화' },
  { key:'home', label:'가전·가구' },
  { key:'book', label:'도서·문구' },
  { key:'food', label:'식품·생필품' },
  { key:'baby', label:'유아·아동용품' },
  { key:'sport', label:'스포츠·취미' },
  { key:'etc', label:'기타' },
];

// 상태 필터 탭 — 뱃지 용어와 일치
const MK_STATUS_TABS = [
  { key:'all',      label:'전체' },
  { key:'sharing',  label:'나눔중' },
  { key:'reserved', label:'예약중' },
  { key:'done',     label:'나눔완료' },
];

// Sample posts (shared with detail)
const MK_POSTS = [
  { id:1, thumb:0, title:'아이 장난감 정리하면서 나눔합니다 (블록·인형 30점)', author:'박정아', when:'1시간 전', status:'sharing', cat:'baby' },
  { id:2, thumb:1, title:'토스터기·전기주전자 세트 나눔해요', author:'이수진', when:'3시간 전', status:'reserved', cat:'home' },
  { id:3, thumb:2, title:'유아용 카시트 (사용감 있음)', author:'김지영', when:'어제', status:'sharing', cat:'baby' },
  { id:4, thumb:3, title:'어린이 동화책 30권 묶음 나눔', author:'정혜진', when:'어제', status:'sharing', cat:'book' },
  { id:5, thumb:4, title:'도자기 다세트 (몇 개 파손 있음)', author:'조미경', when:'2일 전', status:'done', cat:'home' },
  { id:6, thumb:5, title:'아기 가을 옷 (90사이즈)', author:'한유라', when:'3일 전', status:'sharing', cat:'cloth' },
];

function StatusBadge({ status, size = 'sm' }) {
  if (status === 'sharing') return null;
  const cfg = status === 'reserved'
    ? { bg: '#E89A3C', fg: '#fff', label: '예약중' }
    : { bg: 'rgba(20,30,18,0.88)', fg: '#fff', label: '나눔완료' };
  const pad = size === 'lg' ? '5px 12px' : '4px 9px';
  const fs = size === 'lg' ? 'calc(13px * var(--app-fs-scale))' : 'calc(11.5px * var(--app-fs-scale))';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: pad, borderRadius: 6,
      background: cfg.bg, color: cfg.fg,
      fontSize: fs, fontWeight: 700, letterSpacing: '-0.01em',
      whiteSpace: 'nowrap',
      boxShadow: '0 2px 6px -2px rgba(20,30,18,0.25)',
    }}>{cfg.label}</span>
  );
}

// ─────────────────────────────────────────────────────────────
// 14. 나눔 목록 (FUNC-010)
//    variants: default | tab-all | tab-reserved | tab-done | empty | network-error
//      default      — '나눔중' 탭 활성 (기본)
//      tab-all      — '전체' 탭 (나눔완료 포함)
//      tab-reserved — '예약중' 탭
//      tab-done     — '나눔완료' 탭
// ─────────────────────────────────────────────────────────────
function ScreenMarketList({ variant = 'default' }) {
  const isEmpty = variant === 'empty';
  const isError = variant === 'network-error';

  // 활성 상태 탭 결정
  const activeStatus =
    variant === 'tab-all'      ? 'all'
    : variant === 'tab-reserved' ? 'reserved'
    : variant === 'tab-done'     ? 'done'
    : 'sharing'; // default

  const list = isEmpty || isError
    ? []
    : activeStatus === 'all'
      ? MK_POSTS
      : MK_POSTS.filter(p => p.status === activeStatus);

  return (
    <Phone>
      <div className="phone-topbar">
        <div style={{ flex: 1 }}>
          <div className="title">나눔</div>
        </div>
      </div>

      {/* 상태 필터 탭 */}
      <div style={{ padding: '4px 0 10px' }}>
        <SegTabs items={MK_STATUS_TABS} active={activeStatus}/>
      </div>

      {/* 카테고리 칩 */}
      <div style={{ padding: '0 0 6px' }}>
        <ChipRow items={MK_CATS} active="all"/>
      </div>

      {/* List body */}
      <div className="phone-body" style={{ padding: 0 }}>
        {isError ? (
          <ErrorState/>
        ) : list.length === 0 ? (
          <EmptyMarketList status={isEmpty ? null : activeStatus}/>
        ) : (
          <div style={{ padding: '0 0 12px' }}>
            {list.map((p, i) => (
              <PostCard key={p.id} post={p} last={i === list.length - 1}/>
            ))}
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
        글쓰기
      </button>

      <TabBar active="market"/>
    </Phone>
  );
}

function PostCard({ post, last }) {
  const isDone = post.status === 'done';
  const isReserved = post.status === 'reserved';
  return (
    <div style={{
      display: 'flex', gap: 14,
      padding: '14px 22px',
      borderBottom: last ? 'none' : '1px solid var(--app-line)',
      cursor: 'pointer',
    }}>
      <div style={{ position: 'relative', flexShrink: 0, width: 86, height: 86, borderRadius: 'var(--app-r-m)', overflow: 'hidden' }}>
        <Thumb size={86} seed={post.thumb}/>
        {/* 나눔완료: 어두운 오버레이 + 중앙 라벨 */}
        {isDone && (
          <>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(20,30,18,0.55)',
            }}/>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'grid', placeItems: 'center',
              color: '#fff', fontWeight: 800,
              fontSize: 'calc(14px * var(--app-fs-scale))',
              letterSpacing: '-0.01em',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}>나눔완료</div>
          </>
        )}
        {/* 예약중: 좌상단 뱃지 */}
        {isReserved && (
          <div style={{ position: 'absolute', top: 6, left: 6 }}>
            <StatusBadge status="reserved"/>
          </div>
        )}
      </div>
      <div style={{
        flex: 1, minWidth: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        opacity: isDone ? 0.55 : 1,
      }}>
        <div style={{
          fontSize: 'calc(14.5px * var(--app-fs-scale))',
          fontWeight: 600, lineHeight: 1.4,
          color: isDone ? 'var(--app-ink-soft)' : 'var(--app-ink)',
          textDecoration: isDone ? 'none' : 'none',
          overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>{post.title}</div>
        <div className="t-sm" style={{ color: 'var(--app-ink-mute)', marginTop: 6 }}>
          {post.author} · {post.when}
        </div>
      </div>
    </div>
  );
}

function EmptyMarketList({ status }) {
  // 탭별 안내 문구
  const cfg = status === 'reserved' ? {
    title: '예약중인 나눔이 없어요',
    sub: '관심 있는 나눔이 있다면\n댓글로 먼저 연락해보세요.',
  } : status === 'done' ? {
    title: '아직 완료된 나눔이 없어요',
    sub: '완료된 나눔은 이곳에서\n다시 확인할 수 있어요.',
  } : status === 'sharing' ? {
    title: '진행 중인 나눔이 없어요',
    sub: '첫 나눔을 시작해보세요.\n받는 분께 사랑을 전할 수 있어요.',
  } : {
    title: '아직 나눔 게시글이 없습니다',
    sub: '첫 나눔을 시작해보세요.\n받는 분께 사랑을 전할 수 있어요.',
  };
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
          <rect x="4" y="6" width="16" height="14" rx="2"/>
          <path d="M9 10c1 1.5 5 1.5 6 0M9 14c1 1 5 1 6 0"/>
        </svg>
      </div>
      <div style={{ fontWeight: 700, fontSize: 'calc(15px * var(--app-fs-scale))', color: 'var(--app-ink-soft)' }}>
        {cfg.title}
      </div>
      <div className="t-sm" style={{ marginTop: 8, color: 'var(--app-ink-mute)', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
        {cfg.sub}
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div style={{
      padding: '80px 32px 60px',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', textAlign: 'center',
    }}>
      <div style={{
        width: 84, height: 84, borderRadius: '50%',
        background: 'rgba(201,124,110,0.12)',
        display: 'grid', placeItems: 'center',
        marginBottom: 18, color: 'var(--app-danger)',
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 1 1-3-6.7"/>
          <path d="M21 4v5h-5"/>
        </svg>
      </div>
      <div style={{ fontWeight: 700, fontSize: 'calc(15px * var(--app-fs-scale))', color: 'var(--app-ink-soft)' }}>
        불러오는 중 문제가 발생했어요
      </div>
      <div className="t-sm" style={{ marginTop: 8, color: 'var(--app-ink-mute)', lineHeight: 1.55 }}>
        네트워크 연결을 확인하고<br/>다시 시도해주세요.
      </div>
      <button style={{
        marginTop: 22, height: 44, padding: '0 28px',
        borderRadius: 'var(--app-r-pill)',
        background: 'var(--app-primary-soft)',
        color: 'var(--app-primary-deep)',
        border: 0, cursor: 'pointer',
        fontFamily: 'inherit', fontSize: 'calc(13px * var(--app-fs-scale))', fontWeight: 700,
      }}>
        재시도
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 15. 나눔 게시글 상세 (FUNC-011, 013, 014, 015, 019, 020)
//    variants:
//      own         — 본인 (나눔중)
//      own-done    — 본인 (나눔완료) — 흐림 + 삭제만
//      other       — 타인
//      deleted     — 삭제된 게시글
//      blocked     — 차단한 성도 게시글
//      status      — 상태 변경 바텀시트 오버레이
//      report      — 신고 바텀시트 오버레이
//      report-other-input — 신고에서 '기타' 선택 시 입력 영역
//      report-dup-toast   — 중복 신고 Toast
//      delete-confirm     — 삭제 확인 다이얼로그
// ─────────────────────────────────────────────────────────────
function ScreenMarketDetail({ variant = 'own' }) {
  // Exception screens
  if (variant === 'deleted') {
    return <MarketException title="존재하지 않는 게시글입니다" sub="삭제되었거나 더 이상 접근할 수 없는 게시글이에요." />;
  }
  if (variant === 'blocked') {
    return <MarketException title="확인할 수 없는 게시글입니다" sub="차단한 사용자의 게시글은 볼 수 없어요." />;
  }

  const isOwn = variant === 'own' || variant === 'own-reserved' || variant === 'own-done' || variant === 'status' || variant === 'delete-confirm';
  const isReserved = variant === 'own-reserved';
  const isDone = variant === 'own-done';
  const isOther = variant === 'other' || variant === 'report' || variant === 'report-other-input' || variant === 'report-dup-toast';
  const showStatusSheet = variant === 'status';
  const showReportSheet = variant === 'report' || variant === 'report-other-input';
  const showReportInput = variant === 'report-other-input';
  const showReportDupToast = variant === 'report-dup-toast';
  const showDeleteConfirm = variant === 'delete-confirm';
  const composerMultiline = variant === 'composer-multiline';

  return (
    <Phone>
      {/* 상단 그라데이션 스크림 — 뒤로가기 가독성 확보 */}
      <div style={{
        position: 'absolute', top: 44, left: 0, right: 0, height: 130, zIndex: 4,
        background: 'linear-gradient(180deg, rgba(20,30,18,0.42) 0%, rgba(20,30,18,0.18) 55%, rgba(20,30,18,0) 100%)',
        pointerEvents: 'none',
      }}/>

      <div className="phone-topbar" style={{
        position: 'absolute', top: 64, left: 0, right: 0, zIndex: 5,
        background: 'transparent',
      }}>
        <div className="back" style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(8px)',
          color: 'var(--app-ink)',
          boxShadow: '0 2px 8px -2px rgba(20,30,18,0.18)',
        }}>{Icon.back()}<span>뒤로</span></div>
      </div>

      <div className="phone-body" style={{
        padding: 0, paddingBottom: 96,
      }}>
        {/* 사진 슬라이더 (정사각형) */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', background: '#E2DED3' }}>
          <Thumb size={360} seed={0} style={{ width: '100%', height: '100%', borderRadius: 0 }}/>
          {/* 나눔완료: 어두운 오버레이 */}
          {isDone && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(20,30,18,0.45)',
            }}/>
          )}
          {/* 페이지 인디케이터 */}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 12,
            display: 'flex', justifyContent: 'center', gap: 6,
          }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: i === 0 ? 18 : 6, height: 6, borderRadius: 3,
                background: i === 0 ? '#fff' : 'rgba(255,255,255,0.6)',
                transition: 'all 200ms',
              }}/>
            ))}
          </div>
          {/* 상태 배지 — 예약중 (중앙) */}
          {isReserved && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'grid', placeItems: 'center',
              pointerEvents: 'none',
            }}>
              <div style={{
                padding: '10px 22px',
                borderRadius: 12,
                background: '#E89A3C',
                color: '#fff',
                fontWeight: 800,
                fontSize: 'calc(20px * var(--app-fs-scale))',
                letterSpacing: '-0.01em',
                boxShadow: '0 6px 20px -4px rgba(20,30,18,0.35), 0 2px 4px rgba(20,30,18,0.18)',
              }}>예약중</div>
            </div>
          )}
          {/* 나눔완료: 중앙 큰 라벨 */}
          {isDone && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'grid', placeItems: 'center',
              color: '#fff', fontWeight: 800,
              fontSize: 'calc(34px * var(--app-fs-scale))',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 8px rgba(0,0,0,0.35)',
              pointerEvents: 'none',
            }}>나눔완료</div>
          )}
        </div>

        {/* 상태 안내 배너 */}
        {isReserved && (
          <div style={{
            margin: '14px 16px 0', padding: '12px 14px',
            borderRadius: 'var(--app-r-m)',
            background: 'rgba(232,154,60,0.12)',
            border: '1px solid rgba(232,154,60,0.32)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: '#E89A3C',
              display: 'grid', placeItems: 'center',
              color: '#fff', flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 7v5l3 2"/>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 'calc(13.5px * var(--app-fs-scale))', color: '#8A5A1F' }}>
                예약중인 나눔입니다
              </div>
              <div style={{ fontSize: 'calc(12px * var(--app-fs-scale))', color: '#A87B3A', marginTop: 2 }}>
                다른 분과 수령 약속이 진행 중이에요
              </div>
            </div>
          </div>
        )}
        {isDone && (
          <div style={{
            margin: '14px 16px 0', padding: '12px 14px',
            borderRadius: 'var(--app-r-m)',
            background: 'var(--app-surface-2)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: 'rgba(20,30,18,0.85)',
              display: 'grid', placeItems: 'center',
              color: '#fff', flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7"/>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 'calc(13.5px * var(--app-fs-scale))', color: 'var(--app-ink)' }}>
                나눔이 완료되었습니다
              </div>
              <div style={{ fontSize: 'calc(12px * var(--app-fs-scale))', color: 'var(--app-ink-mute)', marginTop: 2 }}>
                이 게시글은 더 이상 신청할 수 없어요
              </div>
            </div>
          </div>
        )}

        <div style={{ opacity: isDone ? 0.6 : 1 }}>
        {/* 작성자 */}
        <div style={{ padding: '16px 22px 6px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name="박정아" size={40} seed="박정아"/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 'calc(15px * var(--app-fs-scale))' }}>
              {isOwn ? '김은혜' : '박정아'}
            </div>
            <div className="t-sm" style={{ color: 'var(--app-ink-mute)', marginTop: 2 }}>
              1시간 전
            </div>
          </div>
        </div>

        {/* 카테고리 + 제목 + 물품 상태 */}
        <div style={{ padding: '8px 22px 4px' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            <span className="chip soft">유아·아동용품</span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '6px 12px', borderRadius: 999,
              background: 'rgba(143,168,130,0.16)',
              color: '#4F6B45',
              fontSize: 'calc(12px * var(--app-fs-scale))', fontWeight: 600,
            }}>사용감 있음</span>
          </div>
          <div style={{
            fontWeight: 700, fontSize: 'calc(20px * var(--app-fs-scale))',
            letterSpacing: '-0.015em', lineHeight: 1.35,
          }}>
            아이 장난감 정리하면서 나눔합니다 (블록·인형 30점)
          </div>
        </div>

        {/* 본문 */}
        <div style={{
          padding: '16px 22px 22px',
          fontSize: 'calc(14.5px * var(--app-fs-scale))',
          lineHeight: 1.7, color: 'var(--app-ink-soft)',
          whiteSpace: 'pre-line',
        }}>{`아이가 커서 더 이상 쓰지 않는 장난감 정리해요.
대부분 깨끗하게 사용한 것들이고, 블록류 20점 + 인형류 10점 정도 됩니다.
필요하신 분께 무료로 드려요!

수령은 토요일 오후 교회 1층 로비에서 가능합니다.
한 분께 일괄로 드리려고 합니다.`}
        </div>

        {/* 권한별 액션 */}
        <div style={{
          margin: '0 16px 22px', padding: '4px',
          borderRadius: 'var(--app-r-l)', background: 'var(--app-surface)',
          display: 'flex', boxShadow: 'var(--app-shadow-card)',
        }}>
          {isOwn && !isDone && (
            <>
              <ActionBtn icon={<EditIcon/>}    label="수정" />
              <ActionBtn icon={<DeleteIcon/>}  label="삭제" danger />
              <ActionBtn icon={<ChangeIcon/>}  label="상태 변경" />
            </>
          )}
          {isOwn && isDone && (
            <ActionBtn icon={<DeleteIcon/>} label="삭제" danger full />
          )}
          {isOther && (
            <>
              <ActionBtn icon={<ReportIcon/>} label="신고" />
              <ActionBtn icon={<BlockIcon size={18}/>} label="차단" danger />
            </>
          )}
        </div>

        {/* 댓글 섹션 */}
        <CommentsSection isOwn={isOwn}/>
        </div>
      </div>

      {/* 하단 고정 댓글 입력 */}
      {composerMultiline ? (
        <CommentComposer
          multiline
          value={`혹시 토요일 외에 다른 요일도 가능할까요?\n저희가 토요일은 봉사 일정이 있어서요.\n가능한 시간 알려주시면 맞춰서 찾아뵐게요!`}
          count={74}
        />
      ) : (
        <CommentComposer />
      )}

      {/* Overlays */}
      {showStatusSheet && (
        <RadioSheet
          title="상태 변경"
          value="sharing"
          options={[
            { value: 'sharing',  label: '나눔중', disabled: true },
            { value: 'reserved', label: '예약중' },
            { value: 'done',     label: '나눔완료' },
          ]}
          hint="상태는 되돌릴 수 없습니다 (나눔중 → 예약중 → 나눔완료)"
          cancelText="취소"
          confirmText="확인"
        />
      )}

      {showReportSheet && (
        <ReportSheet showOtherInput={showReportInput}/>
      )}

      {showDeleteConfirm && (
        <AlertDialog
          title="게시글을 삭제하시겠습니까?"
          message="삭제하면 댓글을 포함한 모든 내용이 사라지며 복구할 수 없어요."
          cancelText="취소"
          confirmText="삭제"
          danger
        />
      )}

      {showReportDupToast && (
        <CheckToast offset={106}>이미 신고한 게시글입니다</CheckToast>
      )}
    </Phone>
  );
}

function ActionBtn({ icon, label, danger, full }) {
  return (
    <button style={{
      flex: full ? 'none' : 1,
      width: full ? '100%' : undefined,
      height: 44, border: 0,
      background: 'transparent',
      color: danger ? 'var(--app-danger)' : 'var(--app-ink)',
      fontFamily: 'inherit',
      fontSize: 'calc(13.5px * var(--app-fs-scale))', fontWeight: 600,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      cursor: 'pointer',
      borderRadius: 'var(--app-r-m)',
    }}>
      {icon}
      {label}
    </button>
  );
}

function EditIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 5l5 5L8 21H3v-5z"/>
      <path d="M12.5 6.5l5 5"/>
    </svg>
  );
}
function DeleteIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>
    </svg>
  );
}
function ChangeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h11M4 7l4-4M4 7l4 4"/>
      <path d="M20 17H9M20 17l-4-4M20 17l-4 4"/>
    </svg>
  );
}
function ReportIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21V4L18 4L14 9l4 5H5"/>
    </svg>
  );
}

// ─── 댓글 ───
function CommentsSection({ isOwn }) {
  const comments = [
    { author:'이수진', when:'30분 전', text:'필요해요! 토요일에 들를게요. 연락드릴게요 :)', self: !isOwn, edited: false, deleted: false },
    { author:'김지영', when:'25분 전', text:'좋은 나눔 감사해요. 저도 비슷한 시기에 정리했는데 도움이 많이 됐어요!', self: false, edited: true, deleted: false },
    { author:'정혜진', when:'20분 전', text:'', self: false, deleted: true },
    { author:'한유라', when:'10분 전', text:'아직 남아있을까요? 늦었지만 가능하면 부탁드려요 🙏', self: isOwn, edited: false, deleted: false },
  ];
  return (
    <div style={{ padding: '4px 22px 12px' }}>
      <div style={{
        fontSize: 'calc(13px * var(--app-fs-scale))',
        fontWeight: 700, color: 'var(--app-ink-mute)',
        marginBottom: 4, padding: '8px 0',
      }}>댓글 {comments.filter(c => !c.deleted).length}개</div>

      {comments.map((c, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, padding: '12px 0', borderBottom: i < comments.length - 1 ? '1px solid var(--app-line)' : 'none' }}>
          <Avatar name={c.author} size={32} seed={c.author}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 'calc(13.5px * var(--app-fs-scale))' }}>{c.author}</span>
              <span className="t-xs">{c.when}</span>
              {c.edited && <span className="t-xs" style={{ color: 'var(--app-ink-hint)' }}>· 수정됨</span>}
            </div>
            {c.deleted ? (
              <div style={{
                marginTop: 4,
                fontSize: 'calc(13.5px * var(--app-fs-scale))',
                color: 'var(--app-ink-hint)', fontStyle: 'italic',
              }}>삭제된 댓글입니다</div>
            ) : (
              <>
                <div style={{
                  marginTop: 4,
                  fontSize: 'calc(13.5px * var(--app-fs-scale))',
                  lineHeight: 1.5, color: 'var(--app-ink)',
                }}>{c.text}</div>
                <div style={{ marginTop: 6, display: 'flex', gap: 12 }}>
                  {c.self ? (
                    <>
                      <CommentMiniAction icon={<EditIcon size={14}/>} label="수정"/>
                      <CommentMiniAction icon={<DeleteIcon size={14}/>} label="삭제" danger/>
                    </>
                  ) : (
                    <CommentMiniAction icon={<ReportIcon size={14}/>} label="신고"/>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function CommentMiniAction({ icon, label, danger }) {
  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: 0, border: 0, background: 'transparent',
      color: danger ? 'var(--app-danger)' : 'var(--app-ink-mute)',
      fontFamily: 'inherit',
      fontSize: 'calc(12px * var(--app-fs-scale))', fontWeight: 600,
      cursor: 'pointer',
    }}>
      {icon}
      {label}
    </button>
  );
}

function CommentComposer({ value = '', count = 0, multiline = false }) {
  const hasText = !!value;
  const showPreview = multiline && hasText; // 알약 위쪽 미리보기 카드는 멀티라인일 때만
  const atLimit = count >= 300;
  return (
    <>
      {showPreview && (
        <div style={{
          position: 'absolute',
          left: 14, right: 14, bottom: 84, // 알약(bottom:14, height:56) 위 14px 갭
          zIndex: 29,
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(14px) saturate(180%)',
          WebkitBackdropFilter: 'blur(14px) saturate(180%)',
          border: '1px solid var(--app-line)',
          borderRadius: 16,
          padding: '14px 16px 24px',
          boxShadow:
            '0 14px 32px -10px rgba(20, 30, 18, 0.22),' +
            ' 0 2px 6px -2px rgba(20, 30, 18, 0.10),' +
            ' 0 0 0 1px rgba(20, 30, 18, 0.04)',
        }}>
          <div style={{
            fontFamily: 'inherit',
            fontSize: 'calc(14px * var(--app-fs-scale))',
            lineHeight: 1.55,
            color: 'var(--app-ink)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxHeight: 160, // ~7줄. 그 이상은 내부 스크롤
            overflowY: 'auto',
          }}>{value}</div>
          <span style={{
            position: 'absolute', right: 14, bottom: 8,
            fontSize: 'calc(11px * var(--app-fs-scale))',
            color: atLimit ? 'var(--app-warn)' : 'var(--app-ink-hint)',
            fontWeight: 600,
            fontVariantNumeric: 'tabular-nums',
            pointerEvents: 'none',
          }}>{count}/300</span>
          {/* 알약과 시각적으로 잇는 작은 꼬리 */}
          <div aria-hidden style={{
            position: 'absolute', left: 24, bottom: -6, width: 12, height: 12,
            background: 'rgba(255,255,255,0.96)',
            borderRight: '1px solid var(--app-line)',
            borderBottom: '1px solid var(--app-line)',
            transform: 'rotate(45deg)',
          }}/>
        </div>
      )}

      <div className="bottom-bar" style={{ padding: 8, gap: 8 }}>
        <div style={{
          flex: 1, position: 'relative',
          display: 'flex', alignItems: 'center',
          height: 44, padding: '0 14px',
          borderRadius: 'var(--app-r-pill)',
          background: 'rgba(20,30,18,0.05)',
          minWidth: 0,
        }}>
          {showPreview ? (
            <div style={{
              flex: 1, minWidth: 0,
              fontFamily: 'inherit',
              fontSize: 'calc(14px * var(--app-fs-scale))',
              color: 'var(--app-ink-soft)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              direction: 'rtl', // 끝부터 보이게 (마지막 입력 부분)
              textAlign: 'left',
            }}>
              {/* 줄바꿈을 공백으로 합쳐 한 줄로, 끝부터 보이게 */}
              <span style={{ unicodeBidi: 'plaintext' }}>
                {value.replace(/\n+/g, ' · ')}
              </span>
            </div>
          ) : (
            <input
              placeholder="댓글을 입력해주세요"
              defaultValue={value}
              readOnly
              style={{
                flex: 1, minWidth: 0, height: '100%', border: 0,
                background: 'transparent', outline: 'none',
                fontFamily: 'inherit',
                fontSize: 'calc(14px * var(--app-fs-scale))',
                color: 'var(--app-ink)',
              }}
            />
          )}
          {showPreview && (
            <span style={{
              fontSize: 'calc(11px * var(--app-fs-scale))',
              color: 'var(--app-ink-hint)', fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
              marginLeft: 10, flexShrink: 0,
            }}>{count}/300</span>
          )}
        </div>
        <button
          disabled={!hasText}
          style={{
            height: 44, padding: '0 16px',
            borderRadius: 'var(--app-r-pill)',
            background: hasText ? 'var(--app-primary)' : 'rgba(20,30,18,0.06)',
            color: hasText ? '#fff' : 'var(--app-ink-hint)',
            border: 0, cursor: hasText ? 'pointer' : 'default',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            fontFamily: 'inherit',
            fontSize: 'calc(14px * var(--app-fs-scale))', fontWeight: 700,
            letterSpacing: '-0.01em',
            transition: 'background 160ms ease, color 160ms ease',
          }}
        >
          등록
        </button>
      </div>
    </>
  );
}

// ─── 예외 화면 ───
function MarketException({ title, sub }) {
  return (
    <Phone>
      <TopBar title="나눔"/>
      <div className="phone-body" style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 32px', textAlign: 'center',
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'var(--app-surface-2)',
          display: 'grid', placeItems: 'center',
          marginBottom: 22, color: 'var(--app-ink-hint)',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 8v5M12 16.5v.5"/>
          </svg>
        </div>
        <div style={{ fontWeight: 700, fontSize: 'calc(17px * var(--app-fs-scale))', letterSpacing: '-0.015em' }}>
          {title}
        </div>
        <div className="t-sm" style={{ marginTop: 10, color: 'var(--app-ink-mute)', lineHeight: 1.6 }}>
          {sub}
        </div>
        <button style={{
          marginTop: 22, height: 44, padding: '0 28px',
          borderRadius: 'var(--app-r-pill)',
          background: 'var(--app-primary-soft)',
          color: 'var(--app-primary-deep)',
          border: 0, cursor: 'pointer',
          fontFamily: 'inherit', fontSize: 'calc(13px * var(--app-fs-scale))', fontWeight: 700,
        }}>목록으로 돌아가기</button>
      </div>
    </Phone>
  );
}

// ─── 신고 시트 (FUNC-019) ───
const REPORT_REASONS = [
  '금지 품목 게시',
  '허위 물품 정보',
  '금전 요구·암묵적 거래 유도',
  '동일 물품 중복 게시',
  '타인 사진 무단 도용',
  '나눔을 빙자한 홍보·광고',
  '욕설·혐오 표현',
  '기타',
];

function ReportSheet({ showOtherInput }) {
  const selected = showOtherInput ? '기타' : '허위 물품 정보';
  return (
    <BottomSheet
      title="신고"
      footer={(
        <>
          <button style={{
            flex: 1, height: 48, border: 0, borderRadius: 'var(--app-r-pill)',
            background: 'var(--app-surface)',
            color: 'var(--app-ink-soft)',
            fontFamily: 'inherit', fontSize: 'calc(14px * var(--app-fs-scale))',
            fontWeight: 600, cursor: 'pointer',
          }}>취소</button>
          <button style={{
            flex: 1, height: 48, border: 0, borderRadius: 'var(--app-r-pill)',
            background: 'var(--app-danger)',
            color: '#fff',
            fontFamily: 'inherit', fontSize: 'calc(14px * var(--app-fs-scale))',
            fontWeight: 700, cursor: 'pointer',
          }}>신고하기</button>
        </>
      )}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {REPORT_REASONS.map((r, i) => {
          const on = r === selected;
          return (
            <div key={r} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 4px',
              borderBottom: i < REPORT_REASONS.length - 1 ? '1px solid var(--app-line)' : 'none',
              cursor: 'pointer',
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                background: on ? 'var(--app-primary)' : 'transparent',
                border: on ? '0' : '1.5px solid var(--app-line-strong)',
                display: 'grid', placeItems: 'center',
                flexShrink: 0,
              }}>
                {on && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }}/>}
              </div>
              <div style={{ fontSize: 'calc(14px * var(--app-fs-scale))', fontWeight: on ? 700 : 500 }}>{r}</div>
            </div>
          );
        })}
      </div>

      {showOtherInput && (
        <div style={{ marginTop: 14 }}>
          <textarea
            rows={4}
            className="input"
            readOnly
            defaultValue="홍보성 글 같아요. 같은 사진을 여러 번 올리는 것 같습니다."
            style={{
              padding: '12px 14px', resize: 'none', fontFamily: 'inherit',
              height: 'auto', lineHeight: 1.5,
            }}
          />
        </div>
      )}

      <div style={{
        marginTop: 12, padding: '10px 12px',
        borderRadius: 'var(--app-r-m)',
        background: 'rgba(217,131,92,0.10)',
        fontSize: 'calc(12.5px * var(--app-fs-scale))',
        color: '#A8643F', lineHeight: 1.5,
      }}>
        허위·악의적 신고 시 이용이 제한될 수 있습니다.
      </div>
    </BottomSheet>
  );
}

Object.assign(window, {
  ScreenMarketList, ScreenMarketDetail,
  MK_CATS, MK_POSTS, MK_STATUS_TABS, StatusBadge, ReportSheet, ErrorState, MarketException,
  ActionBtn, EditIcon, DeleteIcon, ChangeIcon, ReportIcon,
  CommentMiniAction, CommentsSection, CommentComposer,
});
