// 열린문 커넥트 — 추가 화면 (홈 섹션)

function ScreenNotifications() {
  const today = [
    { type:'group',  icon: Icon.people, who:'화요 자녀 중보방', what:'에 새 멤버가 가입했어요', ago:'10분 전', unread:true },
    { type:'pray',   icon: Icon.heart,  who:'김은혜 집사님', what:'이 기도제목에 응원을 남겼어요', ago:'1시간 전', unread:true },
    { type:'market', icon: Icon.bag,    who:'유아용 카시트', what:' 게시글에 댓글이 달렸어요', ago:'2시간 전', unread:true },
  ];
  const earlier = [
    { type:'study',  icon: Icon.book,  who:'제자훈련 1단계', what:'의 새 자료가 등록되었어요', ago:'어제' },
    { type:'group',  icon: Icon.people, who:'토요 산악회', what:'의 새 공지가 올라왔어요', ago:'어제' },
    { type:'pray',   icon: Icon.heart, who:'박은혜 권사님', what:'의 기도제목이 응답되었어요', ago:'2일 전' },
    { type:'system', icon: Icon.bell,  who:'운영자', what:'서비스 점검 안내', ago:'3일 전' },
    { type:'market', icon: Icon.bag,   who:'전기밥솥 나눔', what:' 거래가 완료되었어요', ago:'5일 전' },
  ];

  const Row = ({ n }) => (
    <div style={{
      display:'flex', alignItems:'flex-start', gap: 12,
      padding: '14px 18px',
      background: n.unread ? 'var(--app-primary-soft)' : 'transparent',
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: '50%',
        background: n.unread ? 'var(--app-primary)' : 'var(--app-line)',
        color: n.unread ? '#fff' : 'var(--app-ink-mute)',
        display:'grid', placeItems:'center', flexShrink: 0,
      }}>{n.icon(18)}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize:'calc(14px * var(--app-fs-scale))', lineHeight: 1.45 }}>
          <span style={{ fontWeight: 700 }}>{n.who}</span>{n.what}
        </div>
        <div className="t-sm" style={{ marginTop: 4, color:'var(--app-ink-mute)' }}>{n.ago}</div>
      </div>
      {n.unread && <div style={{ width: 6, height: 6, borderRadius: 3, background:'var(--app-primary)', marginTop: 6 }}/>}
    </div>
  );

  return (
    <Phone>
      <TopBar title="알림" right={<div style={{ fontSize:'calc(13px * var(--app-fs-scale))', color:'var(--app-ink-mute)', fontWeight:600 }}>모두 읽음</div>}/>
      <div className="phone-body" style={{ padding: 0 }}>
        <div style={{ padding:'10px 18px 6px', color:'var(--app-ink-mute)', fontSize:'calc(12px * var(--app-fs-scale))', fontWeight:700 }}>오늘</div>
        {today.map((n,i) => <Row key={i} n={n}/>)}
        <div style={{ padding:'14px 18px 6px', color:'var(--app-ink-mute)', fontSize:'calc(12px * var(--app-fs-scale))', fontWeight:700 }}>지난 알림</div>
        {earlier.map((n,i) => <Row key={i} n={n}/>)}
      </div>
    </Phone>
  );
}

Object.assign(window, { ScreenNotifications });
