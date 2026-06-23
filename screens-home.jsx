// 열린문 커넥트 — Home screen

function ScreenHome() {
  // Mock data
  const activityItems = [
    { title:'내 소모임', value:'청년 1부 큐티모임 외 2개', desc:'최근 글: 마가복음 8장 함께 묵상해요', color:'var(--app-primary)' },
    { title:'내 기도', value:'월요일 오전 기도방', desc:'오늘 기도 완료 전', color:'#8A5D34' },
    { title:'삶공부 진행', value:'하나님 나라의 복음 3주차', desc:'이번 주 수강 전', color:'#5F6FA6' },
  ];

  return (
    <Phone>
      {/* Top */}
      <div style={{ padding: '8px 18px 14px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 10 }}>
          <div className="t-xs" style={{ fontWeight: 800, color: 'var(--app-primary-deep)' }}>열린문 커넥트</div>
        </div>
        <button className="card" aria-label="내 정보 보기" style={{
          width: '100%',
          minHeight: 68,
          borderRadius: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 14px',
          textAlign: 'left',
          fontFamily: 'inherit',
          color: 'inherit',
        }}>
          <Avatar name="김은혜" size={42} seed="김은혜" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 'calc(18px * var(--app-fs-scale))',
              lineHeight: 1.25,
              fontWeight: 900,
              color: 'var(--app-ink)',
              letterSpacing: 0,
            }}>
              김은혜님
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            color: 'var(--app-primary-deep)',
            fontSize: 'calc(14px * var(--app-fs-scale))',
            lineHeight: 1.2,
            fontWeight: 850,
            flexShrink: 0,
          }}>
            내 정보 보기
            {Icon.chevron(20)}
          </div>
        </button>
      </div>

      <div className="phone-body">
        {/* 오늘의 기도제목 */}
        <div style={{ padding: '0 18px' }}>
          <div className="card" style={{
            padding: 18,
            position:'relative',
            overflow:'hidden',
            background: 'linear-gradient(130deg, #516B4A 0%, #7F9B72 56%, #B5C4A4 100%)',
            color: '#fff',
            border: 0,
            boxShadow: '0 18px 36px -22px rgba(63,91,58,0.74), inset 0 1px 0 rgba(255,255,255,0.20)',
          }}>
            <svg style={{ position:'absolute', right: -22, bottom: -38, opacity: .14 }} width="150" height="150" viewBox="0 0 120 120" fill="#fff"><circle cx="60" cy="60" r="56"/></svg>
            <div className="t-xs" style={{ fontWeight: 800, color:'rgba(255,255,255,0.84)' }}>오늘의 기도제목</div>
            <div style={{ marginTop: 8, fontWeight: 850, fontSize:'calc(16px * var(--app-fs-scale))', lineHeight: 1.5, color:'#fff' }}>
              가정과 일터에서 믿음의 선택을 하도록 기도합니다.
            </div>
            <div className="t-sm" style={{ marginTop: 10, color:'rgba(255,255,255,0.88)' }}>월요일 공통 기도제목</div>
            <div style={{ position:'absolute', right: -10, top: -10, color:'rgba(255,255,255,0.22)' }}>
              {Icon.pray(56)}
            </div>
          </div>
        </div>

        <Section title="내 활동 요약" style={{ marginBottom: 12 }}>
          <div style={{ display:'grid', gap: 10, padding:'0 18px' }}>
            {activityItems.map(item => (
              <button key={item.title} className="card" style={{
                minHeight: 72,
                padding: '14px 15px',
                display:'flex',
                alignItems:'center',
                gap: 12,
                textAlign:'left',
                fontFamily: 'inherit',
                color: 'inherit',
              }}>
                <div style={{
                  width: 6,
                  alignSelf:'stretch',
                  borderRadius: 999,
                  background:`linear-gradient(180deg, ${item.color}, rgba(30,41,32,0.18))`,
                  flexShrink: 0,
                }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="t-xs" style={{ fontWeight: 800, color:'var(--app-ink-mute)' }}>{item.title}</div>
                  <div style={{ marginTop: 5, fontWeight: 850, fontSize:'calc(15px * var(--app-fs-scale))', lineHeight: 1.35, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.value}</div>
                  <div className="t-sm" style={{ marginTop: 3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.desc}</div>
                </div>
                <div style={{ color:'var(--app-ink-mute)', display:'grid', placeItems:'center', flexShrink: 0 }}>
                  {Icon.chevron(18)}
                </div>
              </button>
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
