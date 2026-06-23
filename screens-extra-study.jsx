// 열린문 커넥트 — 추가 화면 (삶공부)

// ─── 수강 신청 ───
function ScreenStudyApply({ variant = 'form' }) {
  if (variant === 'complete') {
    return (
      <Phone>
        <TopBar title="수강 신청 완료"/>
        <div className="phone-body" style={{ padding:'20px 18px' }}>
          <div className="card" style={{ padding: 22, textAlign:'center' }}>
            <div style={{
              width: 58, height: 58, borderRadius: '50%',
              margin: '0 auto',
              display:'grid', placeItems:'center',
              background:'var(--app-primary)', color:'#fff',
            }}>{Icon.check(28)}</div>
            <div className="t-h2" style={{ marginTop: 16 }}>신청이 접수됐어요</div>
            <div className="t-sm" style={{ marginTop: 8, lineHeight: 1.55 }}>
              생명의 삶 수강 신청이 완료되었습니다. 신청 상태는 수강 내역에서 확인할 수 있어요.
            </div>
          </div>

          <Section title="신청 정보" style={{ marginTop: 20 }}>
            <div style={{ padding:'0 18px' }}>
              <div className="card" style={{ padding: 16, display:'grid', gap: 10 }}>
                {[
                  ['과정', '생명의 삶'],
                  ['일정', '매주 수 19:30'],
                  ['상태', '신청 완료'],
                ].map(([label, value]) => (
                  <div key={label} style={{ display:'flex', justifyContent:'space-between', gap: 12 }}>
                    <span className="t-sm">{label}</span>
                    <span style={{ fontWeight: 850, fontSize:'calc(13px * var(--app-fs-scale))' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
        <div className="bottom-bar">
          <button className="btn btn-soft" style={{ width: 110 }}>과정 목록</button>
          <button className="btn btn-primary" style={{ flex: 1 }}>수강 상태 보기</button>
        </div>
      </Phone>
    );
  }

  return (
    <Phone>
      <TopBar title="수강 신청"/>
      <div className="phone-body" style={{ padding:'4px 18px 20px' }}>
        {/* 과정 요약 */}
        <div className="card" style={{ padding: 16, marginBottom: 20, display:'flex', gap: 12, alignItems:'center' }}>
          <Cover w={72} h={72} seed={1} icon={Icon.book(20)}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight:700, fontSize:'calc(15px * var(--app-fs-scale))' }}>생명의 삶</div>
            <div className="t-sm" style={{ color:'var(--app-ink-mute)', marginTop: 4, lineHeight: 1.5 }}>
              매주 수 19:30 · 본당 3층 소예배실<br/>2026.07.08 ~ 2026.10.07 (총 13주)
            </div>
          </div>
        </div>
        <div style={{
          padding: 14,
          borderRadius:'var(--app-r-m)',
          background:'var(--app-primary-soft)',
          marginBottom: 20,
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', gap: 10 }}>
            <span className="t-sm">신청 기간</span>
            <span style={{ fontWeight: 850, fontSize:'calc(13px * var(--app-fs-scale))' }}>6.24 ~ 7.05</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', gap: 10, marginTop: 8 }}>
            <span className="t-sm">정원</span>
              <span style={{ fontWeight: 850, fontSize:'calc(13px * var(--app-fs-scale))' }}>18 / 24명</span>
          </div>
          <div className="t-xs" style={{ marginTop: 8 }}>생명의 삶은 이후 필수·선택 과정을 위한 첫 과정입니다.</div>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap: 20 }}>
          <FormField label="이름">
            <input className="input" defaultValue="김은혜"/>
          </FormField>
          <div style={{ display:'flex', gap: 12 }}>
            <FormField label="연락처" style={{ flex: 1 }}>
              <input className="input" defaultValue="010-1234-5678"/>
            </FormField>
            <FormField label="생년" style={{ flex: 1 }}>
              <input className="input" defaultValue="1988"/>
            </FormField>
          </div>
          <FormField label="소속 부서">
            <input className="input" placeholder="예) 4부 청장년부"/>
          </FormField>
          <FormField label="신앙 연차">
            <div style={{ display:'flex', gap: 6, flexWrap:'wrap' }}>
              {['1년 미만','1-3년','3-5년','5-10년','10년 이상'].map((c,i) => (
                <div key={i} className={'chip' + (i===3 ? ' on' : '')}>{c}</div>
              ))}
            </div>
          </FormField>
          <FormField label="신청 동기">
            <textarea className="input" rows={4} placeholder="신청하시는 이유를 자유롭게 적어주세요" style={{ resize:'none', fontFamily:'inherit' }}/>
          </FormField>
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
                13주 과정 중 80% 이상 출석하며, 매주 묵상 과제를 성실히 수행하겠습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-primary" style={{ flex: 1 }}>수강 신청하기</button>
      </div>
    </Phone>
  );
}

// ─── 수강 내역 ───
function ScreenStudyHistory() {
  const ongoing = [
    { name:'생명의 삶', when:'2026.07 ~ 2026.10', progress: 31, week:'4/13주차', status:'수강 중', next:'다음 수업 6.24 수 19:30', seed:1 },
  ];
  const waiting = [
    { name:'생명언어의 삶', when:'생명의 삶 수료 후 추천', status:'대기', next:'다음 추천 과정', seed:2 },
  ];
  const history = [
    { name:'말씀통독의 삶', when:'2025.03 ~ 2026.02', progress: 100, status:'완료', seed:0 },
    { name:'기도의 삶', when:'2025.09 ~ 2025.11', progress: 100, status:'완료', seed:2 },
    { name:'부부의 삶', when:'2024.10 ~ 2025.01', progress: 62, status:'미수료', seed:3 },
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
                  <span className="badge badge-primary">{c.status}</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 6 }}>
                  <div className="t-sm" style={{ fontWeight: 600 }}>{c.week}</div>
                  <div className="t-sm" style={{ color:'var(--app-primary-deep)', fontWeight: 700 }}>{c.progress}%</div>
                </div>
                <div style={{ height: 6, borderRadius: 3, background:'var(--app-line)', overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${c.progress}%`, background:'var(--app-primary)', borderRadius: 3 }}/>
                </div>
                <div className="t-xs" style={{ marginTop: 8 }}>{c.next}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="대기">
          <div style={{ padding:'0 18px', display:'flex', flexDirection:'column', gap: 12 }}>
            {waiting.map((c, i) => (
              <div key={i} className="card" style={{ padding: 16, display:'flex', gap: 12, alignItems:'center' }}>
                <Cover w={56} h={56} seed={c.seed} icon={Icon.book(18)}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight:700, fontSize:'calc(15px * var(--app-fs-scale))' }}>{c.name}</div>
                  <div className="t-sm" style={{ color:'var(--app-ink-mute)', marginTop: 4 }}>{c.when}</div>
                  <div className="t-xs" style={{ marginTop: 4 }}>{c.next}</div>
                </div>
                <span className="badge badge-amber">{c.status}</span>
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
                  background: c.status === '완료' ? 'var(--app-primary)' : 'var(--app-line-strong)',
                  color: c.status === '완료' ? '#fff' : 'var(--app-ink-mute)',
                  fontWeight: 700, flexShrink: 0,
                }}>{c.status}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="수료 뱃지">
          <div style={{ padding:'0 18px' }}>
            <div className="card" style={{ padding: 16, display:'flex', alignItems:'center', gap: 12 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background:'var(--app-primary-soft)',
                color:'var(--app-primary-deep)',
                display:'grid', placeItems:'center', flexShrink: 0,
              }}>{Icon.check(22)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 850, fontSize:'calc(15px * var(--app-fs-scale))' }}>수료 과목 2개</div>
                <div className="t-sm" style={{ marginTop: 4 }}>MY에서 수료 연도와 기수를 확인할 수 있어요.</div>
              </div>
              <button className="btn btn-soft" style={{ height: 38, padding:'0 14px' }}>수료 뱃지 보기</button>
            </div>
          </div>
        </Section>
      </div>
    </Phone>
  );
}

// ─── 과정 운영 관리 ───
function ScreenStudyAdminCourses() {
  const courses = [
    ...window.LIFE_STUDY_REQUIRED.map((c, i) => ({ ...c, type:'필수', learners: i === 0 ? 24 : 0 })),
    ...window.LIFE_STUDY_OPTIONAL.map((c) => ({ ...c, type:'선택', status:'신청가능', learners: 0 })),
  ];
  return (
    <Phone>
      <TopBar title="삶공부 운영 관리"/>
      <div className="phone-body">
        <Section title="과정 목록">
          <div style={{ padding:'0 18px', display:'grid', gap: 12 }}>
            {courses.map((c, i) => (
              <div key={i} className="card" style={{ padding: 15, boxShadow:'0 1px 3px rgba(20,30,18,0.05)' }}>
                <div style={{ display:'flex', alignItems:'center', gap: 6, flexWrap:'wrap' }}>
                  <span className="badge badge-mute">{c.type}</span>
                  <span className={'badge ' + (c.status === '진행중' ? 'badge-primary' : 'badge-amber')}>{c.status}</span>
                </div>
                <div style={{ marginTop: 8, fontWeight: 900, fontSize:'calc(16px * var(--app-fs-scale))' }}>{c.name}</div>
                <div style={{ marginTop: 10, display:'grid', gap: 7 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', gap: 10 }}>
                    <span className="t-sm">팀장</span>
                    <span style={{ fontWeight: 800, fontSize:'calc(13px * var(--app-fs-scale))' }}>{c.leader}</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', gap: 10 }}>
                    <span className="t-sm">기간</span>
                    <span style={{ fontWeight: 800, fontSize:'calc(13px * var(--app-fs-scale))' }}>{c.weeks}</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', gap: 10 }}>
                    <span className="t-sm">학습자</span>
                    <span style={{ fontWeight: 800, fontSize:'calc(13px * var(--app-fs-scale))' }}>{c.learners}명</span>
                  </div>
                </div>
                <div style={{ marginTop: 12, padding: 11, borderRadius:'var(--app-r-s)', background:'var(--app-primary-soft)' }}>
                  <div className="t-xs">다음 운영 항목</div>
                  <div style={{ marginTop: 3, fontWeight: 850, fontSize:'calc(14px * var(--app-fs-scale))' }}>{c.summary}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="오늘 관리할 항목">
          <div style={{ padding:'0 18px', display:'grid', gap: 10 }}>
            {['출결 입력 2건', '보강 일정 확인 1건', '공지 읽음 미확인 4명'].map((item, i) => (
              <div key={i} className="card" style={{ padding: 14, display:'flex', alignItems:'center', justifyContent:'space-between', boxShadow:'0 1px 3px rgba(20,30,18,0.05)' }}>
                <span style={{ fontWeight: 850, fontSize:'calc(14px * var(--app-fs-scale))' }}>{item}</span>
                <span style={{ color:'var(--app-ink-mute)' }}>{Icon.chevron(18)}</span>
              </div>
            ))}
          </div>
        </Section>
        <div style={{ height: 12 }}/>
      </div>
    </Phone>
  );
}

function ScreenStudyAdminSessions() {
  const learners = [
    { name:'김은혜', state:'출석' },
    { name:'박정아', state:'지각' },
    { name:'이수진', state:'결석' },
    { name:'정혜진', state:'출석' },
  ];
  return (
    <Phone>
      <TopBar title="수업 관리"/>
      <div className="phone-body">
        <Section title="생명의 삶 4주차">
          <div style={{ padding:'0 18px', display:'grid', gap: 12 }}>
            <div className="card" style={{ padding: 16 }}>
              <div className="t-xs" style={{ fontWeight: 800, color:'var(--app-primary-deep)' }}>다음 수업</div>
              <div style={{ marginTop: 6, fontWeight: 900, fontSize:'calc(17px * var(--app-fs-scale))' }}>6.24 수 19:30</div>
              <div className="t-sm" style={{ marginTop: 5 }}>본당 3층 소예배실 · 신앙의 근본 세우기</div>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap: 10 }}>
                <div style={{ fontWeight: 850 }}>보강 일정</div>
                <span className="badge badge-amber">등록 필요</span>
              </div>
              <div className="t-sm" style={{ marginTop: 8, lineHeight: 1.5 }}>
                3주차 결석자 1명에게 보강 일정을 안내해야 합니다.
              </div>
              <button className="btn btn-soft" style={{ width:'100%', marginTop: 12, justifyContent:'center' }}>보강 일정 등록</button>
            </div>
          </div>
        </Section>

        <Section title="출결 입력">
          <div style={{ padding:'0 18px', display:'grid', gap: 10 }}>
            {learners.map((learner) => (
              <div key={learner.name} className="card" style={{ padding: 14, display:'flex', alignItems:'center', gap: 10 }}>
                <Avatar name={learner.name} size={36} seed={learner.name}/>
                <div style={{ flex: 1, fontWeight: 850, fontSize:'calc(14px * var(--app-fs-scale))' }}>{learner.name}</div>
                {['출석','지각','결석'].map((state) => (
                  <span key={state} className={'badge ' + (learner.state === state ? 'badge-primary' : 'badge-mute')}>{state}</span>
                ))}
              </div>
            ))}
          </div>
        </Section>

        <Section title="공지 읽음 확인">
          <div style={{ padding:'0 18px', display:'grid', gap: 10 }}>
            {[
              ['4주차 과제 안내', '읽음 18 / 20명', '미읽음 2명'],
              ['보강 일정 공지', '읽음 9 / 10명', '미읽음 1명'],
            ].map(([title, read, unread]) => (
              <div key={title} className="card" style={{ padding: 14 }}>
                <div style={{ fontWeight: 850, fontSize:'calc(14px * var(--app-fs-scale))' }}>{title}</div>
                <div style={{ marginTop: 8, display:'flex', gap: 6, flexWrap:'wrap' }}>
                  <span className="badge badge-primary">{read}</span>
                  <span className="badge badge-amber">{unread}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <div style={{ height: 12 }}/>
      </div>
    </Phone>
  );
}

Object.assign(window, { ScreenStudyApply, ScreenStudyHistory, ScreenStudyAdminCourses, ScreenStudyAdminSessions });
