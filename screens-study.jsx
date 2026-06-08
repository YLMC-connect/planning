// 열린문 커넥트 — 삶공부 list + detail

function ScreenStudyList() {
  const open = [
    { name:'새가족반', status:'신청가능', term:'2025.05 ~ 06 · 6주', desc:'교회 첫걸음, 함께 시작해요', seed:0, color:['#DDE5CD','#6B8260'] },
    { name:'제자훈련 1단계', status:'진행중',   term:'2025.03 ~ 08 · 진도 4/12', desc:'예수님의 제자로 살아가기', seed:1, color:['#E2D6BD','#8A6520'], prog: 33 },
    { name:'성경통독 6개월 코스', status:'신청가능', term:'2025.06 ~ 11 · 6개월', desc:'창세기부터 요한계시록까지', seed:2, color:['#D8E5DD','#3F6655'] },
  ];
  const closed = [
    { name:'알파코스 봄학기',   status:'마감',   term:'2025.03 ~ 05 · 종료', seed:3 },
    { name:'결혼예비학교 봄',   status:'수료',   term:'2024.04 ~ 06 · 완료', seed:4 },
    { name:'양육반 2024-가을', status:'수료',   term:'2024.09 ~ 12 · 완료', seed:5 },
  ];

  return (
    <Phone>
      <div className="phone-topbar">
        <div style={{ flex: 1 }}>
          <div className="title">동행</div>
          <div className="t-sm" style={{ marginTop: 2 }}>기도로 동행하고, 말씀으로 자라가요</div>
        </div>
        <div className="actions">
          <div style={{ width: 36, height: 36, display:'grid', placeItems:'center', color:'var(--app-ink-soft)' }}>{Icon.search()}</div>
        </div>
      </div>

      <div style={{ padding: '0 18px 12px' }}>
        <SegTabs items={[{key:'pray',label:'중보기도'},{key:'study',label:'삶공부'}]} active="study" />
      </div>

      <div className="phone-body">
        <Section title="신청가능·진행중">
          <div style={{ padding:'0 18px', display:'flex', flexDirection:'column', gap: 12 }}>
            {open.map((c, i) => (
              <div key={i} className="card" style={{ padding: 16, position:'relative', overflow:'hidden' }}>
                <div style={{
                  position:'absolute', right: -10, top: -10,
                  width: 90, height: 90, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${c.color[0]}, ${c.color[1]}44)`,
                  opacity: .6,
                }}/>
                <div style={{ position:'relative', zIndex: 1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap: 6 }}>
                    <span className={'badge ' + (c.status === '진행중' ? 'badge-primary' : 'badge-amber')}>{c.status}</span>
                    <span className="t-xs">{c.term}</span>
                  </div>
                  <div className="t-h2" style={{ marginTop: 8, letterSpacing:'-0.015em' }}>{c.name}</div>
                  <div className="t-sm" style={{ marginTop: 4 }}>{c.desc}</div>
                  {c.prog != null && (
                    <div style={{ marginTop: 12, display:'flex', alignItems:'center', gap: 10 }}>
                      <div className="bar" style={{ flex: 1 }}>
                        <i style={{ width: c.prog + '%' }}/>
                      </div>
                      <span style={{ fontSize:'calc(12px * var(--app-fs-scale))', fontWeight: 700, color:'var(--app-primary-deep)' }}>{c.prog}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="마감·수료">
          <div style={{ padding: '0 18px', display:'flex', flexDirection:'column', gap: 2 }}>
            {closed.map((c, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap: 12, padding: '14px 0', opacity: 0.7 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 'var(--app-r-s)',
                  background: 'rgba(30,41,32,0.04)',
                  display:'grid', placeItems:'center', color:'var(--app-ink-mute)',
                  flexShrink: 0,
                }}>{Icon.book(22)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap: 6 }}>
                    <span style={{ fontWeight: 600, fontSize:'calc(14px * var(--app-fs-scale))' }}>{c.name}</span>
                    <span className={'badge ' + (c.status === '수료' ? 'badge-primary' : 'badge-mute')}>{c.status}</span>
                  </div>
                  <div className="t-xs" style={{ marginTop: 2 }}>{c.term}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <div style={{ height: 12 }}/>
      </div>

      <TabBar active="faith" />
    </Phone>
  );
}

// ─────────────────────────────────────────────────────────────
// 삶공부 상세
// ─────────────────────────────────────────────────────────────
function ScreenStudyDetail() {
  const curriculum = [
    { wk:1, t:'그리스도인의 정체성',     done:true },
    { wk:2, t:'기도의 능력',           done:true },
    { wk:3, t:'말씀과 묵상',           done:true },
    { wk:4, t:'예배의 의미',           done:true,  current:true },
    { wk:5, t:'성령의 인도하심',       done:false },
    { wk:6, t:'전도와 증인의 삶',      done:false },
    { wk:7, t:'공동체와 교제',         done:false },
    { wk:8, t:'섬김의 삶',            done:false },
  ];
  return (
    <Phone>
      <TopBar
        title=""
        right={<>
          <div style={{ width: 36, height: 36, display:'grid', placeItems:'center', color:'var(--app-ink-soft)' }}>{Icon.share()}</div>
        </>}
      />
      <div className="phone-body">
        <div style={{ padding: '0 18px 18px' }}>
          <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
            <span className="badge badge-primary">진행중</span>
            <span className="t-xs">2025.03 ~ 08 · 매주 수요일 19:30</span>
          </div>
          <div className="t-display" style={{ marginTop: 10, letterSpacing:'-0.02em' }}>
            제자훈련 1단계
          </div>
          <div className="t-body" style={{ marginTop: 12 }}>
            예수님을 따르는 제자로 자라가는 12주 과정입니다. 
            매주 말씀 묵상, 적용 나눔, 함께하는 기도로 구성됩니다.
          </div>

          <div style={{
            marginTop: 16, padding: 14, borderRadius: 'var(--app-r-m)',
            background: 'var(--app-primary-soft)',
            display:'flex', alignItems:'center', gap: 12,
          }}>
            <Avatar name="이" size={36} seed="이목사"/>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize:'calc(13px * var(--app-fs-scale))', color:'var(--app-primary-deep)' }}>이정민 목사</div>
              <div className="t-xs">담당 양육자</div>
            </div>
          </div>
        </div>

        <div className="hr" style={{ background:'rgba(30,41,32,0.05)', height: 8 }}/>

        {/* 내 수강 */}
        <div style={{ padding: '18px' }}>
          <div className="t-h3">내 수강 현황</div>
          <div style={{
            marginTop: 12, padding: 16, borderRadius: 'var(--app-r-m)',
            background: 'linear-gradient(135deg, #F4F8EE, #E9EFDC)',
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
              <div style={{ fontSize:'calc(13px * var(--app-fs-scale))', fontWeight: 600, color:'var(--app-primary-deep)' }}>진도율</div>
              <div style={{ fontSize:'calc(20px * var(--app-fs-scale))', fontWeight: 800, color:'var(--app-primary-deep)', letterSpacing:'-0.02em' }}>4 / 12 <span style={{ fontSize:'calc(13px * var(--app-fs-scale))', fontWeight: 600 }}>주차</span></div>
            </div>
            <div className="bar" style={{ marginTop: 10, background:'rgba(255,255,255,0.55)' }}>
              <i style={{ width: '33%' }}/>
            </div>
            <div style={{ display:'flex', gap: 10, marginTop: 14 }}>
              <div style={{ flex: 1, padding: 10, borderRadius: 'var(--app-r-s)', background: 'rgba(255,255,255,0.65)' }}>
                <div className="t-xs">제출한 과제</div>
                <div style={{ fontWeight: 800, fontSize:'calc(16px * var(--app-fs-scale))', marginTop: 2 }}>3 / 4</div>
              </div>
              <div style={{ flex: 1, padding: 10, borderRadius: 'var(--app-r-s)', background: 'rgba(255,255,255,0.65)' }}>
                <div className="t-xs">출석</div>
                <div style={{ fontWeight: 800, fontSize:'calc(16px * var(--app-fs-scale))', marginTop: 2 }}>4 / 4</div>
              </div>
            </div>
          </div>
        </div>

        {/* 커리큘럼 */}
        <div style={{ padding: '0 18px 18px' }}>
          <div className="t-h3" style={{ marginBottom: 12 }}>커리큘럼</div>
          <div style={{ display:'flex', flexDirection:'column' }}>
            {curriculum.map((w, i) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap: 12, padding: '12px 4px',
                borderBottom: i < curriculum.length - 1 ? '1px solid var(--app-line)' : 'none',
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%',
                  display:'grid', placeItems:'center', flexShrink: 0,
                  background: w.current ? 'var(--app-primary)' : w.done ? 'var(--app-primary-soft)' : 'rgba(30,41,32,0.05)',
                  color: w.current ? '#fff' : w.done ? 'var(--app-primary-deep)' : 'var(--app-ink-mute)',
                  fontWeight: 700, fontSize:'calc(11px * var(--app-fs-scale))',
                }}>
                  {w.done && !w.current ? Icon.check(14) : w.wk}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="t-xs" style={{ fontWeight: 600 }}>WEEK {w.wk}</div>
                  <div style={{
                    fontSize:'calc(14px * var(--app-fs-scale))',
                    fontWeight: w.current ? 700 : 500,
                    color: w.done && !w.current ? 'var(--app-ink-mute)' : 'var(--app-ink)',
                  }}>{w.t}</div>
                </div>
                {w.current && <span className="badge badge-primary">이번주</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <button className="btn btn-soft" style={{ width: 56, padding: 0 }}>{Icon.heart(20)}</button>
        <button className="btn btn-primary" style={{ flex: 1 }}>이번 주 과제 제출</button>
      </div>
    </Phone>
  );
}

Object.assign(window, { ScreenStudyList, ScreenStudyDetail });
