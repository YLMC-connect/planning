// 열린문 커넥트 — Home screen

function ScreenHome() {
  // Mock data
  const quickLinks = [
    { label:'동행', desc:'소모임·봉사', icon: Icon.people, color:'var(--app-primary-deep)', bg:'#EEF4EA', border:'rgba(107,130,96,0.18)' },
    { label:'기도', desc:'중보기도', icon: Icon.pray, color:'#8A5D34', bg:'#F7EFE4', border:'rgba(138,93,52,0.18)' },
    { label:'삶공부', desc:'수강 현황', icon: Icon.book, color:'#5F6FA6', bg:'#EEF1FA', border:'rgba(95,111,166,0.18)' },
    { label:'나눔', desc:'물품 나눔', icon: Icon.bag, color:'#7B6D48', bg:'#F4F0E6', border:'rgba(123,109,72,0.18)' },
  ];
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
        <button aria-label="내 정보 보기" style={{
          width: '100%',
          minHeight: 68,
          borderRadius: 18,
          border: '1px solid var(--app-line)',
          background: 'var(--app-surface)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 14px',
          textAlign: 'left',
          boxShadow: '0 2px 8px rgba(20,30,18,0.05)',
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
            background: 'linear-gradient(125deg, #6B8260 0%, #8FA882 62%, #B5C4A4 100%)',
            color: '#fff',
            border: 0,
            boxShadow: '0 8px 22px -10px rgba(107,130,96,0.5)',
          }}>
            <svg style={{ position:'absolute', right: -22, bottom: -38, opacity: .18 }} width="150" height="150" viewBox="0 0 120 120" fill="#fff"><circle cx="60" cy="60" r="56"/></svg>
            <div className="t-xs" style={{ fontWeight: 700, color:'rgba(255,255,255,0.82)' }}>오늘의 기도제목</div>
            <div style={{ marginTop: 8, fontWeight: 850, fontSize:'calc(16px * var(--app-fs-scale))', lineHeight: 1.5, color:'#fff' }}>
              가정과 일터에서 믿음의 선택을 하도록 기도합니다.
            </div>
            <div className="t-sm" style={{ marginTop: 10, color:'rgba(255,255,255,0.86)' }}>월요일 공통 기도제목</div>
            <div style={{ position:'absolute', right: -10, top: -10, color:'rgba(255,255,255,0.25)' }}>
              {Icon.pray(56)}
            </div>
          </div>
        </div>

        <Section title="바로가기">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12, padding:'0 18px' }}>
            {quickLinks.map(item => (
              <button key={item.label} className="card" style={{
                minHeight: 96,
                padding: 15,
                display:'flex',
                flexDirection:'column',
                alignItems:'flex-start',
                justifyContent:'space-between',
                textAlign:'left',
                border:`1px solid ${item.border}`,
                background:item.bg,
                boxShadow:'0 1px 3px rgba(20,30,18,0.05)',
              }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 13,
                  background:'rgba(255,255,255,0.72)',
                  color: item.color,
                  display:'grid',
                  placeItems:'center',
                }}>
                  {item.icon(21)}
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize:'calc(16px * var(--app-fs-scale))', lineHeight: 1.2 }}>{item.label}</div>
                  <div className="t-xs" style={{ marginTop: 4 }}>{item.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </Section>

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
                border:'1px solid var(--app-line)',
                background:'var(--app-surface)',
                boxShadow:'0 1px 3px rgba(20,30,18,0.05)',
              }}>
                <div style={{ width: 4, alignSelf:'stretch', borderRadius: 999, background:item.color, flexShrink: 0 }}/>
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
