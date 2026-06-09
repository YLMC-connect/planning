// 열린문 커넥트 — 중보기도 추가 화면 (FUNC-042, 046, 047, 051~055)

const PRAYER_CATEGORIES = ['구원', '치유', '자녀', '일반'];

function FixedPrayerRoomGrid({ selected = '화-오후' }) {
  const [day, time] = selected.split('-');
  return (
    <div className="card" style={{
      padding: 14,
      border: '1px solid rgba(91,122,176,0.22)',
      boxShadow: '0 1px 3px rgba(20,30,18,0.05)',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    }}>
      <PrayerDayBadge day={day} time={time} size={42} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>{PRAYER_DAY_NAMES[day]} {time} 기도방</div>
        <div className="t-xs" style={{ marginTop: 4 }}>현재 관리 중인 기도방</div>
      </div>
      <button className="btn btn-line btn-sm" style={{ height: 34, padding: '0 12px' }}>변경</button>
    </div>
  );
}

function ScreenPrayerApply() {
  const [selectedDay, setSelectedDay] = useState('월');
  const [selectedTime, setSelectedTime] = useState('오전');
  const selectedLabel = `${PRAYER_DAY_NAMES[selectedDay]} ${selectedTime} 기도방`;

  return (
    <Phone>
      <TopBar title="기도방 참여 신청" />
      <div className="phone-body" style={{ padding: '4px 18px 118px' }}>
        <div style={{
          padding: '14px 16px',
          borderRadius: 'var(--app-r-m)',
          background: 'var(--app-primary-soft)',
          color: 'var(--app-primary-deep)',
          fontSize: 'calc(13px * var(--app-fs-scale))',
          lineHeight: 1.55,
          marginBottom: 18,
        }}>
          먼저 요일을 고르고, 그 다음 오전/오후 중 하나를 선택합니다. 승인 전에는 기도제목을 볼 수 없습니다.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <div className="t-sm" style={{ marginBottom: 8, fontWeight: 700, color: 'var(--app-ink-soft)' }}>1. 요일 선택</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PRAYER_DAYS.map(day => {
                const on = day === selectedDay;
                return (
                  <button
                    key={day}
                    className="btn btn-line"
                    onClick={() => setSelectedDay(day)}
                    style={{
                      width: '100%',
                      height: 54,
                      justifyContent: 'space-between',
                      borderRadius: 'var(--app-r-m)',
                      padding: '0 16px',
                      background: on ? 'var(--app-primary-soft)' : '#fff',
                      borderColor: on ? 'var(--app-primary)' : 'var(--app-line)',
                      color: on ? 'var(--app-primary-deep)' : 'var(--app-ink)',
                      boxShadow: on ? '0 4px 12px -8px rgba(91,122,176,0.55)' : 'none',
                    }}
                  >
                    <span>{PRAYER_DAY_NAMES[day]}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 'calc(12px * var(--app-fs-scale))', opacity: on ? 1 : 0.6 }}>
                      {on && Icon.check(13)} {on ? '선택됨' : '선택'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="t-sm" style={{ marginBottom: 8, fontWeight: 700, color: 'var(--app-ink-soft)' }}>2. 시간 선택</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {['오전', '오후'].map(time => {
                const on = time === selectedTime;
                return (
                  <button
                    key={time}
                    className="btn btn-line"
                    onClick={() => setSelectedTime(time)}
                    style={{
                      height: 58,
                      borderRadius: 'var(--app-r-m)',
                      background: on ? 'var(--app-primary-soft)' : '#fff',
                      borderColor: on ? 'var(--app-primary)' : 'var(--app-line)',
                      color: on ? 'var(--app-primary-deep)' : 'var(--app-ink)',
                      boxShadow: on ? '0 4px 12px -8px rgba(91,122,176,0.55)' : 'none',
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      {on && Icon.check(13)} {time} 기도방
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card" style={{ padding: 15, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>신청자 정보</div>
            <FormField label="이름">
              <input className="input" defaultValue="김은혜" />
            </FormField>
            <FormField label="연락처">
              <input className="input" defaultValue="010-1234-5678" />
            </FormField>
            <FormField label="신청 메모">
              <textarea className="input" rows={3} placeholder="기도방 참여를 희망하는 이유를 적어주세요" style={{ resize: 'none', fontFamily: 'inherit' }} />
            </FormField>
          </div>

          <div style={{
            padding: 14,
            borderRadius: 'var(--app-r-m)',
            background: 'var(--app-surface)',
            border: '1px solid var(--app-line)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-amber">승인 대기</span>
              <span style={{ fontWeight: 800, fontSize: 'calc(14px * var(--app-fs-scale))' }}>신청 후 중복 신청은 제한됩니다</span>
            </div>
            <div className="t-sm" style={{ marginTop: 8, lineHeight: 1.5 }}>중보기도 관리자가 승인하면 내 기도방에 표시됩니다.</div>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 18, right: 18, bottom: 24, zIndex: 5 }}>
        <button className="btn btn-primary" style={{ width: '100%', height: 54 }}>
          {selectedLabel} 신청하기
        </button>
      </div>
    </Phone>
  );
}

function ScreenPrayerApproval() {
  const applications = [
    { name: '김은혜', room: '화요일 오후 기도방', requestedAt: '오늘 10:24', status: '승인 대기', tone: 'badge-amber', active: true },
    { name: '박지훈', room: '목요일 오전 기도방', requestedAt: '어제 18:12', status: '승인 완료', tone: 'badge-primary', active: false },
    { name: '이서연', room: '토요일 오후 기도방', requestedAt: '어제 09:40', status: '거절됨', tone: 'badge-mute', active: false },
  ];

  return (
    <Phone>
      <TopBar title="참가 신청 관리" />
      <div className="phone-body" style={{ padding: '4px 18px 22px' }}>
        <div style={{
          padding: 14,
          borderRadius: 'var(--app-r-m)',
          background: 'var(--app-primary-soft)',
          color: 'var(--app-primary-deep)',
          fontSize: 'calc(13px * var(--app-fs-scale))',
          lineHeight: 1.55,
          marginBottom: 14,
        }}>
          승인된 신청자만 해당 기도방의 중보기도요원으로 등록됩니다.
        </div>

        <div className="card" style={{ padding: 15, marginBottom: 14, boxShadow: '0 1px 3px rgba(20,30,18,0.05)' }}>
          <div className="t-xs">승인 대기</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10, marginTop: 4 }}>
            <div style={{ fontSize: 'calc(26px * var(--app-fs-scale))', fontWeight: 850 }}>1건</div>
            <div className="t-xs">전체 신청 3건</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {applications.map((item, i) => (
            <div key={i} className="card" style={{ padding: 15, boxShadow: '0 1px 3px rgba(20,30,18,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span className={`badge ${item.tone}`}>{item.status}</span>
                    <span className="badge badge-mute">{item.requestedAt}</span>
                  </div>
                  <div style={{ marginTop: 9, fontWeight: 850, fontSize: 'calc(16px * var(--app-fs-scale))' }}>{item.name}</div>
                  <div className="t-sm" style={{ marginTop: 5 }}>{item.room}</div>
                </div>
                {Icon.chevron(18)}
              </div>

              {item.active ? (
                <>
                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    <button className="btn btn-primary" style={{ flex: 1, height: 42 }}>승인</button>
                    <button className="btn btn-line" style={{ flex: 1, height: 42 }}>거절</button>
                  </div>
                  <textarea
                    className="input"
                    rows={2}
                    placeholder="거절 사유를 입력할 수 있어요"
                    style={{ marginTop: 10, resize: 'none', fontFamily: 'inherit' }}
                  />
                </>
              ) : (
                <div className="t-xs" style={{ marginTop: 12 }}>이미 처리된 신청은 다시 변경할 수 없어요.</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

function AdminPrayerMetric({ label, value }) {
  return (
    <div className="card" style={{ padding: 13, boxShadow: '0 1px 3px rgba(20,30,18,0.05)' }}>
      <div className="t-xs">{label}</div>
      <div style={{ marginTop: 4, fontSize: 'calc(21px * var(--app-fs-scale))', fontWeight: 850 }}>{value}</div>
    </div>
  );
}

function ScreenPrayerMembers() {
  const members = [
    { name: '정하은', role: '요일별 팀장', since: '2026.04.01', status: '참여중', tone: 'badge-primary' },
    { name: '김은혜', role: '중보기도요원', since: '2026.05.12', status: '참여중', tone: 'badge-primary' },
    { name: '박지훈', role: '중보기도요원', since: '2026.05.20', status: '일시중지', tone: 'badge-amber' },
  ];
  return (
    <Phone>
      <TopBar title="기도방 멤버 관리" />
      <div className="phone-body" style={{ padding: '4px 18px 22px' }}>
        <FixedPrayerRoomGrid selected="월-오전" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
          <AdminPrayerMetric label="현재 멤버" value="12명" />
          <AdminPrayerMetric label="오늘 완료" value="9/12" />
        </div>

        <div className="card" style={{ marginTop: 14, padding: 15, background: 'var(--app-primary-soft)', boxShadow: 'none' }}>
          <div style={{ fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>월요일 오전 기도방</div>
          <div className="t-sm" style={{ marginTop: 6, color: 'var(--app-primary-deep)', lineHeight: 1.5 }}>
            요일별 팀장은 담당 기도방 멤버만 관리할 수 있습니다.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
          {members.map((m, i) => (
            <div key={i} className="card" style={{ padding: 15, boxShadow: '0 1px 3px rgba(20,30,18,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span className={`badge ${m.tone}`}>{m.status}</span>
                    <span className="badge badge-mute">{m.role}</span>
                  </div>
                  <div style={{ marginTop: 9, fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>{m.name}</div>
                  <div className="t-sm" style={{ marginTop: 5 }}>등록일 {m.since}</div>
                </div>
                <button className="btn btn-line" style={{ width: 72, height: 38, flexShrink: 0 }}>제외</button>
              </div>
            </div>
          ))}
        </div>

        <AlertDialog
          title="멤버를 제외할까요?"
          message="제외하면 해당 기도방의 기도제목 조회와 완료표에서 제외됩니다."
          cancelText="취소"
          confirmText="제외"
          danger
        />
      </div>
    </Phone>
  );
}

function ScreenPrayerModeration() {
  return (
    <Phone>
      <TopBar title="기도제목 검토" />
      <div className="phone-body" style={{ padding: '4px 18px 112px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <span className="badge badge-amber">접수</span>
          <span className="badge badge-mute">치유</span>
          <span className="badge badge-amber">{Icon.flame(11)} 긴급</span>
        </div>

        <div className="card" style={{ padding: 15, boxShadow: '0 1px 3px rgba(20,30,18,0.05)' }}>
          <div className="t-xs">원문</div>
          <div style={{ marginTop: 8, fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>어머니 수술 후 회복</div>
          <div className="t-sm" style={{ marginTop: 8, lineHeight: 1.6 }}>
            김○○ 권사님의 수술 후 회복과 가족의 평안을 위해 기도 부탁드립니다.
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div className="t-sm" style={{ marginBottom: 7, fontWeight: 700, color: 'var(--app-ink-soft)' }}>관리자 수정본</div>
          <textarea
            className="input"
            rows={6}
            defaultValue={'수술 후 회복과 가족의 평안을 위해 기도 부탁드립니다.'}
            style={{ resize: 'none', fontFamily: 'inherit' }}
          />
          <FieldHint>이름, 연락처, 민감 표현을 제거한 뒤 승인할 수 있어요</FieldHint>
        </div>

        <div className="card" style={{ marginTop: 14, padding: 14, background: 'var(--app-surface)', boxShadow: 'none' }}>
          <div style={{ fontWeight: 800, fontSize: 'calc(14px * var(--app-fs-scale))' }}>처리 상태</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
            {['접수', '승인', '반려'].map((s, i) => (
              <span key={s} className={'badge ' + (i === 0 ? 'badge-amber' : 'badge-mute')}>{s}</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div className="t-sm" style={{ marginBottom: 7, fontWeight: 700, color: 'var(--app-ink-soft)' }}>반려 사유</div>
          <textarea
            className="input"
            rows={3}
            placeholder="반려 시 작성자에게 보여줄 사유를 입력합니다"
            style={{ resize: 'none', fontFamily: 'inherit' }}
          />
        </div>

      </div>
      <div className="bottom-bar" style={{ bottom: 14 }}>
        <button className="btn btn-line" style={{ flex: 1 }}>반려</button>
        <button className="btn btn-primary" style={{ flex: 1 }}>승인</button>
      </div>
    </Phone>
  );
}

function ScreenPrayerTopicManage() {
  const [selectedCategory, setSelectedCategory] = useState('구원');
  const owners = {
    구원: '김하늘 관리자',
    치유: '박은혜 관리자',
    자녀: '이요셉 관리자',
    일반: '최사랑 관리자',
  };
  const topics = [
    { category: '구원', title: '가족의 예배 회복', requester: '김은혜', status: '공개중', tone: 'badge-primary', time: '오늘 08:20' },
    { category: '구원', title: '아버지의 마음이 열리도록', requester: '정하은', status: '검토중', tone: 'badge-amber', time: '오늘 07:42' },
    { category: '치유', title: '수술 후 회복', requester: '박지훈', status: '응답완료 요청중', tone: 'badge-mute', time: '어제 19:10' },
    { category: '자녀', title: '자녀 학교 적응', requester: '한수연', status: '응답완료', tone: 'badge-primary', time: '어제 10:35' },
    { category: '일반', title: '공동체 적응 감사', requester: '이준호', status: '반려', tone: 'badge-rose', time: '2일 전' },
  ];
  const visibleTopics = topics.filter(t => t.category === selectedCategory);

  return (
    <Phone>
      <TopBar title="기도제목 통합관리" />
      <div className="phone-body" style={{ padding: '4px 18px 22px' }}>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 14 }}>
          {PRAYER_CATEGORIES.map(category => {
            const on = category === selectedCategory;
            return (
              <button
                key={category}
                className={'chip' + (on ? ' on' : '')}
                onClick={() => setSelectedCategory(category)}
                style={{ border: 0 }}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="card" style={{ padding: 15, marginBottom: 14, background: 'var(--app-primary-soft)', boxShadow: 'none' }}>
          <div className="t-xs">담당 관리자</div>
          <div style={{ marginTop: 5, fontWeight: 850, fontSize: 'calc(16px * var(--app-fs-scale))' }}>
            {selectedCategory} · {owners[selectedCategory]}
          </div>
          <div className="t-sm" style={{ marginTop: 7, color: 'var(--app-primary-deep)', lineHeight: 1.45 }}>
            카테고리별 담당자는 본인 카테고리의 검토, 반려 사유, 응답완료 요청을 우선 확인합니다.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
          <AdminPrayerMetric label="검토중" value="2" />
          <AdminPrayerMetric label="공개중" value="18" />
          <AdminPrayerMetric label="응답요청" value="1" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visibleTopics.map((topic, i) => (
            <div key={i} className="card" style={{ padding: 15, boxShadow: '0 1px 3px rgba(20,30,18,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span className="badge badge-mute">{topic.category}</span>
                    <span className={`badge ${topic.tone}`}>{topic.status}</span>
                  </div>
                  <div style={{ marginTop: 9, fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>{topic.title}</div>
                  <div className="t-sm" style={{ marginTop: 5 }}>{topic.requester} · {topic.time}</div>
                </div>
                {Icon.chevron(18)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

function ScreenPrayerUrgentManage() {
  return (
    <Phone>
      <TopBar title="긴급 기도제목 관리" />
      <div className="phone-body" style={{ padding: '4px 18px 112px' }}>
        <div className="card" style={{ padding: 15, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>긴급 노출</div>
              <div className="t-sm" style={{ marginTop: 5 }}>전체 중보기도요원에게 우선 표시됩니다</div>
            </div>
            <div style={{ width: 42, height: 24, borderRadius: 999, background: 'var(--app-primary)', position: 'relative', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: 2, right: 2, width: 20, height: 20, borderRadius: '50%', background: '#fff' }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div className="t-sm" style={{ marginBottom: 6, fontWeight: 700, color: 'var(--app-ink-soft)' }}>노출 시작</div>
            <input className="input" defaultValue="오늘 09:00" />
          </div>
          <div>
            <div className="t-sm" style={{ marginBottom: 6, fontWeight: 700, color: 'var(--app-ink-soft)' }}>노출 종료</div>
            <input className="input" defaultValue="오늘 21:00" />
            <FieldHint>종료 시간은 시작 시간보다 늦어야 합니다</FieldHint>
          </div>
          <div>
            <div className="t-sm" style={{ marginBottom: 6, fontWeight: 700, color: 'var(--app-ink-soft)' }}>기도제목</div>
            <textarea className="input" rows={5} defaultValue="급한 수술 일정을 앞두고 평안과 회복을 위해 기도해주세요." style={{ resize: 'none', fontFamily: 'inherit' }} />
          </div>
        </div>

        <div className="card" style={{ marginTop: 16, padding: 15, border: '1px solid rgba(216,131,92,0.34)' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span className="badge badge-amber">{Icon.flame(11)} 긴급</span>
            <span className="badge badge-mute">오늘 09:00-21:00</span>
          </div>
          <div style={{ marginTop: 10, fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>상단 우선 노출 미리보기</div>
          <div className="t-sm" style={{ marginTop: 6, lineHeight: 1.55 }}>노출 종료 후에는 일반 진행 중 기도제목으로 유지됩니다.</div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 18, right: 18, bottom: 24, zIndex: 5 }}>
        <button className="btn btn-primary" style={{ width: '100%', height: 54 }}>
          긴급 기도제목 저장
        </button>
      </div>
    </Phone>
  );
}

function ScreenPrayerOfflineMatch() {
  const results = [
    { name: '김은혜', phone: '010-23**-6789', group: '사랑목장', status: '활성' },
    { name: '김은혜', phone: '010-98**-1020', group: '은혜목장', status: '활성' },
  ];
  return (
    <Phone>
      <TopBar title="오프라인 요청 매칭" />
      <div className="phone-body" style={{ padding: '4px 18px 22px' }}>
        <div className="card" style={{ padding: 15, marginBottom: 14, boxShadow: '0 1px 3px rgba(20,30,18,0.05)' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span className="badge badge-amber">미매칭</span>
            <span className="badge badge-mute">오프라인 접수</span>
          </div>
          <div style={{ marginTop: 10, fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>가족의 신앙 회복</div>
          <div className="t-sm" style={{ marginTop: 7, lineHeight: 1.55 }}>요청자: 김은혜 · 연락처 뒷자리 6789</div>
        </div>

        <div>
          <div className="t-sm" style={{ marginBottom: 6, fontWeight: 700, color: 'var(--app-ink-soft)' }}>회원 검색</div>
          <input className="input" defaultValue="김은혜" />
          <FieldHint>이름 또는 연락처로 실제 앱 사용자를 찾습니다</FieldHint>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
          {results.map((r, i) => (
            <div key={i} className="card" style={{ padding: 15, boxShadow: '0 1px 3px rgba(20,30,18,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>{r.name}</div>
                  <div className="t-sm" style={{ marginTop: 5 }}>{r.phone} · {r.group}</div>
                  <span className="badge badge-primary" style={{ marginTop: 8 }}>{r.status}</span>
                </div>
                <button className="btn btn-primary" style={{ width: 72, height: 40, flexShrink: 0 }}>매칭</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          padding: 14,
          borderRadius: 'var(--app-r-m)',
          background: 'var(--app-primary-soft)',
          color: 'var(--app-primary-deep)',
          fontSize: 'calc(13px * var(--app-fs-scale))',
          lineHeight: 1.55,
          marginTop: 14,
        }}>
          매칭 후에는 선택된 사용자의 기도제목으로 연결되고 수정 요청·응답 완료 요청 흐름을 적용할 수 있습니다.
        </div>
      </div>
    </Phone>
  );
}

function ScreenPrayerRequest() {
  const requests = [
    { title: '어머니 수술 후 회복', category: '치유', status: '검토중', desc: '개인정보 표현 검토 후 공개 예정', tone: 'badge-amber' },
    { title: '가족의 신앙 회복', category: '구원', status: '공개중', desc: '중보기도요원에게 공개 중', tone: 'badge-primary', active: true },
    { title: '새로운 자리에서의 평안', category: '일반', status: '반려', desc: '개인정보 표현 수정이 필요합니다', tone: 'badge-rose' },
    { title: '공동체 적응 감사', category: '일반', status: '응답완료 요청중', desc: '관리자 승인 대기', tone: 'badge-mute' },
    { title: '자녀 학교 적응', category: '자녀', status: '응답완료', desc: '기도응답으로 보관되었습니다', tone: 'badge-primary' },
  ];
  return (
    <Phone>
      <TopBar title="내 기도제목" />
      <div className="phone-body" style={{ padding: '4px 18px 112px' }}>
        <div className="card" style={{ padding: 15, marginBottom: 14, background: 'var(--app-primary-soft)', boxShadow: 'none' }}>
          <div style={{ fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>기도제목은 승인 후 공개됩니다</div>
          <div className="t-sm" style={{ marginTop: 7, color: 'var(--app-primary-deep)', lineHeight: 1.5 }}>
            이름, 개인정보, 민감 표현을 관리자가 검토한 뒤 중보기도요원에게 보여집니다.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {requests.map((r, i) => (
            <div key={i} className="card" style={{
              padding: 15,
              boxShadow: '0 1px 3px rgba(20,30,18,0.05)',
              border: r.active ? '1.5px solid var(--app-primary)' : '1px solid transparent',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span className="badge badge-mute">{r.category}</span>
                    <span className={`badge ${r.tone}`}>{r.status}</span>
                    {r.active && <span className="badge badge-primary">선택됨</span>}
                  </div>
                  <div style={{ marginTop: 9, fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>{r.title}</div>
                  <div className="t-sm" style={{ marginTop: 5 }}>{r.desc}</div>
                </div>
                {Icon.chevron(18)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', left: 18, right: 18, bottom: 24, zIndex: 5 }}>
        <button className="btn btn-primary" style={{ width: '100%', height: 54 }}>
          응답완료 요청하기
        </button>
      </div>
    </Phone>
  );
}

function ScreenPrayerWrite({ variant = 'create' }) {
  if (variant === 'answer-request') {
    return (
      <Phone>
        <TopBar title="기도응답 완료 요청" />
        <div className="phone-body" style={{ padding: '4px 18px 112px' }}>
          <div className="card" style={{ padding: 15, marginBottom: 16 }}>
            <span className="badge badge-mute">원 기도제목</span>
            <div style={{ marginTop: 9, fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>공동체 적응 감사</div>
            <div className="t-sm" style={{ marginTop: 7, lineHeight: 1.5 }}>새로운 자리에서 선한 관계를 세우도록 함께 기도했던 제목입니다.</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div className="t-sm" style={{ marginBottom: 6, fontWeight: 700, color: 'var(--app-ink-soft)' }}>응답 내용</div>
              <textarea className="input" rows={7} placeholder="어떻게 응답되었는지 구체적으로 적어주세요" style={{ resize: 'none', fontFamily: 'inherit' }} />
            </div>
            <div style={{
              padding: 14,
              borderRadius: 'var(--app-r-m)',
              background: 'var(--app-primary-soft)',
              color: 'var(--app-primary-deep)',
              fontSize: 'calc(13px * var(--app-fs-scale))',
              lineHeight: 1.55,
            }}>
              요청은 즉시 반영되지 않고 관리자 검토 후 응답완료 상태로 변경됩니다.
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 18, right: 18, bottom: 24, zIndex: 5 }}>
          <button className="btn btn-primary" style={{ width: '100%', height: 54 }}>
            응답완료 요청하기
          </button>
        </div>
      </Phone>
    );
  }

  const categories = PRAYER_CATEGORIES;
  return (
    <Phone>
      <TopBar title="기도제목 등록" />
      <div className="phone-body" style={{ padding: '4px 18px 112px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 17 }}>
          <div>
            <div className="t-sm" style={{ marginBottom: 7, fontWeight: 700, color: 'var(--app-ink-soft)' }}>카테고리</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {categories.map((c, i) => (
                <div key={i} className={'chip' + (i === 1 ? ' on' : '')}>{c}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="t-sm" style={{ marginBottom: 6, fontWeight: 700, color: 'var(--app-ink-soft)' }}>제목</div>
            <input className="input" placeholder="기도제목을 한 줄로 적어주세요" />
          </div>
          <div>
            <div className="t-sm" style={{ marginBottom: 6, fontWeight: 700, color: 'var(--app-ink-soft)' }}>내용</div>
            <textarea className="input" rows={6} placeholder="기도가 필요한 상황을 나눠주세요" style={{ resize: 'none', fontFamily: 'inherit' }} />
          </div>

          <div className="card" style={{ padding: 15, display: 'flex', flexDirection: 'column', gap: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 'calc(14px * var(--app-fs-scale))' }}>긴급 기도제목</div>
                <div className="t-sm" style={{ marginTop: 3 }}>긴급은 카테고리가 아닌 별도 속성입니다</div>
              </div>
              <div style={{ width: 42, height: 24, borderRadius: 999, background: 'var(--app-primary)', position: 'relative', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: 2, right: 2, width: 20, height: 20, borderRadius: '50%', background: '#fff' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div className="t-xs" style={{ marginBottom: 5 }}>노출 시작</div>
                <input className="input" defaultValue="오늘 09:00" />
              </div>
              <div style={{ flex: 1 }}>
                <div className="t-xs" style={{ marginBottom: 5 }}>노출 종료</div>
                <input className="input" defaultValue="오늘 21:00" />
              </div>
            </div>
          </div>

          <div style={{
            padding: 14,
            borderRadius: 'var(--app-r-m)',
            background: 'var(--app-primary-soft)',
            color: 'var(--app-primary-deep)',
            fontSize: 'calc(13px * var(--app-fs-scale))',
            lineHeight: 1.55,
          }}>
            등록 후 접수 상태로 저장되며, 관리자 승인 전에는 공개되지 않습니다.
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 18, right: 18, bottom: 24, zIndex: 5 }}>
        <button className="btn btn-primary" style={{ width: '100%', height: 54 }}>
          기도제목 등록하기
        </button>
      </div>
    </Phone>
  );
}

Object.assign(window, {
  ScreenPrayerApply, ScreenPrayerApproval, ScreenPrayerMembers,
  ScreenPrayerModeration, ScreenPrayerTopicManage, ScreenPrayerUrgentManage, ScreenPrayerOfflineMatch,
  ScreenPrayerRequest, ScreenPrayerWrite,
});
