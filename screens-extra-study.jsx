// 열린문 커넥트 — 추가 화면 (삶공부)

// ─── 수강 신청 ───
function ScreenStudyApply() {
  return (
    <Phone>
      <TopBar title="수강 신청" right={<div style={{ fontSize:'calc(14px * var(--app-fs-scale))', color:'var(--app-primary)', fontWeight:700 }}>신청</div>}/>
      <div className="phone-body" style={{ padding:'4px 18px 20px' }}>
        {/* 과정 요약 */}
        <div className="card" style={{ padding: 16, marginBottom: 20, display:'flex', gap: 12, alignItems:'center' }}>
          <Cover w={72} h={72} seed={1} icon={Icon.book(20)}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight:700, fontSize:'calc(15px * var(--app-fs-scale))' }}>제자훈련 1단계</div>
            <div className="t-sm" style={{ color:'var(--app-ink-mute)', marginTop: 4, lineHeight: 1.5 }}>
              매주 화 19:30 · 본당 3층 소예배실<br/>2026.01.06 ~ 2026.04.07 (총 12주)
            </div>
          </div>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap: 20 }}>
          <div>
            <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600, color:'var(--app-ink-soft)' }}>이름</div>
            <input className="input" defaultValue="김은혜"/>
          </div>
          <div style={{ display:'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600, color:'var(--app-ink-soft)' }}>연락처</div>
              <input className="input" defaultValue="010-1234-5678"/>
            </div>
            <div style={{ flex: 1 }}>
              <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600, color:'var(--app-ink-soft)' }}>생년</div>
              <input className="input" defaultValue="1988"/>
            </div>
          </div>
          <div>
            <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600, color:'var(--app-ink-soft)' }}>소속 부서</div>
            <input className="input" placeholder="예) 4부 청장년부"/>
          </div>
          <div>
            <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600, color:'var(--app-ink-soft)' }}>신앙 연차</div>
            <div style={{ display:'flex', gap: 6, flexWrap:'wrap' }}>
              {['1년 미만','1-3년','3-5년','5-10년','10년 이상'].map((c,i) => (
                <div key={i} className={'chip' + (i===3 ? ' on' : '')}>{c}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600, color:'var(--app-ink-soft)' }}>신청 동기</div>
            <textarea className="input" rows={4} placeholder="신청하시는 이유를 자유롭게 적어주세요" style={{ resize:'none', fontFamily:'inherit' }}/>
          </div>
          <div style={{
            padding: 14, borderRadius:'var(--app-r-m)',
            background:'var(--app-surface)', border:'1px solid var(--app-line)',
            display:'flex', alignItems:'flex-start', gap: 10,
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: 6,
              background:'var(--app-primary)', color:'#fff',
              display:'grid', placeItems:'center', flexShrink: 0,
            }}>{Icon.check(14)}</div>
            <div className="t-sm" style={{ flex: 1, lineHeight: 1.55 }}>
              <span style={{ fontWeight: 600 }}>수강 약속에 동의합니다</span>
              <div style={{ color:'var(--app-ink-mute)', marginTop: 4 }}>
                12주 과정 중 80% 이상 출석하며, 매주 묵상 과제를 성실히 수행하겠습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Phone>
  );
}

// ─── 수강 내역 ───
function ScreenStudyHistory() {
  const ongoing = [
    { name:'제자훈련 1단계', when:'2026.01 ~ 2026.04', progress: 25, week:'3/12주차', seed:1 },
  ];
  const history = [
    { name:'새가족 환영반', when:'2025.09 ~ 2025.11', progress: 100, status:'수료', seed:0 },
    { name:'기초 성경통독', when:'2025.03 ~ 2025.08', progress: 100, status:'수료', seed:2 },
    { name:'전도학교 입문', when:'2024.10 ~ 2024.12', progress: 62, status:'미수료', seed:3 },
  ];

  return (
    <Phone>
      <TopBar title="수강 내역"/>
      <div className="phone-body">
        <Section title="수강 중">
          <div style={{ padding:'0 18px', display:'flex', flexDirection:'column', gap: 12 }}>
            {ongoing.map((c, i) => (
              <div key={i} className="card" style={{ padding: 16 }}>
                <div style={{ display:'flex', gap: 12, alignItems:'center', marginBottom: 12 }}>
                  <Cover w={56} h={56} seed={c.seed} icon={Icon.book(18)}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight:700, fontSize:'calc(15px * var(--app-fs-scale))' }}>{c.name}</div>
                    <div className="t-sm" style={{ color:'var(--app-ink-mute)', marginTop: 4 }}>{c.when}</div>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 6 }}>
                  <div className="t-sm" style={{ fontWeight: 600 }}>{c.week}</div>
                  <div className="t-sm" style={{ color:'var(--app-primary-deep)', fontWeight: 700 }}>{c.progress}%</div>
                </div>
                <div style={{ height: 6, borderRadius: 3, background:'var(--app-line)', overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${c.progress}%`, background:'var(--app-primary)', borderRadius: 3 }}/>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="지난 과정">
          <div style={{ padding:'0 18px', display:'flex', flexDirection:'column' }}>
            {history.map((c, i) => (
              <div key={i} style={{
                display:'flex', gap: 12, alignItems:'center', padding:'14px 0',
                borderBottom: i < history.length - 1 ? '1px solid var(--app-line)' : 'none',
              }}>
                <Cover w={56} h={56} seed={c.seed} icon={Icon.book(18)}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight:600, fontSize:'calc(14.5px * var(--app-fs-scale))' }}>{c.name}</div>
                  <div className="t-sm" style={{ color:'var(--app-ink-mute)', marginTop: 4 }}>{c.when}</div>
                </div>
                <div style={{
                  fontSize: 11, padding:'3px 10px', borderRadius: 999,
                  background: c.status === '수료' ? 'var(--app-primary)' : 'var(--app-line-strong)',
                  color: c.status === '수료' ? '#fff' : 'var(--app-ink-mute)',
                  fontWeight: 700, flexShrink: 0,
                }}>{c.status}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </Phone>
  );
}

Object.assign(window, { ScreenStudyApply, ScreenStudyHistory });
