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

function ScreenPrayerList() {
  const joined = [
    { day: '월', time: '오전', members: 12, done: '9/12', rate: '75%', status: '참여중' },
    { day: '목', time: '오후', members: 10, done: '승인 대기', rate: '-', status: '승인 대기' },
  ];

  return (
    <Phone>
      <div className="phone-topbar">
        <div style={{ flex: 1 }}>
          <div className="title">동행</div>
          <div className="t-sm" style={{ marginTop: 2 }}>함께 기도하고 말씀으로 자라가요</div>
        </div>
        <div className="actions">
          <div style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', color: 'var(--app-ink-soft)' }}>{Icon.search()}</div>
        </div>
      </div>

      <div style={{ padding: '0 18px 12px' }}>
        <SegTabs items={[{ key: 'pray', label: '중보기도' }, { key: 'study', label: '삶공부' }]} active="pray" />
      </div>

      <div className="phone-body" style={{ paddingBottom: 96 }}>
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
                    멤버 {room.members}명 · 이번 주 완료 {room.done} · 참여율 {room.rate}
                  </div>
                </div>
                {Icon.chevron(18)}
              </div>
            ))}
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
                {Icon.chevron(18)}
              </div>
              <button className="btn btn-primary" style={{ width: '100%', height: 46, marginTop: 14 }}>
                신청하기
              </button>
            </div>
          </div>
        </Section>
      </div>

      <TabBar active="faith" />
    </Phone>
  );
}

function CompletionTable() {
  const week = [
    { day: '월', done: 9, total: 12, me: true },
    { day: '화', done: 8, total: 12, me: true },
    { day: '수', done: 0, total: 12, me: false },
    { day: '목', done: 7, total: 12, me: false },
    { day: '금', done: 10, total: 12, me: true },
    { day: '토', done: 0, total: 0, me: false },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
      {week.map((w, i) => {
        const rate = w.total ? Math.round((w.done / w.total) * 100) : null;
        return (
          <div key={i} style={{
            minHeight: 64,
            borderRadius: 'var(--app-r-s)',
            background: w.me ? 'var(--app-primary-soft)' : 'var(--app-surface)',
            border: '1px solid var(--app-line)',
            padding: '8px 4px',
            textAlign: 'center',
          }}>
            <div style={{ fontWeight: 800, fontSize: 'calc(12px * var(--app-fs-scale))' }}>{w.day}</div>
            <div style={{ marginTop: 5, fontWeight: 850, color: rate == null ? 'var(--app-ink-mute)' : 'var(--app-primary-deep)', fontSize: 'calc(13px * var(--app-fs-scale))' }}>
              {rate == null ? '-' : `${rate}%`}
            </div>
            <div className="t-xs" style={{ marginTop: 3 }}>{w.total ? `${w.done}/${w.total}` : '-'}</div>
          </div>
        );
      })}
    </div>
  );
}

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
  const urgent = [
    { category: '치유', title: '수술 후 회복을 위해', text: '어머니 수술 후 회복 과정이 안정되도록 함께 기도해주세요.', when: '오늘', urgent: true },
  ];
  const progress = [
    { category: '구원', title: '가족의 신앙 회복', text: '오랫동안 교회를 떠난 가족이 다시 예배 자리로 돌아오도록 기도합니다.', when: '어제' },
    { category: '자녀', title: '학교 적응과 관계', text: '새 학기 친구 관계와 학업을 지혜롭게 감당하도록 기도해주세요.', when: '2일 전' },
  ];
  const answers = [
    { category: '직장·사업', title: '새 직장 적응', text: '새로운 자리에서 선한 관계를 세우도록 기도했던 제목입니다.', answer: '첫 주를 잘 마쳤고 팀 안에서 좋은 도움을 받고 있습니다.', when: '오늘' },
    { category: '가정', title: '가정 회복', text: '대화가 끊겼던 가족과의 회복을 위해 기도했던 제목입니다.', answer: '서로 이야기를 시작했고 함께 예배드리기로 했습니다.', when: '3일 전' },
    { category: '신앙', title: '예배 회복', text: '예배의 기쁨을 다시 회복하기 위해 함께 기도했던 제목입니다.', answer: '주일 예배와 목장 모임에 다시 참여했습니다.', when: '9일 전' },
  ];
  const answerMode = variant === 'answers';

  return (
    <Phone>
      <TopBar
        title="월요일 오전 기도방"
        right={<div style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', color: 'var(--app-ink-soft)' }}>{Icon.bell()}</div>}
      />

      <div style={{ padding: '0 18px 12px', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span className="badge badge-primary">참여중</span>
        <span className="badge badge-mute">멤버 12명</span>
        <span className="badge badge-amber">오늘 긴급 1건</span>
      </div>

      <UnderlineTabs
        items={[{ key: 'pray', label: '기도' }, { key: 'answers', label: `응답 ${answers.length}` }]}
        active={answerMode ? 'answers' : 'pray'}
      />

      <div className="phone-body" style={{ padding: '14px 18px 96px', background: 'var(--app-bg)' }}>
        <div className="card" style={{ padding: 15, marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <PrayerStat label="이번 주 완료" value="34회" tone="var(--app-primary-soft)" />
            <PrayerStat label="오늘 참여율" value="75%" />
          </div>
          <CompletionTable />
          <div className="t-xs" style={{ marginTop: 9 }}>같은 기도방 참여자와 관리자만 주간 완료 현황을 볼 수 있어요.</div>
        </div>

        {!answerMode ? (
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
                {answers.slice(0, 2).map((item, i) => <PrayerItem key={i} item={item} answer />)}
              </div>
            </Section>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {answers.map((item, i) => <PrayerItem key={i} item={item} answer />)}
          </div>
        )}
      </div>

      {!answerMode && (
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
