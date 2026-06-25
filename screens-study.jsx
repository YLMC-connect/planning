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

function ScreenStudyList({ variant = 'default' } = {}) {
  const isAdmin = variant === 'admin';
  const [courseTab, setCourseTab] = useState(variant === 'optional' ? 'optional' : 'required');
  const required = LIFE_STUDY_REQUIRED;
  const optional = LIFE_STUDY_OPTIONAL;
  const openCourses = [
    { name:'생명의 삶', type:'필수', weeks:'13주', leader:'박귀원', period:'6.24 ~ 7.05', seats:'18 / 24명', summary:'신앙의 근본을 바로 세우는 가장 기본 과정' },
    { name:'생명언어의 삶', type:'선택', weeks:'13주', leader:'김숙자 이연홍', period:'6.24 ~ 7.05', seats:'10 / 16명', summary:'하나님 자녀의 품격에 맞는 언어습관 훈련' },
    { name:'기도의 삶', type:'선택', weeks:'8주', leader:'김경숙', period:'6.24 ~ 7.05', seats:'12 / 20명', summary:'중보기도 원칙과 실제 적용을 배우는 과정' },
  ];

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
                필수 과정을 순서대로 이어가면 다음 삶공부를 신청할 수 있어요.
              </div>
              <div style={{ marginTop: 12, display:'grid', gap: 8 }}>
                <button className="btn btn-soft" style={{ width:'100%', justifyContent:'center' }}>수강 내역 보기</button>
              </div>
            </div>
          </div>
        </Section>

        <Section title="지금 신청 가능한 과정">
          <div style={{ padding:'0 18px', display:'flex', flexDirection:'column', gap: 12 }}>
            {openCourses.map((c, i) => (
              <div key={i} className="card" style={{ padding: 16, position:'relative', overflow:'hidden' }}>
                <div style={{
                  position:'absolute', right: -18, top: -18,
                  width: 96, height: 96, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--app-primary-soft), rgba(255,255,255,0))',
                }}/>
                <div style={{ position:'relative', zIndex: 1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap: 6, flexWrap:'wrap' }}>
                    <span className="badge badge-amber">신청 기간</span>
                    <span className="badge badge-mute">{c.type}</span>
                    <span className="t-xs">{c.weeks} · {c.leader}</span>
                  </div>
                  <div className="t-h2" style={{ marginTop: 8 }}>{c.name}</div>
                  <div className="t-sm" style={{ marginTop: 5, lineHeight: 1.5 }}>{c.summary}</div>
                  <div style={{ marginTop: 12, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8 }}>
                    <div style={{ padding: 10, borderRadius:'var(--app-r-s)', background:'var(--app-surface-2)' }}>
                      <div className="t-xs">신청 기간</div>
                      <div style={{ marginTop: 3, fontWeight: 850, fontSize:'calc(13px * var(--app-fs-scale))' }}>{c.period}</div>
                    </div>
                    <div style={{ padding: 10, borderRadius:'var(--app-r-s)', background:'var(--app-surface-2)' }}>
                      <div className="t-xs">정원</div>
                      <div style={{ marginTop: 3, fontWeight: 850, fontSize:'calc(13px * var(--app-fs-scale))' }}>{c.seats}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="전체 과정">
          <SegTabs
            active={courseTab}
            onChange={setCourseTab}
            items={[
              { key:'required', label:'필수 과정' },
              { key:'optional', label:'선택 과정' },
            ]}
          />
          {courseTab === 'required' ? (
            <div style={{ padding:'14px 18px 0', display:'flex', flexDirection:'column', gap: 12 }}>
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
          ) : (
            <div style={{ padding:'14px 18px 0', display:'flex', flexDirection:'column', gap: 12 }}>
              {optional.map((c, i) => (
                <div key={i} className="card" style={{ padding: 16, position:'relative', overflow:'hidden' }}>
                  <div style={{
                    position:'absolute', right: -10, top: -10,
                    width: 90, height: 90, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #DDE5CD, #6B826044)',
                    opacity: .6,
                  }}/>
                  <div style={{ position:'relative', zIndex: 1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap: 6, flexWrap:'wrap' }}>
                      <span className="badge badge-mute">선택</span>
                      <span className="badge badge-mute">대기</span>
                      <span className="t-xs">{c.weeks} · {c.leader}</span>
                    </div>
                    <div className="t-h2" style={{ marginTop: 8, letterSpacing:'-0.015em' }}>{c.name}</div>
                    <div className="t-sm" style={{ marginTop: 4, lineHeight: 1.55 }}>{c.summary}</div>
                    <div className="t-xs" style={{ marginTop: 7, fontWeight: 700, color:'var(--app-primary-deep)' }}>신청대상: {c.target}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>
        {isAdmin && (
          <Section title="내 담당 관리">
            <div style={{ padding:'0 18px' }}>
              <div className="card" style={{ padding: 16, display:'flex', alignItems:'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius:'var(--app-r-s)',
                  background:'var(--app-primary-soft)', color:'var(--app-primary-deep)',
                  display:'grid', placeItems:'center', flexShrink: 0,
                }}>{Icon.book(21)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 850, fontSize:'calc(15px * var(--app-fs-scale))' }}>내 담당 삶공부</div>
                  <div className="t-sm" style={{ marginTop: 4 }}>담당 과정의 신청자, 출결, 숙제, 공지만 관리합니다.</div>
                </div>
                <span style={{ color:'var(--app-ink-mute)' }}>{Icon.chevron(18)}</span>
              </div>
            </div>
          </Section>
        )}
        <div style={{ height: 12 }}/>
      </div>

      <TabBar active="study" />
    </Phone>
  );
}

// ─────────────────────────────────────────────────────────────
// 삶공부 상세
// ─────────────────────────────────────────────────────────────
function ScreenStudyDetail({ variant = 'not-enrolled' } = {}) {
  const isEnrolled = variant === 'enrolled';
  const isNotEnrolled = !isEnrolled;
  const [modal] = useState(
    variant === 'applied-modal' ? 'applied' :
    variant === 'blocked-modal' ? 'blocked' :
    null
  );
  const course = {
    name: '생명의 삶',
    leader: '박귀원',
    desc: '구원의 확신이 있는지, 지금 죽는다 해도 천국에 갈 수 있는지, 신앙의 근본을 바로 잡도록 돕는 가장 기본적인 삶공부입니다.',
    target: '등록교인 누구나',
    requirement: '등록교인 누구나 신청할 수 있어요',
    next: '생명언어의 삶 → 새로운 삶',
  };
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
    { week:'4주차', title:'구원의 확신 나눔지', state:'미확인' },
    { week:'3주차', title:'성경 읽기 적용 기록', state:'제출 확인' },
  ];
  const notices = [
    { title:'이번 주는 구원의 확신과 신앙의 근본을 함께 다룹니다', scope:'4주차 공지', read:'읽음 18 / 20명' },
    { title:'생명의 삶 수료 후 이후 필수·선택 과정을 신청할 수 있어요', scope:'전체 공지', read:'읽음 16 / 20명' },
  ];
  const statusBadge = isNotEnrolled
    ? { label: '신청 가능', className: 'badge-amber' }
    : { label: '진행중', className: 'badge-primary' };
  const cta = isNotEnrolled
    ? { label: '수강 신청', className: 'btn-primary' }
    : { label: '수강 내역 보기', className: 'btn-primary' };
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
            <span className={'badge ' + statusBadge.className}>{statusBadge.label}</span>
            <span className="badge badge-mute">{isEnrolled ? '4주차' : '개설 예정'}</span>
            <span className="t-xs">13주 · 매주 수요일 19:30</span>
          </div>
          <div className="t-display" style={{ marginTop: 10, letterSpacing:'-0.02em' }}>
            {course.name}
          </div>
          <div className="t-body" style={{ marginTop: 12 }}>
            {course.desc}
          </div>
          <div className="card" style={{ marginTop: 14, padding: 14, boxShadow:'0 1px 3px rgba(20,30,18,0.05)' }}>
            <div className="t-xs" style={{ fontWeight: 800, color:'var(--app-ink-mute)' }}>과정 정보</div>
            <div style={{ marginTop: 10, display:'grid', gap: 8 }}>
              <div style={{ display:'flex', justifyContent:'space-between', gap: 10 }}>
                <span className="t-sm">팀장</span>
                <span style={{ fontWeight: 800, fontSize:'calc(13px * var(--app-fs-scale))' }}>{course.leader}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', gap: 10 }}>
                <span className="t-sm">교재</span>
                <span style={{ fontWeight: 800, fontSize:'calc(13px * var(--app-fs-scale))' }}>{course.name} 교재</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', gap: 10 }}>
                <span className="t-sm">수강 대상</span>
                <span style={{ fontWeight: 800, fontSize:'calc(13px * var(--app-fs-scale))' }}>{course.target}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', gap: 10 }}>
                <span className="t-sm">신청 조건</span>
                <span style={{ fontWeight: 800, fontSize:'calc(13px * var(--app-fs-scale))' }}>{course.requirement}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', gap: 10 }}>
                <span className="t-sm">다음 추천</span>
                <span style={{ fontWeight: 800, fontSize:'calc(13px * var(--app-fs-scale))', color:'var(--app-primary-deep)' }}>{course.next}</span>
              </div>
            </div>
          </div>

          {isEnrolled && (
            <div style={{ marginTop: 18 }}>
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
          )}
        </div>

        <div className="hr" style={{ background:'rgba(30,41,32,0.05)', height: 8 }}/>

        {isEnrolled ? (
          <>
        {/* 내 수강 */}
        <div style={{ padding: '18px' }}>
          <div className="t-h3">내 진행 상태</div>
          <div style={{
            marginTop: 12, padding: 16, borderRadius: 'var(--app-r-m)',
            background: 'linear-gradient(135deg, #F4F8EE, #E9EFDC)',
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
              <div style={{ fontSize:'calc(13px * var(--app-fs-scale))', fontWeight: 600, color:'var(--app-primary-deep)' }}>현재 주차</div>
              <div style={{ fontSize:'calc(20px * var(--app-fs-scale))', fontWeight: 800, color:'var(--app-primary-deep)', letterSpacing:'-0.02em' }}>4 / 13</div>
            </div>
            <div className="bar" style={{ marginTop: 10, background:'rgba(255,255,255,0.55)' }}>
              <i style={{ width: '33%' }}/>
            </div>
            <div style={{ display:'flex', gap: 10, marginTop: 14 }}>
              <div style={{ flex: 1, padding: 10, borderRadius: 'var(--app-r-s)', background: 'rgba(255,255,255,0.65)' }}>
                <div className="t-xs">출석</div>
                <div style={{ fontWeight: 800, fontSize:'calc(16px * var(--app-fs-scale))', marginTop: 2 }}>4 / 4</div>
              </div>
              <div style={{ flex: 1, padding: 10, borderRadius: 'var(--app-r-s)', background: 'rgba(255,255,255,0.65)' }}>
                <div className="t-xs">숙제</div>
                <div style={{ fontWeight: 800, fontSize:'calc(16px * var(--app-fs-scale))', marginTop: 2 }}>3 / 4</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '18px 18px 0' }}>
          <div className="t-h3" style={{ marginBottom: 12 }}>이번 수업·출결</div>
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

        <div style={{ padding: '0 18px 18px' }}>
          <div className="t-h3">숙제 확인</div>
          <div className="t-xs" style={{ marginTop: 4, marginBottom: 12 }}>관리자가 확인한 제출 여부만 보여줍니다.</div>
          <div style={{ display:'grid', gap: 10 }}>
            {assignments.map((a, i) => (
              <div key={i} className="card" style={{ padding: 14, boxShadow:'0 1px 3px rgba(20,30,18,0.05)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', gap: 10, alignItems:'center' }}>
                  <div>
                    <div className="t-xs">{a.week}</div>
                    <div style={{ marginTop: 3, fontWeight: 850, fontSize:'calc(14px * var(--app-fs-scale))' }}>{a.title}</div>
                  </div>
                  <span className={'badge ' + (a.state === '제출 확인' ? 'badge-primary' : 'badge-amber')}>{a.state}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
          </>
        ) : (
          <div style={{ padding: '18px 18px 0' }}>
            <div className="t-h3" style={{ marginBottom: 12 }}>신청 안내</div>
            <div className="card" style={{ padding: 14, display:'grid', gap: 9, boxShadow:'0 1px 3px rgba(20,30,18,0.05)' }}>
              {[
                ['신청 기간', '6.24 ~ 7.05'],
                ['개강', '2026.07.08'],
                ['시간', '매주 수요일 19:30'],
                ['장소', '본당 3층 소예배실'],
                ['정원', '18 / 24명'],
              ].map(([label, value]) => (
                <div key={label} style={{ display:'flex', justifyContent:'space-between', gap: 12 }}>
                  <span className="t-sm">{label}</span>
                  <span style={{ fontWeight: 850, fontSize:'calc(13px * var(--app-fs-scale))' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

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
                  background: isEnrolled && w.current ? 'var(--app-primary)' : isEnrolled && w.done ? 'var(--app-primary-soft)' : 'rgba(30,41,32,0.05)',
                  color: isEnrolled && w.current ? '#fff' : isEnrolled && w.done ? 'var(--app-primary-deep)' : 'var(--app-ink-mute)',
                  fontWeight: 700, fontSize:'calc(11px * var(--app-fs-scale))',
                }}>
                  {isEnrolled && w.done && !w.current ? Icon.check(14) : w.wk}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="t-xs" style={{ fontWeight: 600 }}>WEEK {w.wk}</div>
                  <div style={{
                    fontSize:'calc(14px * var(--app-fs-scale))',
                    fontWeight: isEnrolled && w.current ? 700 : 500,
                    color: isEnrolled && w.done && !w.current ? 'var(--app-ink-mute)' : 'var(--app-ink)',
                  }}>{w.t}</div>
                </div>
                {isEnrolled && w.current && <span className="badge badge-primary">이번주</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <button className={'btn ' + cta.className} disabled={cta.disabled} style={{ flex: 1 }}>{cta.label}</button>
      </div>
      {modal === 'applied' && (
        <AlertDialog
          title="이미 신청한 과정이에요"
          message="신청 상태는 수강 내역에서 확인할 수 있어요."
          cancelText="닫기"
          confirmText="수강 내역 보기"
        />
      )}
      {modal === 'blocked' && (
        <AlertDialog
          title="지금은 신청할 수 없어요"
          message="생명의 삶 수료 후 신청할 수 있는 과정입니다."
          cancelText={null}
          confirmText="확인"
        />
      )}
    </Phone>
  );
}

Object.assign(window, { ScreenStudyList, ScreenStudyDetail });
