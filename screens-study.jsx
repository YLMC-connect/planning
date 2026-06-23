// 열린문 커넥트 — 삶공부 list + detail

const LIFE_STUDY_REQUIRED = [
  { name:'생명의 삶', weeks:'13주', leader:'박귀원', status:'수료', summary:'구원의 확신과 신앙의 근본을 바로 세우는 가장 기본 과정', target:'등록교인 누구나' },
  { name:'새로운 삶', weeks:'13주', leader:'손현종', status:'추천', summary:'하나님 나라의 가치관과 매일 QT의 첫걸음을 돕는 과정', target:'생명의 삶 수료자' },
  { name:'경건의 삶', weeks:'13주', leader:'서상오', status:'대기', summary:'경건 훈련으로 하나님과 이웃과의 사랑의 관계를 연습', target:'새로운 삶 수료자' },
  { name:'확신의 삶', weeks:'7주', leader:'담임목사 부부', status:'대기', summary:'목장에서 1:1로 새가족의 영적 성장을 돕는 양육 과정', target:'목자·목녀, 예비목자 부부' },
  { name:'하나님을 경험하는 삶', weeks:'13주', leader:'유진호', status:'대기', summary:'매일의 삶에서 하나님을 경험하고 순종을 훈련하는 과정', target:'목자·목녀, 예비목자 부부' },
];

const LIFE_STUDY_OPTIONAL = [
  { name:'부부의 삶', weeks:'13주', leader:'이종섭 김은경 부부', summary:'배우자를 이해하고 부부가 하나 되도록 돕는 훈련', target:'배우자를 알아가며 하나 되기 원하는 가정' },
  { name:'말씀의 삶', weeks:'13주', leader:'김원도 김선경', summary:'성경 1독을 돕고 말씀의 큰 흐름을 따라 신앙을 세우는 과정', target:'말씀을 전체 맥으로 공부하기 원하는 분' },
  { name:'커플의 삶', weeks:'6주', leader:'이보영 임영란 부부', summary:'결혼 전 실제적인 준비를 돕는 과정', target:'결혼을 준비하는 커플' },
  { name:'교사의 삶', weeks:'6주', leader:'김원도', summary:'교회학교 교사와 믿음의 부모가 어린 영혼을 세우도록 돕는 과정', target:'교사 또는 자녀 양육을 배우기 원하는 분' },
  { name:'목자목녀의 삶', weeks:'13주', leader:'백남준 박선영 부부', summary:'목자·목녀의 사명을 감당하도록 내면세계와 영적질서를 점검', target:'목자·목녀의 사명을 감당하기 원하는 분' },
  { name:'부모의 삶', weeks:'7주', leader:'김원도', summary:'기독교 가정과 부모의 정체성, 자녀교육 책임을 배우는 과정', target:'부모 역할을 성경적으로 배우기 원하는 분' },
  { name:'일터의 삶', weeks:'13주', leader:'김광진', summary:'성경적 직업관과 일터에서의 선한 영향력을 배우는 과정', target:'세례교인 또는 목자·목녀' },
  { name:'큐티의 삶', weeks:'8주', leader:'이현경B', summary:'매일 말씀을 묵상하고 삶에 적용하도록 훈련', target:'큐티 훈련을 시작하기 원하는 분' },
  { name:'기도의 삶', weeks:'8주', leader:'김경숙', summary:'중보기도 원칙과 영적전쟁을 배우고 경험하는 과정', target:'중보기도를 배우기 원하는 분' },
  { name:'생명언어의 삶', weeks:'13주', leader:'김숙자 이연홍', summary:'하나님 자녀의 품격에 맞는 언어습관을 훈련', target:'생명의 삶 수료자' },
  { name:'말씀통독의 삶', weeks:'1년', leader:'오유미', summary:'1년에 성경 1독을 하도록 돕는 과정', target:'생명의 삶 수료자' },
  { name:'성경암송의 삶', weeks:'상시', leader:'김미애', summary:'매일 성경말씀을 암송하고 깊이 묵상하도록 돕는 과정', target:'성경 암송과 묵상을 원하는 분' },
  { name:'정체성 누리는 삶', weeks:'12주', leader:'나삼숙', summary:'하나님 형상을 회복하고 정체성을 누리도록 돕는 과정', target:'생명의 삶 수료자' },
];

Object.assign(window, { LIFE_STUDY_REQUIRED, LIFE_STUDY_OPTIONAL });

function ScreenStudyList() {
  const required = LIFE_STUDY_REQUIRED;
  const optional = LIFE_STUDY_OPTIONAL;

  return (
    <Phone>
      <div className="phone-topbar">
        <div style={{ flex: 1 }}>
          <div className="title">삶공부</div>
          <div className="t-sm" style={{ marginTop: 2 }}>말씀으로 배우고 삶으로 자라가요</div>
        </div>
        <div className="actions">
          <div style={{ width: 36, height: 36, display:'grid', placeItems:'center', color:'var(--app-ink-soft)' }}>{Icon.search()}</div>
        </div>
      </div>

      <div className="phone-body">
        <Section title="내 학습경로">
          <div style={{ padding:'0 18px' }}>
            <div className="card" style={{
              padding: 16,
              background: 'linear-gradient(135deg, #F4F8EE, #E9EFDC)',
              border: '1px solid rgba(107,130,96,0.14)',
            }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', gap: 10 }}>
                <div>
                  <div className="t-xs" style={{ fontWeight: 800, color:'var(--app-primary-deep)' }}>필수 과정 진행률</div>
                  <div style={{ marginTop: 5, fontWeight: 900, fontSize:'calc(18px * var(--app-fs-scale))' }}>1 / 5 완료</div>
                </div>
                <div style={{ fontWeight: 900, color:'var(--app-primary-deep)', fontSize:'calc(22px * var(--app-fs-scale))' }}>20%</div>
              </div>
              <div className="bar" style={{ marginTop: 12, background:'rgba(255,255,255,0.72)' }}>
                <i style={{ width:'20%' }}/>
              </div>
              <div style={{ marginTop: 14, display:'flex', gap: 10 }}>
                <div style={{ flex: 1, padding: 11, borderRadius:'var(--app-r-s)', background:'rgba(255,255,255,0.7)' }}>
                  <div className="t-xs">다음 추천</div>
                  <div style={{ marginTop: 3, fontWeight: 850, fontSize:'calc(14px * var(--app-fs-scale))' }}>생명언어의 삶</div>
                </div>
                <div style={{ flex: 1, padding: 11, borderRadius:'var(--app-r-s)', background:'rgba(255,255,255,0.7)' }}>
                  <div className="t-xs">수강 기준</div>
                  <div style={{ marginTop: 3, fontWeight: 850, fontSize:'calc(14px * var(--app-fs-scale))' }}>생명의 삶 이후 가능</div>
                </div>
              </div>
              <div className="t-xs" style={{ marginTop: 11 }}>
                필수 5개 과정과 목자 자격 조건은 목자로 세워지는 기준에 반영됩니다.
              </div>
            </div>
          </div>
        </Section>

        <Section title="필수 과정">
          <div style={{ padding:'0 18px', display:'flex', flexDirection:'column', gap: 12 }}>
            {required.map((c, i) => (
              <div key={i} className="card" style={{ padding: 16, position:'relative', overflow:'hidden' }}>
                <div style={{
                  position:'absolute', right: -10, top: -10,
                  width: 90, height: 90, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #DDE5CD, #6B826044)',
                  opacity: .6,
                }}/>
                <div style={{ position:'relative', zIndex: 1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap: 6, flexWrap:'wrap' }}>
                    <span className="badge badge-mute">필수</span>
                    <span className={'badge ' + (c.status === '수료' ? 'badge-primary' : c.status === '추천' ? 'badge-amber' : 'badge-mute')}>{c.status}</span>
                    <span className="t-xs">{c.weeks} · {c.leader}</span>
                  </div>
                  <div className="t-h2" style={{ marginTop: 8, letterSpacing:'-0.015em' }}>{c.name}</div>
                  <div className="t-sm" style={{ marginTop: 4, lineHeight: 1.55 }}>{c.summary}</div>
                  <div className="t-xs" style={{ marginTop: 7, fontWeight: 700, color:'var(--app-primary-deep)' }}>신청대상: {c.target}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="선택 과정">
          <div style={{ padding: '0 18px', display:'flex', flexDirection:'column' }}>
            {optional.map((c, i) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap: 12, padding: '14px 0',
                borderBottom: i < optional.length - 1 ? '1px solid var(--app-line)' : 'none',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 'var(--app-r-s)',
                  background: 'rgba(30,41,32,0.04)',
                  display:'grid', placeItems:'center', color:'var(--app-ink-mute)',
                  flexShrink: 0,
                }}>{Icon.book(22)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap: 6, flexWrap:'wrap' }}>
                    <span style={{ fontWeight: 600, fontSize:'calc(14px * var(--app-fs-scale))' }}>{c.name}</span>
                    <span className="badge badge-mute">선택</span>
                  </div>
                  <div className="t-xs" style={{ marginTop: 2 }}>{c.weeks} · {c.leader}</div>
                  <div className="t-sm" style={{ marginTop: 4, lineHeight: 1.45 }}>{c.summary}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <div style={{ height: 12 }}/>
      </div>

      <TabBar active="study" />
    </Phone>
  );
}

// ─────────────────────────────────────────────────────────────
// 삶공부 상세
// ─────────────────────────────────────────────────────────────
function ScreenStudyDetail() {
  const curriculum = [
    { wk:1, t:'구원의 확신',           done:true },
    { wk:2, t:'하나님과의 관계 정립',   done:true },
    { wk:3, t:'성경을 읽고 이해하기',   done:true },
    { wk:4, t:'신앙의 근본 세우기',     done:true,  current:true },
    { wk:5, t:'신앙적 의문과 답',       done:false },
    { wk:6, t:'하나님과 이웃의 관계',   done:false },
    { wk:7, t:'교회 공동체와 봉사',     done:false },
    { wk:8, t:'생명의 삶 적용',         done:false },
  ];
  const schedule = [
    { week:'4주차', title:'신앙의 근본 세우기', date:'6.24 수 19:30', attendance:'출석 예정' },
    { week:'3주차', title:'성경을 읽고 이해하기', date:'6.17 수 19:30', attendance:'출석' },
    { week:'2주차', title:'하나님과의 관계 정립', date:'6.10 수 19:30', attendance:'지각' },
  ];
  const assignments = [
    { week:'4주차', title:'구원의 확신 나눔지 작성', state:'제출 전' },
    { week:'3주차', title:'성경 읽기 적용 기록', state:'제출 완료' },
  ];
  const notices = [
    { title:'이번 주는 구원의 확신과 신앙의 근본을 함께 다룹니다', scope:'4주차 공지', read:'읽음 18 / 20명' },
    { title:'생명의 삶 수료 후 이후 필수·선택 과정을 신청할 수 있어요', scope:'전체 공지', read:'읽음 16 / 20명' },
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
            <span className="badge badge-primary">수강 중</span>
            <span className="badge badge-mute">필수 과정</span>
            <span className="t-xs">13주 · 매주 수요일 19:30</span>
          </div>
          <div className="t-display" style={{ marginTop: 10, letterSpacing:'-0.02em' }}>
            생명의 삶
          </div>
          <div className="t-body" style={{ marginTop: 12 }}>
            구원의 확신이 있는지, 지금 죽는다 해도 천국에 갈 수 있는지,
            신앙의 근본을 바로 잡도록 돕는 가장 기본적인 삶공부입니다.
          </div>
          <div className="card" style={{ marginTop: 14, padding: 14, boxShadow:'0 1px 3px rgba(20,30,18,0.05)' }}>
            <div className="t-xs" style={{ fontWeight: 800, color:'var(--app-ink-mute)' }}>과정 정보</div>
            <div style={{ marginTop: 10, display:'grid', gap: 8 }}>
              <div style={{ display:'flex', justifyContent:'space-between', gap: 10 }}>
                <span className="t-sm">교재</span>
                <span style={{ fontWeight: 800, fontSize:'calc(13px * var(--app-fs-scale))' }}>생명의 삶 교재</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', gap: 10 }}>
                <span className="t-sm">수강 대상</span>
                <span style={{ fontWeight: 800, fontSize:'calc(13px * var(--app-fs-scale))' }}>등록교인 누구나</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', gap: 10 }}>
                <span className="t-sm">다음 추천</span>
                <span style={{ fontWeight: 800, fontSize:'calc(13px * var(--app-fs-scale))', color:'var(--app-primary-deep)' }}>생명언어의 삶 → 새로운 삶</span>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: 16, padding: 14, borderRadius: 'var(--app-r-m)',
            background: 'var(--app-primary-soft)',
            display:'flex', alignItems:'center', gap: 12,
          }}>
            <Avatar name="박" size={36} seed="박귀원"/>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize:'calc(13px * var(--app-fs-scale))', color:'var(--app-primary-deep)' }}>박귀원</div>
              <div className="t-xs">삶공부 팀장</div>
            </div>
          </div>
        </div>

        <div className="hr" style={{ background:'rgba(30,41,32,0.05)', height: 8 }}/>

        <div style={{ padding: '18px 18px 0' }}>
          <div className="t-h3" style={{ marginBottom: 12 }}>수업 일정·출결</div>
          <div className="card" style={{ padding: 14, boxShadow:'0 1px 3px rgba(20,30,18,0.05)' }}>
            <div style={{ padding: 12, borderRadius:'var(--app-r-s)', background:'var(--app-primary-soft)', marginBottom: 10 }}>
              <div className="t-xs">다음 수업</div>
              <div style={{ marginTop: 3, fontWeight: 850, fontSize:'calc(15px * var(--app-fs-scale))' }}>6.24 수 19:30 · 본당 3층 소예배실</div>
            </div>
            {schedule.map((s, i) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap: 10, padding:'11px 0',
                borderBottom: i < schedule.length - 1 ? '1px solid var(--app-line)' : 'none',
              }}>
                <div style={{ width: 48, fontWeight: 800, fontSize:'calc(12px * var(--app-fs-scale))', color:'var(--app-primary-deep)' }}>{s.week}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize:'calc(14px * var(--app-fs-scale))' }}>{s.title}</div>
                  <div className="t-xs" style={{ marginTop: 2 }}>{s.date}</div>
                </div>
                <span className={'badge ' + (s.attendance === '출석' ? 'badge-primary' : s.attendance === '지각' ? 'badge-amber' : 'badge-mute')}>{s.attendance}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 내 수강 */}
        <div style={{ padding: '18px' }}>
          <div className="t-h3">내 수강 현황</div>
          <div style={{
            marginTop: 12, padding: 16, borderRadius: 'var(--app-r-m)',
            background: 'linear-gradient(135deg, #F4F8EE, #E9EFDC)',
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
              <div style={{ fontSize:'calc(13px * var(--app-fs-scale))', fontWeight: 600, color:'var(--app-primary-deep)' }}>진도율</div>
              <div style={{ fontSize:'calc(20px * var(--app-fs-scale))', fontWeight: 800, color:'var(--app-primary-deep)', letterSpacing:'-0.02em' }}>4 / 13 <span style={{ fontSize:'calc(13px * var(--app-fs-scale))', fontWeight: 600 }}>주차</span></div>
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

        <div style={{ padding: '0 18px 18px' }}>
          <div className="t-h3" style={{ marginBottom: 12 }}>과제·평가</div>
          <div style={{ display:'grid', gap: 10 }}>
            {assignments.map((a, i) => (
              <div key={i} className="card" style={{ padding: 14, boxShadow:'0 1px 3px rgba(20,30,18,0.05)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', gap: 10, alignItems:'center' }}>
                  <div>
                    <div className="t-xs">{a.week}</div>
                    <div style={{ marginTop: 3, fontWeight: 850, fontSize:'calc(14px * var(--app-fs-scale))' }}>{a.title}</div>
                  </div>
                  <span className={'badge ' + (a.state === '제출 완료' ? 'badge-primary' : 'badge-amber')}>{a.state}</span>
                </div>
              </div>
            ))}
            <button className="btn btn-soft" style={{ width:'100%', justifyContent:'center' }}>평가 설문 작성하기</button>
            <div className="t-xs" style={{ textAlign:'center' }}>외부 설문 링크로 이동합니다.</div>
          </div>
        </div>

        <div style={{ padding: '0 18px 18px' }}>
          <div className="t-h3" style={{ marginBottom: 12 }}>공지사항</div>
          <div style={{ display:'grid', gap: 10 }}>
            {notices.map((n, i) => (
              <div key={i} className="card" style={{ padding: 14, boxShadow:'0 1px 3px rgba(20,30,18,0.05)' }}>
                <div style={{ display:'flex', alignItems:'center', gap: 6 }}>
                  <span className="badge badge-amber">{n.scope}</span>
                  <span className="t-xs">{n.read}</span>
                </div>
                <div style={{ marginTop: 8, fontWeight: 850, fontSize:'calc(14px * var(--app-fs-scale))', lineHeight: 1.45 }}>{n.title}</div>
              </div>
            ))}
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
        <button className="btn btn-soft" style={{ minWidth: 104, padding:'0 16px' }}>수강 신청</button>
        <button className="btn btn-primary" style={{ flex: 1 }}>수강 상태 보기</button>
      </div>
    </Phone>
  );
}

Object.assign(window, { ScreenStudyList, ScreenStudyDetail });
