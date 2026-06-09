// 열린문 커넥트 — 중보기도 (FUNC-040~045, 048)

const PRAYER_DAYS = ['월', '화', '수', '목', '금', '토'];
const PRAYER_DAY_NAMES = {
  월: '월요일',
  화: '화요일',
  수: '수요일',
  목: '목요일',
  금: '금요일',
  토: '토요일',
};
const PRAYER_ROOMS = PRAYER_DAYS.flatMap(day => ['오전', '오후'].map(time => ({
  day,
  time,
  name: `${PRAYER_DAY_NAMES[day]} ${time} 기도방`,
})));
const PRAYER_ROOM_COLORS = {
  월: ['#E0E9DE', '#607A57'],
  화: ['#F3E8D7', '#9A7A3D'],
  수: ['#DDE5CD', '#506B47'],
  목: ['#E7D2CB', '#883C2D'],
  금: ['#D8E5DD', '#3F6655'],
  토: ['#EAE0CB', '#7A5E2C'],
};

function PrayerDayBadge({ day, time, size = 48 }) {
  const [bg, fg] = PRAYER_ROOM_COLORS[day] || PRAYER_ROOM_COLORS.월;
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: 'var(--app-r-m)',
      background: bg,
      color: fg,
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0,
    }}>
      <div style={{ textAlign: 'center', lineHeight: 1.05 }}>
        <div style={{ fontWeight: 850, fontSize: `calc(${size * 0.34}px * var(--app-fs-scale))` }}>{day}</div>
        <div style={{ marginTop: 2, fontWeight: 800, fontSize: `calc(${size * 0.18}px * var(--app-fs-scale))` }}>{time}</div>
      </div>
    </div>
  );
}

function PrayerStat({ label, value, tone }) {
  return (
    <div style={{
      flex: 1,
      minWidth: 0,
      padding: '12px 10px',
      borderRadius: 'var(--app-r-m)',
      background: tone || 'var(--app-surface)',
      border: '1px solid var(--app-line)',
    }}>
      <div className="t-xs">{label}</div>
      <div style={{ marginTop: 4, fontSize: 'calc(17px * var(--app-fs-scale))', fontWeight: 850 }}>{value}</div>
    </div>
  );
}

function PrayerRequestSummaryCard({ item }) {
  return (
    <div className="card" style={{ padding: 14, boxShadow: '0 1px 3px rgba(20,30,18,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span className="badge badge-mute">{item.category}</span>
            <span className={`badge ${item.tone}`}>{item.status}</span>
          </div>
          <div style={{ marginTop: 8, fontWeight: 850, fontSize: 'calc(14px * var(--app-fs-scale))' }}>{item.title}</div>
          <div className="t-xs" style={{ marginTop: 4 }}>{item.desc}</div>
        </div>
        {Icon.chevron(18)}
      </div>
    </div>
  );
}

function AdminPrayerEntry({ title, desc, count }) {
  return (
    <div className="card" style={{
      padding: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      boxShadow: '0 1px 3px rgba(20,30,18,0.05)',
    }}>
      <div style={{
        width: 38,
        height: 38,
        borderRadius: 14,
        background: 'var(--app-primary-soft)',
        color: 'var(--app-primary-deep)',
        display: 'grid',
        placeItems: 'center',
        fontWeight: 900,
        flexShrink: 0,
      }}>{count}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 850, fontSize: 'calc(14px * var(--app-fs-scale))' }}>{title}</div>
        <div className="t-xs" style={{ marginTop: 3 }}>{desc}</div>
      </div>
      {Icon.chevron(18)}
    </div>
  );
}

function ScreenPrayerList({ variant = 'general' }) {
  const adminMode = variant === 'admin';
  const joined = [
    { day: '월', time: '오전', members: 45, done: '34명', rate: '75%', status: '참여중' },
    { day: '목', time: '오후', members: 10, done: '승인 대기', rate: '-', status: '승인 대기' },
  ];
  const myRequests = [
    { title: '어머니 수술 후 회복', category: '치유', status: '검토중', desc: '관리자 검토 후 공개됩니다', tone: 'badge-amber' },
    { title: '가족의 신앙 회복', category: '구원', status: '공개중', desc: '중보기도요원에게 공개 중입니다', tone: 'badge-primary' },
    { title: '새로운 자리에서의 평안', category: '일반', status: '반려', desc: '개인정보 표현 수정이 필요합니다', tone: 'badge-rose' },
    { title: '공동체 적응 감사', category: '일반', status: '응답완료 요청중', desc: '관리자 승인 대기 중입니다', tone: 'badge-mute' },
    { title: '자녀 학교 적응', category: '자녀', status: '응답완료', desc: '기도응답으로 보관되었습니다', tone: 'badge-primary' },
  ];
  const adminEntries = [
    { title: '참가 신청', desc: '새 중보기도요원 승인·거절', count: 3 },
    { title: '기도제목 통합관리', desc: '카테고리별 검토·응답완료 승인', count: 8 },
    { title: '기도방 멤버', desc: '방별 중보기도요원 관리', count: 12 },
    { title: '긴급 기도제목', desc: '긴급 노출 시간과 문구 관리', count: 2 },
    { title: '오프라인 요청 매칭', desc: '오프라인 요청자를 회원과 연결', count: 1 },
  ];

  return (
    <Phone>
      <div className="phone-topbar">
        <div style={{ flex: 1 }}>
          <div className="title">동행</div>
          <div className="t-sm" style={{ marginTop: 2 }}>함께 기도하고 말씀으로 자라가요</div>
        </div>
      </div>

      <div style={{ padding: '0 18px 12px' }}>
        <SegTabs items={[{ key: 'pray', label: '중보기도' }, { key: 'study', label: '삶공부' }]} active="pray" />
      </div>

      <div className="phone-body" style={{ paddingBottom: 168 }}>
        <Section title="내 기도방">
          <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {joined.map((room, i) => (
              <div key={i} className="card" style={{ padding: 15, display: 'flex', gap: 12, alignItems: 'center' }}>
                <PrayerDayBadge day={room.day} time={room.time} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, fontSize: 'calc(14px * var(--app-fs-scale))' }}>{PRAYER_DAY_NAMES[room.day]} {room.time}</span>
                    <span className={room.status === '참여중' ? 'badge badge-primary' : 'badge badge-amber'}>{room.status}</span>
                  </div>
                  <div className="t-xs" style={{ marginTop: 5 }}>
                    멤버 {room.members}명 · 오늘 완료 {room.done} · 참여율 {room.rate}
                  </div>
                </div>
                {Icon.chevron(18)}
              </div>
            ))}
          </div>
        </Section>

        <Section title="내 기도제목">
          <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 9 }}>
            {myRequests.slice(0, 3).map((item, i) => <PrayerRequestSummaryCard key={i} item={item} />)}
            <button className="btn" style={{
              width: '100%',
              height: 48,
              marginTop: 2,
              backgroundColor: '#fff',
              border: '1.5px solid var(--app-primary)',
              color: 'var(--app-primary-deep)',
            }}>
              내 기도제목 전체보기
            </button>
          </div>
        </Section>

        <Section title="중보기도 신청">
          <div style={{ padding: '0 18px' }}>
            <div className="card" style={{
              padding: 16,
              border: '1px solid rgba(91,122,176,0.22)',
              boxShadow: '0 1px 3px rgba(20,30,18,0.05)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  background: 'var(--app-primary-soft)',
                  color: 'var(--app-primary-deep)',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                }}>{Icon.hands(24)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>중보기도 신청</div>
                  <div className="t-sm" style={{ marginTop: 5, lineHeight: 1.45 }}>
                    월-토 오전/오후 기도방은 신청 화면에서 선택해요.
                  </div>
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', height: 46, marginTop: 14 }}>
                신청하기
              </button>
            </div>
          </div>
        </Section>

        {adminMode && (
          <Section title="중보기도 관리">
            <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 9 }}>
              {adminEntries.map((item, i) => <AdminPrayerEntry key={i} {...item} />)}
            </div>
          </Section>
        )}
      </div>

      <button className="fab" style={{
        width: 158,
        height: 56,
        right: 24,
        bottom: 92,
        borderRadius: 'var(--app-r-pill)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontSize: 'calc(15px * var(--app-fs-scale))',
        fontWeight: 850,
        whiteSpace: 'nowrap',
      }}>
        {Icon.plus(20)} 기도제목 등록
      </button>
      <TabBar active="faith" />
    </Phone>
  );
}

function PrayerLikeMark({ liked, canLike }) {
  const content = (
    <>
      {liked ? Icon.heartOn(15) : Icon.heart(15)}
      <span>좋아요</span>
    </>
  );
  const style = {
    width: 78,
    height: 34,
    borderRadius: 'var(--app-r-pill)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    border: liked ? '1px solid rgba(91,122,176,0.26)' : '1px solid var(--app-line)',
    background: liked ? 'var(--app-primary-soft)' : 'var(--app-surface)',
    color: liked ? 'var(--app-primary-deep)' : 'var(--app-ink-hint)',
    flexShrink: 0,
    fontSize: 'calc(12px * var(--app-fs-scale))',
    fontWeight: 850,
  };

  if (canLike) {
    return (
      <button className="btn" style={{ ...style, padding: 0 }} aria-label="관리자 좋아요">
        {content}
      </button>
    );
  }

  return <div style={style} aria-label="관리자 좋아요 상태">{content}</div>;
}

function PrayerCompletionRow({ person, canLike }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 0',
      borderTop: '1px solid var(--app-line)',
    }}>
      <Avatar name={person.name} seed={person.name} size={34} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 'calc(13px * var(--app-fs-scale))', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {person.name}
          </div>
          {person.me && <span className="badge badge-primary">나</span>}
        </div>
        <div className="t-xs" style={{ marginTop: 2 }}>{person.time} 완료</div>
      </div>
      <PrayerLikeMark liked={person.liked} canLike={canLike} />
    </div>
  );
}

function PrayerPendingRow({ person }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 0',
      borderTop: '1px solid var(--app-line)',
    }}>
      <Avatar name={person.name} seed={person.name} size={34} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 800, fontSize: 'calc(13px * var(--app-fs-scale))', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {person.name}
        </div>
      </div>
      <span className="badge badge-mute">미완료</span>
    </div>
  );
}

const PRAYER_COMPLETION_NAMES = [
  '김은혜', '이준호', '박민지', '한수연', '오지연', '최민수', '정하은', '강서준', '문하영', '배지성',
  '송유리', '윤다은', '임도윤', '장예린', '노시온', '백하준', '서민재', '유하늘', '조은별', '홍지우',
  '권도현', '남유진', '류서연', '신예준', '안다혜', '양지훈', '염하린', '오민성', '원가은', '이서준',
  '전하율', '차예찬', '하민아', '황준서',
];
const PRAYER_PENDING_NAMES = ['고지민', '구민서', '김도윤', '나은채', '도하윤', '마서진', '박시우', '변지안', '손예나', '윤서하', '주하람'];
const PRAYER_COMPLETIONS = PRAYER_COMPLETION_NAMES.map((name, i) => ({
  name,
  time: `오늘 ${String(7 + Math.floor(i / 6)).padStart(2, '0')}:${String(18 + (i * 7) % 42).padStart(2, '0')}`,
  liked: i % 3 === 0,
  me: name === '한수연',
}));
const PRAYER_PENDING_MEMBERS = PRAYER_PENDING_NAMES.map(name => ({ name }));

function PrayerItem({ item, answer }) {
  return (
    <div className="card" style={{
      padding: 15,
      boxShadow: '0 1px 3px rgba(20,30,18,0.05)',
      border: item.urgent ? '1px solid rgba(216,131,92,0.34)' : '1px solid var(--app-line)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {item.urgent && <span className="badge badge-amber">{Icon.flame(11)} 긴급</span>}
          <span className="badge badge-mute">{item.category}</span>
          {answer && <span className="badge badge-primary">응답완료</span>}
        </div>
        <div className="t-xs" style={{ whiteSpace: 'nowrap' }}>{item.when}</div>
      </div>
      <div style={{ marginTop: 10, fontWeight: 800, fontSize: 'calc(14px * var(--app-fs-scale))' }}>{item.title}</div>
      {item.author && (
        <div className="t-xs" style={{ marginTop: 5, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--app-ink-soft)' }}>
          {Icon.user(13)}
          <span>작성자 {item.author}</span>
        </div>
      )}
      <div className="t-sm" style={{ marginTop: 7, lineHeight: 1.55 }}>
        {item.text}
      </div>
      {answer && (
        <div style={{
          marginTop: 11,
          padding: '10px 12px',
          borderRadius: 'var(--app-r-s)',
          background: 'var(--app-primary-soft)',
          color: 'var(--app-primary-deep)',
          fontSize: 'calc(12px * var(--app-fs-scale))',
          lineHeight: 1.5,
        }}>
          {item.answer}
        </div>
      )}
    </div>
  );
}

function ScreenPrayerDetail({ variant = 'pray' }) {
  const answerMode = variant === 'answers';
  const statusMode = variant === 'status' || variant === 'admin';
  const adminMode = variant === 'admin';
  const activeTab = statusMode ? 'status' : answerMode ? 'answers' : 'pray';
  const urgent = [
    { category: '치유', title: '수술 후 회복을 위해', author: '박지훈', text: '어머니 수술 후 회복 과정이 안정되도록 함께 기도해주세요.', when: '오늘', urgent: true },
  ];
  const progress = [
    { category: '구원', title: '가족의 신앙 회복', author: '김은혜', text: '오랫동안 교회를 떠난 가족이 다시 예배 자리로 돌아오도록 기도합니다.', when: '어제' },
    { category: '자녀', title: '학교 적응과 관계', author: '한수연', text: '새 학기 친구 관계와 학업을 지혜롭게 감당하도록 기도해주세요.', when: '2일 전' },
  ];
  const answers = [
    { category: '일반', title: '새로운 자리 적응', author: '이준호', text: '새로운 자리에서 선한 관계를 세우도록 함께 기도했던 제목입니다.', answer: '첫 주를 잘 마쳤고 팀 안에서 좋은 도움을 받고 있습니다.', when: '오늘', answeredDaysAgo: 0 },
    { category: '일반', title: '가족 대화 회복', author: '정하은', text: '대화가 끊겼던 가족과의 회복을 위해 함께 기도했던 제목입니다.', answer: '서로 이야기를 시작했고 함께 예배드리기로 했습니다.', when: '3일 전', answeredDaysAgo: 3 },
    { category: '구원', title: '예배 자리 회복', author: '오지연', text: '예배의 기쁨을 다시 회복하기 위해 함께 기도했던 제목입니다.', answer: '주일 예배와 목장 모임에 다시 참여했습니다.', when: '9일 전', answeredDaysAgo: 9 },
  ];
  const recentAnswers = answers.filter(item => item.answeredDaysAgo <= 7);
  return (
    <Phone>
      <TopBar
        title="월요일 오전 기도방"
        right={<div style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', color: 'var(--app-ink-soft)' }}>{Icon.bell()}</div>}
      />

      <div style={{ padding: '0 18px 12px', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span className="badge badge-primary">참여중</span>
        <span className="badge badge-mute">멤버 45명</span>
        <span className="badge badge-amber">오늘 긴급 1건</span>
      </div>

      <UnderlineTabs
        items={[
          { key: 'pray', label: '기도' },
          { key: 'answers', label: '응답' },
          { key: 'status', label: '현황' },
        ]}
        active={activeTab}
      />

      <div className="phone-body" style={{ padding: activeTab === 'pray' ? '14px 18px 96px' : '14px 18px 22px', background: 'var(--app-bg)' }}>
        {statusMode ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="card" style={{ padding: 15 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <PrayerDayBadge day="월" time="오전" size={46} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ marginTop: 4, fontWeight: 850, fontSize: 'calc(17px * var(--app-fs-scale))' }}>
                    기도 현황
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <PrayerStat label="완료" value="34명" tone="var(--app-primary-soft)" />
                <PrayerStat label="미완료" value="11명" />
                <PrayerStat label="참여율" value="75%" />
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{
                  height: 8,
                  borderRadius: 'var(--app-r-pill)',
                  background: 'rgba(30,41,32,0.08)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: '75%',
                    height: '100%',
                    borderRadius: 'inherit',
                    background: 'var(--app-primary)',
                  }} />
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: 15 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <div style={{ fontWeight: 850, fontSize: 'calc(14px * var(--app-fs-scale))' }}>기도 완료한 사람</div>
                <div className="t-xs">34명</div>
              </div>
              {PRAYER_COMPLETIONS.map((person, i) => <PrayerCompletionRow key={i} person={person} canLike={adminMode} />)}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginTop: 14, marginBottom: 2 }}>
                <div style={{ fontWeight: 850, fontSize: 'calc(14px * var(--app-fs-scale))' }}>아직 완료 전</div>
                <div className="t-xs">11명</div>
              </div>
              {PRAYER_PENDING_MEMBERS.map((person, i) => <PrayerPendingRow key={i} person={person} />)}
            </div>
          </div>
        ) : !answerMode ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Section title="긴급 기도제목">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {urgent.map((item, i) => <PrayerItem key={i} item={item} />)}
              </div>
            </Section>

            <Section title="진행 중 기도제목">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {progress.map((item, i) => <PrayerItem key={i} item={item} />)}
              </div>
            </Section>

            <Section title="최근 기도응답">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {recentAnswers.map((item, i) => <PrayerItem key={i} item={item} answer />)}
              </div>
            </Section>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {answers.map((item, i) => <PrayerItem key={i} item={item} answer />)}
          </div>
        )}
      </div>

      {activeTab === 'pray' && (
        <div style={{
          position: 'absolute',
          left: 18,
          right: 18,
          bottom: 24,
          zIndex: 5,
        }}>
          <button className="btn btn-primary" style={{ width: '100%', height: 52 }}>
            {Icon.check(18)} 오늘 기도 완료
          </button>
        </div>
      )}
    </Phone>
  );
}

Object.assign(window, { ScreenPrayerList, ScreenPrayerDetail });
