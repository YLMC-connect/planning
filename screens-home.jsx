// 열린문 커넥트 — Home screen
const { useState: useStateHome } = React;

function ScreenHome() {
  // Mock data
  const myGroups = [
    { id:1, name:'청년 1부 큐티모임', last:'오늘 09:14',  msg:'마가복음 8장 함께 묵상해요',     seed:0 },
    { id:2, name:'토요 산악회',       last:'어제 18:02', msg:'이번 주 청계산 사진 올렸어요',     seed:2 },
    { id:3, name:'주방 봉사팀',       last:'2일 전',     msg:'다음 주 메뉴 회의 잡았어요',       seed:4 },
  ];
  const newGroups = [
    { id:1, name:'사진 동아리', cat:'문화', n:8,  seed:1 },
    { id:2, name:'성가대 신입',  cat:'봉사', n:5,  seed:3 },
    { id:3, name:'아빠와 산책', cat:'가족', n:12, seed:5 },
  ];
  const market = [
    { id:1, title:'유아용 그림책 30권', price:0,     seed:0 },
    { id:2, title:'에어프라이어',       price:25000, seed:1 },
    { id:3, title:'유모차',            price:0,     seed:2 },
    { id:4, title:'캠핑 의자 2개',      price:15000, seed:3 },
  ];

  return (
    <Phone>
      {/* Top */}
      <div style={{ padding: '8px 18px 8px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--app-primary), #B5C4A4)',
            display:'grid', placeItems:'center', color:'#fff',
          }}>
            <svg width="16" height="16" viewBox="0 0 44 44" fill="none">
              <path d="M10 8 L26 5 L26 39 L10 36 Z" fill="#fff" opacity=".95"/>
              <path d="M26 5 L34 9 L34 35 L26 39 Z" fill="#fff" opacity=".70"/>
            </svg>
          </div>
          <div style={{ fontSize:'calc(16px * var(--app-fs-scale))', fontWeight: 800, letterSpacing:'-0.01em' }}>열린문 커넥트</div>
        </div>
        <div style={{ display:'flex', gap: 6 }}>
          <div style={{ width: 36, height: 36, display:'grid', placeItems:'center', color:'var(--app-ink-soft)' }}>{Icon.search()}</div>
          <div style={{ width: 36, height: 36, display:'grid', placeItems:'center', color:'var(--app-ink-soft)', position:'relative' }}>
            {Icon.bell()}
            <div style={{ position:'absolute', top: 7, right: 9, width: 7, height: 7, borderRadius: '50%', background: 'var(--app-danger)', border: '1.5px solid var(--app-bg)' }}/>
          </div>
        </div>
      </div>

      <div className="phone-body">
        {/* 공지 배너 (carousel) */}
        <div style={{ padding: '0 18px' }}>
          <div style={{
            borderRadius: 'var(--app-r-l)',
            padding: '16px 18px',
            background: 'linear-gradient(125deg, #6B8260 0%, #8FA882 60%, #B5C4A4 100%)',
            color: '#fff', position:'relative', overflow:'hidden',
            display:'flex', alignItems:'center', gap: 14,
            boxShadow: '0 8px 22px -10px rgba(107,130,96,0.5)',
          }}>
            <svg style={{ position:'absolute', right: -10, bottom: -20, opacity: .25 }} width="120" height="120" viewBox="0 0 120 120" fill="#fff"><circle cx="60" cy="60" r="56"/></svg>
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,.2)',
              display:'grid', placeItems:'center', flexShrink: 0, backdropFilter:'blur(10px)',
            }}>{Icon.cal(22)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="t-xs" style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>이번 주 공지</div>
              <div style={{ fontWeight: 700, fontSize: 'calc(15px * var(--app-fs-scale))', marginTop: 2, letterSpacing:'-0.01em' }}>주일 2부 예배 시간 변경 안내</div>
            </div>
            <div style={{ display:'flex', gap: 4 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#fff' }}/>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'rgba(255,255,255,.4)' }}/>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'rgba(255,255,255,.4)' }}/>
            </div>
          </div>
        </div>

        {/* 내 소모임 활동 */}
        <Section title="내 소모임 활동" more="전체보기">
          <div style={{ display:'flex', gap: 12, overflowX:'auto', padding:'0 18px 4px', scrollbarWidth:'none' }}>
            {myGroups.map(g => (
              <div key={g.id} className="card" style={{ width: 220, padding: 14, flexShrink: 0 }}>
                <Cover w={192} h={84} seed={g.seed} />
                <div style={{ fontWeight: 700, fontSize:'calc(14px * var(--app-fs-scale))', marginTop: 10, letterSpacing:'-0.01em' }}>{g.name}</div>
                <div className="t-sm" style={{ marginTop: 4, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{g.msg}</div>
                <div className="t-xs" style={{ marginTop: 6 }}>{g.last}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* 중보기도 카드 (2-col) */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10, padding:'8px 18px 0' }}>
          {/* 오늘 기도제목 */}
          <div className="card" style={{ padding: 16, position:'relative', overflow:'hidden' }}>
            <div className="t-xs" style={{ fontWeight: 600, color:'var(--app-ink-mute)' }}>오늘 기도제목</div>
            <div style={{ display:'flex', alignItems:'baseline', gap: 4, marginTop: 6 }}>
              <span style={{ fontSize: 'calc(28px * var(--app-fs-scale))', fontWeight: 800, color:'var(--app-primary-deep)', lineHeight: 1, letterSpacing:'-0.02em' }}>12</span>
              <span className="t-sm" style={{ fontWeight: 600 }}>개</span>
            </div>
            <div className="t-xs" style={{ marginTop: 8 }}>월요일 오전 기도방</div>
            <div style={{ position:'absolute', right: -8, top: -8, color:'var(--app-primary-soft)' }}>
              {Icon.pray(48)}
            </div>
          </div>

          {/* 이번 주 응답 */}
          <div className="card" style={{ padding: 16, background:'linear-gradient(135deg, #F3EFE5 0%, #E7D8B8 100%)', position:'relative', overflow:'hidden' }}>
            <div className="t-xs" style={{ fontWeight: 600, color:'#7A5E2C' }}>이번 주 기도응답</div>
            <div style={{ display:'flex', alignItems:'baseline', gap: 4, marginTop: 6 }}>
              <span style={{ fontSize: 'calc(28px * var(--app-fs-scale))', fontWeight: 800, color:'#5C4419', lineHeight: 1, letterSpacing:'-0.02em' }}>7</span>
              <span style={{ fontSize:'calc(12px * var(--app-fs-scale))', fontWeight: 600, color:'#7A5E2C' }}>건</span>
            </div>
            <div className="t-xs" style={{ marginTop: 8, color:'#7A5E2C' }}>지난주 대비 +3</div>
            <div style={{ position:'absolute', right: -6, top: -6, color:'rgba(140,100,40,0.15)' }}>
              {Icon.heart(48)}
            </div>
          </div>
        </div>

        {/* 새벽기도 말씀 요약 */}
        <div style={{ padding: '12px 18px 0' }}>
          <div className="card" style={{
            padding: 16,
            border: '1px solid rgba(91,122,176,0.18)',
            boxShadow: '0 1px 3px rgba(20,30,18,0.05)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ minWidth: 0 }}>
                <div className="t-xs" style={{ fontWeight: 700, color: 'var(--app-primary-deep)' }}>오늘의 새벽기도 말씀</div>
                <div style={{ marginTop: 6, fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))', letterSpacing: '-0.01em' }}>
                  은혜 안에 굳게 서라
                </div>
                <div className="t-sm" style={{ marginTop: 7, lineHeight: 1.55 }}>
                  2026.06.08 · 말씀을 붙드는 하루의 시작, 공동체를 향한 사랑을 다시 세웁니다.
                </div>
              </div>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: 14,
                background: 'var(--app-primary-soft)',
                color: 'var(--app-primary-deep)',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 4.5h9a3 3 0 0 1 3 3v12H8a3 3 0 0 1-3-3z"/>
                  <path d="M8 8h6M8 11h5M8 14h4"/>
                </svg>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 12, color: 'var(--app-primary-deep)', fontWeight: 800, fontSize: 'calc(13px * var(--app-fs-scale))' }}>
              상세 보기 {Icon.chevron(14)}
            </div>
          </div>
        </div>

        {/* 새로 생긴 소모임 */}
        <Section title="새로 생긴 소모임" more="더보기">
          <div style={{ display:'flex', gap: 12, overflowX:'auto', padding:'0 18px 4px', scrollbarWidth:'none' }}>
            {newGroups.map(g => (
              <div key={g.id} style={{ width: 150, flexShrink: 0 }}>
                <Cover w={150} h={150} seed={g.seed + 1}/>
                <div style={{ fontWeight: 700, fontSize:'calc(14px * var(--app-fs-scale))', marginTop: 10, letterSpacing:'-0.005em' }}>{g.name}</div>
                <div style={{ display:'flex', alignItems:'center', gap: 6, marginTop: 4 }}>
                  <span className="badge badge-primary">{g.cat}</span>
                  <span className="t-xs">멤버 {g.n}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 최근 나눔 물품 */}
        <Section title="최근 나눔 물품" more="전체보기" style={{ marginBottom: 12 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12, padding:'0 18px' }}>
            {market.map(m => (
              <div key={m.id}>
                <Thumb size="100%" style={{ width: '100%', aspectRatio: '1 / 1' }} seed={m.seed} />
                <div style={{ fontSize:'calc(13px * var(--app-fs-scale))', fontWeight: 600, marginTop: 8, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{m.title}</div>
                <div style={{
                  fontWeight: 700, fontSize:'calc(14px * var(--app-fs-scale))', marginTop: 2,
                  color: m.price === 0 ? 'var(--app-primary-deep)' : 'var(--app-ink)',
                }}>{won(m.price)}</div>
              </div>
            ))}
          </div>
        </Section>
        <div style={{ height: 12 }}/>
      </div>

      <TabBar active="home" />
    </Phone>
  );
}

Object.assign(window, { ScreenHome });
