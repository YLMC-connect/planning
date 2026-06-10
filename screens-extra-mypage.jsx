// 열린문 커넥트 — 추가 화면 (마이페이지 하위)

// ─── 전체 활동 내역 (FUNC-034) ───
//   variants: posts | comments | groups | empty
function ScreenActivity({ variant = 'posts' }) {
  const isEmpty = variant === 'empty';
  const tabs = [
    { key: 'posts',    label: '나눔 게시글' },
    { key: 'comments', label: '댓글' },
    { key: 'groups',   label: '소모임' },
  ];
  const active = isEmpty ? 'posts' : variant;

  const posts = [
    { thumb: 0, title: '유아용 카시트 나눔해요', status: '나눔완료', statusTone: 'mute', date: '2026.05.12' },
    { thumb: 1, title: '타쇐 프라이팬 새것 같은 상태', status: '나눔중', statusTone: 'primary', date: '2026.05.08' },
    { thumb: 2, title: '어린이 동화책 30권 묶음', status: '예약완료', statusTone: 'amber', date: '2026.04.30' },
    { thumb: 3, title: '도자기 다세트 (몇 개 파손 있음)', status: '나눔완료', statusTone: 'mute', date: '2026.04.21' },
    { thumb: 4, title: '아이 가을 웃 (90사이즈 남아 있어요)', status: '나눔중', statusTone: 'primary', date: '2026.04.10' },
  ];
  const comments = [
    { content: '저희 목장 아이도 몇 달 전까지 이거 잘 썰어요! 공감이네요 ツ', src: '유아용 카시트 나눔해요', date: '오늘' },
    { content: '좋은 나눔 감사해요! 내일 아침 들르겠습니다', src: '도자기 다세트 (몇 개 파손 있음)', date: '어제' },
    { content: '앞으로도 잘 부탁드려요 ✍🏻', src: '토요 산악회 · 5/18 모임', date: '2일 전' },
    { content: '이 게시글 아주 유익했어요. 저도 같이 나눠볼게요', src: '의자 수리해 드립니다', date: '4일 전' },
    { content: '이번 주 수요일 일정 있으신가요?', src: '독서 나눔 · 5월 정기모임', date: '지난주' },
  ];
  const groups = [
    { name: '토요 산악회',       members: 18, joined: '2024.11.02', seed: 0 },
    { name: '독서 나눔',          members: 12, joined: '2025.02.18', seed: 1 },
    { name: '엄마들의 수다방',     members: 24, joined: '2025.06.07', seed: 3 },
    { name: '찬양 프도는 이와 함께', members: 9, joined: '2025.09.14', seed: 4 },
  ];

  return (
    <Phone>
      <TopBar title="활동 내역"/>
      <div className="phone-body" style={{ padding: 0 }}>
        <div style={{ padding: '4px 0 0' }}>
          <SegTabs items={tabs} active={active}/>
        </div>

        {isEmpty ? (
          <ActivityEmpty/>
        ) : active === 'posts' ? (
          <div style={{ padding: '12px 18px 16px', display: 'flex', flexDirection: 'column' }}>
            {posts.map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 0',
                borderBottom: i < posts.length - 1 ? '1px solid var(--app-line)' : 'none',
              }}>
                <Thumb size={56} seed={p.thumb}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 'calc(14px * var(--app-fs-scale))', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                    <span className={'badge badge-' + p.statusTone}>{p.status}</span>
                    <span className="t-xs">{p.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : active === 'comments' ? (
          <div style={{ padding: '12px 18px 16px', display: 'flex', flexDirection: 'column' }}>
            {comments.map((c, i) => (
              <div key={i} style={{
                padding: '14px 0',
                borderBottom: i < comments.length - 1 ? '1px solid var(--app-line)' : 'none',
              }}>
                <div style={{ fontSize: 'calc(14px * var(--app-fs-scale))', lineHeight: 1.5, color: 'var(--app-ink)' }}>{c.content}</div>
                <div style={{
                  marginTop: 8, padding: '8px 10px',
                  borderRadius: 'var(--app-r-s)',
                  background: 'var(--app-surface-2)',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <div style={{ color: 'var(--app-ink-hint)', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 3 L7 9 L4 9 L7 12 L6 17 L9 14 L12 17 L11 12 L14 9 L11 9 Z" transform="translate(2 0) scale(0.85)"/></svg>
                  </div>
                  <span style={{
                    flex: 1, fontSize: 'calc(12px * var(--app-fs-scale))',
                    color: 'var(--app-ink-soft)',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{c.src}</span>
                </div>
                <div className="t-xs" style={{ marginTop: 6 }}>{c.date}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '12px 18px 16px', display: 'flex', flexDirection: 'column' }}>
            {groups.map((g, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 0',
                borderBottom: i < groups.length - 1 ? '1px solid var(--app-line)' : 'none',
              }}>
                <Cover w={64} h={56} seed={g.seed}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 'calc(14.5px * var(--app-fs-scale))', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.name}</div>
                  <div className="t-sm" style={{ marginTop: 4, color: 'var(--app-ink-mute)' }}>멤버 {g.members}명 · {g.joined} 가입</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Phone>
  );
}

function ActivityEmpty() {
  return (
    <div style={{
      padding: '80px 32px 60px',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', textAlign: 'center',
    }}>
      <div style={{
        width: 84, height: 84, borderRadius: '50%',
        background: 'var(--app-surface-2)',
        display: 'grid', placeItems: 'center',
        marginBottom: 18, color: 'var(--app-ink-hint)',
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 7v5l3.5 2"/>
        </svg>
      </div>
      <div style={{ fontWeight: 700, fontSize: 'calc(15px * var(--app-fs-scale))', color: 'var(--app-ink-soft)' }}>
        활동 내역이 없습니다
      </div>
      <div className="t-sm" style={{ marginTop: 8, color: 'var(--app-ink-mute)', lineHeight: 1.55 }}>
        나눔 게시글, 댓글, 소모임 참여가<br/>
        이곳에 모여서 쉽게 살펴볼 수 있어요.
      </div>
    </div>
  );
}

function ScreenPrayerVolunteerHistory() {
  const current = {
    room: '월요일 오전 기도방',
    role: '중보기도요원',
    since: '2026.05.12',
    duration: '29일째 활동 중',
  };
  const histories = [
    { room: '화요일 오후 기도방', role: '중보기도요원', period: '2026.03.01 - 2026.05.31', reason: '월요일 오전 방으로 이동' },
    { room: '토요일 오전 기도방', role: '중보기도요원', period: '2025.11.10 - 2026.02.28', reason: '개인 일정으로 활동 종료' },
  ];

  const Metric = ({ label, value }) => (
    <div className="card" style={{ padding: 13, boxShadow: '0 1px 3px rgba(20,30,18,0.05)' }}>
      <div className="t-xs">{label}</div>
      <div style={{ marginTop: 4, fontWeight: 850, fontSize: 'calc(20px * var(--app-fs-scale))' }}>{value}</div>
    </div>
  );

  return (
    <Phone>
      <TopBar title="중보기도 활동 이력"/>
      <div className="phone-body" style={{ padding: '4px 18px 24px' }}>
        <div style={{
          padding: 14,
          borderRadius: 'var(--app-r-m)',
          background: 'var(--app-primary-soft)',
          color: 'var(--app-primary-deep)',
          fontSize: 'calc(13px * var(--app-fs-scale))',
          lineHeight: 1.55,
          marginBottom: 14,
        }}>
          내가 언제부터 어떤 기도방에서 중보기도요원으로 활동했는지 확인합니다.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <Metric label="현재 활동" value="1개"/>
          <Metric label="누적 기간" value="9개월"/>
          <Metric label="기도방" value="3곳"/>
        </div>

        <div className="card" style={{ marginTop: 14, padding: 16, boxShadow: '0 1px 3px rgba(20,30,18,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
            <div style={{ fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>현재 활동</div>
            <span className="badge badge-primary">참여중</span>
          </div>
          <div style={{ marginTop: 12, fontWeight: 850, fontSize: 'calc(18px * var(--app-fs-scale))' }}>{current.room}</div>
          <div className="t-sm" style={{ marginTop: 7 }}>{current.role} · {current.since}부터</div>
          <div className="t-xs" style={{ marginTop: 8 }}>{current.duration}</div>
        </div>

        <div style={{ marginTop: 22, marginBottom: 8, fontWeight: 850, fontSize: 'calc(16px * var(--app-fs-scale))' }}>지난 활동</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {histories.map((item, i) => (
            <div key={i} className="card" style={{ padding: 15, boxShadow: '0 1px 3px rgba(20,30,18,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>{item.room}</div>
                  <div className="t-sm" style={{ marginTop: 5 }}>{item.role}</div>
                </div>
                <span className="badge badge-mute">종료</span>
              </div>
              <div style={{
                marginTop: 12,
                paddingTop: 10,
                borderTop: '1px solid var(--app-line)',
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
              }}>
                <div className="t-sm">{item.period}</div>
                <div className="t-xs">{item.reason}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="t-sm" style={{ marginTop: 14, lineHeight: 1.5, color: 'var(--app-ink-mute)' }}>
          관리자 승인, 기도방 이동, 활동 종료 기록을 기준으로 표시됩니다.
        </div>
      </div>
    </Phone>
  );
}

// ─── 관심목록 (마이페이지 — 거래/소모임/기도방 통합) ───
function ScreenMyWishlist() {
  const tabs = [
    { key:'m', label:'중고·나눔' },
    { key:'g', label:'소모임' },
    { key:'p', label:'기도방' },
  ];
  const groups = [
    { name:'토요 산악회', cat:'운동/산악', members: 18, seed: 0 },
    { name:'독서 나눔', cat:'문화', members: 12, seed: 1 },
    { name:'엄마들의 수다방', cat:'육아', members: 24, seed: 3 },
  ];
  return (
    <Phone>
      <TopBar title="관심목록"/>
      <div className="phone-body">
        <div style={{ padding:'10px 0 14px' }}>
          <SegTabs items={tabs} active="g"/>
        </div>
        <div style={{ padding:'0 18px', display:'flex', flexDirection:'column', gap: 12 }}>
          {groups.map((g,i) => (
            <div key={i} className="card" style={{ padding: 12, display:'flex', gap: 12, alignItems:'center' }}>
              <Cover w={84} h={64} seed={g.seed}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize:'calc(15px * var(--app-fs-scale))' }}>{g.name}</div>
                <div className="t-sm" style={{ color:'var(--app-ink-mute)', marginTop: 4 }}>{g.cat} · 멤버 {g.members}명</div>
              </div>
              <div style={{ color:'var(--app-danger)' }}>{Icon.heartOn(20)}</div>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

// ─── 알림 설정 ───
function ScreenNotifSettings() {
  const Section2 = ({ title, items }) => (
    <Section title={title}>
      <div className="card" style={{ margin:'0 18px', padding:'4px 16px' }}>
        {items.map((it, i) => (
          <div key={i} style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'14px 0',
            borderBottom: i < items.length - 1 ? '1px solid var(--app-line)' : 'none',
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize:'calc(14.5px * var(--app-fs-scale))' }}>{it.title}</div>
              {it.desc && <div className="t-sm" style={{ color:'var(--app-ink-mute)', marginTop: 2 }}>{it.desc}</div>}
            </div>
            <div style={{
              width: 40, height: 24, borderRadius: 12,
              background: it.on ? 'var(--app-primary)' : 'var(--app-line-strong)',
              position:'relative', flexShrink: 0,
            }}>
              <div style={{
                position:'absolute', top: 2,
                left: it.on ? undefined : 2,
                right: it.on ? 2 : undefined,
                width: 20, height: 20, borderRadius:'50%', background:'#fff',
              }}/>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
  return (
    <Phone>
      <TopBar title="알림 설정"/>
      <div className="phone-body" style={{ padding: 0, paddingBottom: 28 }}>
        <Section2 title="전체" items={[
          { title:'알림 받기', desc:'모든 푸시 알림을 켜고 끕니다', on:true },
        ]}/>
        <Section2 title="중고·나눔" items={[
          { title:'새 댓글', on:true },
          { title:'관심 글의 상태 변경', on:true },
          { title:'거래 채팅', on:true },
        ]}/>
        <Section2 title="소모임" items={[
          { title:'공지사항', on:true },
          { title:'새 가입 신청 (리더)', on:true },
          { title:'정기 모임 리마인드', on:false },
        ]}/>
        <Section2 title="중보기도" items={[
          { title:'새 기도제목', on:true },
          { title:'기도 응원', on:true },
          { title:'기도 응답', on:true },
        ]}/>
        <Section2 title="삶공부" items={[
          { title:'수업 알림', on:true },
          { title:'과제 마감', on:false },
        ]}/>
      </div>
    </Phone>
  );
}

// ─── 고객센터 ───
function ScreenSupport() {
  const items = [
    { icon: Icon.book,   title:'자주 묻는 질문 (FAQ)', sub:'궁금한 점을 빠르게 해결' },
    { icon: Icon.chat,   title:'1:1 문의',           sub:'운영팀에 직접 문의하기' },
    { icon: Icon.bell,   title:'공지사항',           sub:'서비스 소식과 업데이트' },
    { icon: Icon.book,   title:'이용약관' },
    { icon: Icon.book,   title:'개인정보처리방침' },
  ];
  return (
    <Phone>
      <TopBar title="고객센터"/>
      <div className="phone-body">
        <div style={{
          margin:'8px 18px 18px', padding: 16,
          borderRadius:'var(--app-r-l)', background:'var(--app-primary-soft)',
        }}>
          <div style={{ fontSize:'calc(15px * var(--app-fs-scale))', fontWeight:700, color:'var(--app-primary-deep)' }}>안녕하세요 👋</div>
          <div style={{ marginTop: 6, fontSize:'calc(13px * var(--app-fs-scale))', color:'var(--app-primary-deep)', lineHeight: 1.55 }}>
            무엇을 도와드릴까요?<br/>운영시간 평일 10:00 - 18:00
          </div>
        </div>
        <div style={{ padding:'0 18px', display:'flex', flexDirection:'column' }}>
          {items.map((it, i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap: 14, padding:'16px 4px',
              borderBottom: i < items.length - 1 ? '1px solid var(--app-line)' : 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background:'rgba(143,168,130,0.16)', color:'var(--app-primary-deep)',
                display:'grid', placeItems:'center', flexShrink: 0,
              }}>{it.icon(18)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize:'calc(15px * var(--app-fs-scale))' }}>{it.title}</div>
                {it.sub && <div className="t-sm" style={{ color:'var(--app-ink-mute)', marginTop: 2 }}>{it.sub}</div>}
              </div>
              <div style={{ color:'var(--app-ink-hint)' }}>{Icon.chev(18)}</div>
            </div>
          ))}
        </div>
        <div style={{ padding:'24px 18px', textAlign:'center', color:'var(--app-ink-mute)', fontSize:'calc(11px * var(--app-fs-scale))' }}>
          앱 버전 1.0.0 · 빌드 2026.05
        </div>
      </div>
    </Phone>
  );
}

// ─── FAQ (FUNC-037) ───
//   variants: default | empty
function ScreenFAQ({ variant = 'default' }) {
  const isEmpty = variant === 'empty';
  const cats = ['전체','계정','중고·나눔','소모임','기도','삶공부'];
  const faqs = [
    { open:true, q:'회원가입은 어떻게 하나요?', a:'로그인 화면에서 회원가입을 선택한 뒤 약관 동의와 기본 정보를 입력하면 가입할 수 있습니다.' },
    { q:'비밀번호는 어디서 변경하나요?' },
    { q:'중고거래 시 가격은 어떻게 정하나요?' },
    { q:'소모임을 직접 만들고 싶어요' },
    { q:'기도방은 어떻게 신청하나요?' },
    { q:'수강 신청 후 취소하려면?' },
    { q:'알림이 너무 자주 와요' },
    { q:'탈퇴하면 데이터는 어떻게 되나요?' },
  ];
  return (
    <Phone>
      <TopBar title="자주 묻는 질문"/>
      <div className="phone-body" style={{ padding: 0 }}>
        {!isEmpty && (
          <div style={{ padding:'10px 0 6px' }}>
            <ChipRow items={cats.map((c,i) => ({ key:String(i), label:c }))} active="0"/>
          </div>
        )}
        {isEmpty ? (
          <div style={{
            padding: '80px 32px 60px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', textAlign: 'center',
          }}>
            <div style={{
              width: 84, height: 84, borderRadius: '50%',
              background: 'var(--app-surface-2)',
              display: 'grid', placeItems: 'center',
              marginBottom: 18, color: 'var(--app-ink-hint)',
            }}>
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"/>
                <path d="M9.4 9.5a2.6 2.6 0 015.1.5c0 1.6-2.5 2.2-2.5 4M12 17v.5"/>
              </svg>
            </div>
            <div style={{ fontWeight: 700, fontSize: 'calc(15px * var(--app-fs-scale))', color: 'var(--app-ink-soft)' }}>
              등록된 FAQ가 없습니다
            </div>
            <div className="t-sm" style={{ marginTop: 8, color: 'var(--app-ink-mute)', lineHeight: 1.55 }}>
              지금은 등록된 질문이 없어요.<br/>
              궁금한 건 1:1 문의로 연락주세요.
            </div>
          </div>
        ) : (
          <div style={{ padding:'0 0 20px' }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ padding:'16px 18px', borderBottom:'1px solid var(--app-line)' }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap: 10 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius:'50%',
                    background:'var(--app-primary)', color:'#fff',
                    display:'grid', placeItems:'center',
                    fontSize: 12, fontWeight: 800, flexShrink: 0,
                  }}>Q</div>
                  <div style={{ flex:1, fontWeight: 600, fontSize:'calc(14px * var(--app-fs-scale))', lineHeight:1.45 }}>{f.q}</div>
                  <div style={{ color:'var(--app-ink-mute)', transform: f.open ? 'rotate(90deg)' : 'none' }}>{Icon.chev(18)}</div>
                </div>
                {f.open && f.a && (
                  <div style={{
                    marginTop: 10, marginLeft: 32, padding: 12,
                    borderRadius:'var(--app-r-m)', background:'var(--app-surface)',
                    fontSize:'calc(13.5px * var(--app-fs-scale))', color:'var(--app-ink-soft)', lineHeight: 1.6,
                  }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Phone>
  );
}

// ─── 1:1 문의 ───
function ScreenInquiry() {
  return (
    <Phone>
      <TopBar title="1:1 문의" right={<div style={{ fontSize:'calc(14px * var(--app-fs-scale))', color:'var(--app-primary)', fontWeight:700 }}>전송</div>}/>
      <div className="phone-body" style={{ padding:'4px 18px 20px' }}>
        <div style={{ display:'flex', flexDirection:'column', gap: 18 }}>
          <div>
            <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600, color:'var(--app-ink-soft)' }}>문의 유형</div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {['서비스 이용','계정/로그인','거래/나눔','오류 신고','기타'].map((c,i) => (
                <div key={i} className={'chip' + (i===0 ? ' on' : '')}>{c}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600, color:'var(--app-ink-soft)' }}>제목</div>
            <input className="input" placeholder="제목을 입력하세요"/>
          </div>
          <div>
            <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600, color:'var(--app-ink-soft)' }}>내용</div>
            <textarea className="input" rows={8} placeholder="문의 내용을 자세히 적어주세요" style={{ resize:'none', fontFamily:'inherit' }}/>
          </div>
          <div>
            <div className="t-sm" style={{ marginBottom: 8, fontWeight: 600, color:'var(--app-ink-soft)' }}>첨부 파일</div>
            <div style={{ display:'flex', gap: 8 }}>
              <div style={{
                width: 64, height: 64, borderRadius:'var(--app-r-m)',
                border:'1.5px dashed var(--app-line-strong)',
                display:'grid', placeItems:'center', color:'var(--app-ink-mute)',
              }}>{Icon.plus(20)}</div>
            </div>
          </div>
          <div>
            <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600, color:'var(--app-ink-soft)' }}>답변 받을 이메일</div>
            <input className="input" defaultValue="grace.kim@example.com"/>
          </div>
        </div>
      </div>
    </Phone>
  );
}

// ─── 이용약관 / 개인정보처리방침 (긴 본문 화면 — 같은 컴포넌트로 처리) ───
function ScreenLegal({ title = '이용약관', primary = '제1조 (목적)' } = {}) {
  const sections = [
    { h: primary, p:'본 약관은 열린문커넥트(이하 "서비스")가 제공하는 모바일 애플리케이션 및 관련 제반 서비스의 이용과 관련하여 회사와 회원의 권리·의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.' },
    { h:'제2조 (정의)', p:'1. "회원"이란 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 자를 말합니다.\n2. "콘텐츠"란 회원이 서비스에 게시한 글, 사진, 댓글 등을 의미합니다.\n3. "교회 커뮤니티"란 동일 교회 소속 회원으로 구성된 폐쇄형 그룹을 말합니다.' },
    { h:'제3조 (약관의 효력 및 변경)', p:'본 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다. 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.' },
    { h:'제4조 (회원가입)', p:'회원이 되고자 하는 자는 회사가 정한 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.' },
    { h:'제5조 (서비스의 제공 및 변경)', p:'회사는 다음과 같은 서비스를 제공합니다.\n- 교회 내 중고거래 및 나눔 플랫폼\n- 소모임 개설 및 참여\n- 중보기도 모임\n- 삶공부 과정 안내 및 수강 신청' },
  ];
  return (
    <Phone>
      <TopBar title={title}/>
      <div className="phone-body">
        <div style={{ padding:'4px 18px 24px' }}>
          <div style={{ marginBottom: 18, color:'var(--app-ink-mute)', fontSize:'calc(12px * var(--app-fs-scale))' }}>
            시행일자: 2026년 1월 1일
          </div>
          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 22 }}>
              <div style={{
                fontWeight: 700, fontSize:'calc(15px * var(--app-fs-scale))',
                marginBottom: 8, color:'var(--app-ink)',
              }}>{s.h}</div>
              <div style={{
                fontSize:'calc(13.5px * var(--app-fs-scale))',
                color:'var(--app-ink-soft)', lineHeight: 1.75,
                whiteSpace:'pre-line',
              }}>{s.p}</div>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}
function ScreenTerms2() { return <ScreenLegal title="이용약관"/>; }
function ScreenPrivacy() { return <ScreenLegal title="개인정보처리방침" primary="제1조 (수집하는 개인정보 항목)"/>; }

// ─── 차단 사용자 관리 (FUNC-035, 036) ───
//   variants: default | confirm | toast | empty
function ScreenBlocked({ variant = 'default' }) {
  const isEmpty = variant === 'empty';
  const isConfirm = variant === 'confirm';
  const isToast = variant === 'toast';

  const list = isEmpty ? [] : [
    { name:'이모씨', av:1, when:'2025.11.20' },
    { name:'박모씨', av:3, when:'2025.09.04' },
    { name:'정모씨', av:5, when:'2025.06.15' },
  ];
  // After Toast: 1st user (이모씨) has been removed
  const visibleList = isToast ? list.slice(1) : list;

  return (
    <Phone>
      <TopBar title="차단 사용자"/>
      <div className="phone-body">
        {!isEmpty && (
          <div style={{
            margin:'8px 18px 14px', padding: 14,
            borderRadius:'var(--app-r-m)', background:'rgba(91,122,176,0.10)',
            color:'var(--app-primary-deep)', fontSize:'calc(13px * var(--app-fs-scale))', lineHeight: 1.55,
          }}>
            차단된 사용자의 게시글과 댓글은 보이지 않으며, 상대도 회원님의 활동을 볼 수 없습니다.
          </div>
        )}
        <div style={{ padding:'0 18px' }}>
          {visibleList.length === 0 ? (
            <div style={{
              padding: '80px 24px 60px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', textAlign: 'center',
            }}>
              <div style={{
                width: 84, height: 84, borderRadius: '50%',
                background: 'var(--app-surface-2)',
                display: 'grid', placeItems: 'center',
                marginBottom: 18, color: 'var(--app-ink-hint)',
              }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M5.6 5.6l12.8 12.8"/>
                </svg>
              </div>
              <div style={{ fontWeight: 700, fontSize: 'calc(15px * var(--app-fs-scale))', color: 'var(--app-ink-soft)' }}>
                차단한 사용자가 없습니다
              </div>
              <div className="t-sm" style={{ marginTop: 8, color: 'var(--app-ink-mute)', lineHeight: 1.55 }}>
                프로필 화면에서 언제든지<br/>
                상대를 차단할 수 있어요.
              </div>
            </div>
          ) : (
            visibleList.map((u, i) => (
              <div key={u.name} style={{
                display:'flex', alignItems:'center', gap: 12, padding:'14px 0',
                borderBottom: i < visibleList.length - 1 ? '1px solid var(--app-line)' : 'none',
              }}>
                <Avatar name={u.name} size={42} seed={u.av}/>
                <div style={{ flex:1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize:'calc(14.5px * var(--app-fs-scale))' }}>{u.name}</div>
                  <div className="t-sm" style={{ color:'var(--app-ink-mute)', marginTop: 2 }}>{u.when} 차단</div>
                </div>
                <button style={{
                  display:'inline-flex', alignItems:'center', gap: 6,
                  height: 34, padding:'0 14px',
                  borderRadius: 'var(--app-r-pill)',
                  background: 'var(--app-primary-soft)',
                  border: 0, color: 'var(--app-primary-deep)',
                  fontFamily: 'inherit', fontSize:'calc(12px * var(--app-fs-scale))',
                  fontWeight: 700, cursor: 'pointer',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7"/>
                  </svg>
                  차단 해제
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {isConfirm && (
        <AlertDialog
          title="이모씨님의 차단을 해제할까요?"
          message="해제 후에는 상대의 게시글과 댓글이 다시 보이며, 상대도 회원님의 활동을 볼 수 있게 됩니다."
          cancelText="취소"
          confirmText="차단 해제"
        />
      )}
      {isToast && <CheckToast>차단이 해제되었습니다</CheckToast>}
    </Phone>
  );
}

// ─── 탈퇴·계정 관리 ───
function ScreenAccount() {
  const Row = ({ title, sub, danger, arrow = true }) => (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'16px 18px', borderBottom:'1px solid var(--app-line)',
    }}>
      <div>
        <div style={{
          fontWeight: 600, fontSize:'calc(14.5px * var(--app-fs-scale))',
          color: danger ? 'var(--app-danger)' : 'var(--app-ink)',
        }}>{title}</div>
        {sub && <div className="t-sm" style={{ color:'var(--app-ink-mute)', marginTop: 4, lineHeight: 1.5 }}>{sub}</div>}
      </div>
      {arrow && <div style={{ color:'var(--app-ink-hint)' }}>{Icon.chev(18)}</div>}
    </div>
  );
  return (
    <Phone>
      <TopBar title="계정 관리"/>
      <div className="phone-body" style={{ padding: 0 }}>
        <div style={{
          padding:'20px 18px', display:'flex', alignItems:'center', gap: 14,
          borderBottom:'1px solid var(--app-line)',
        }}>
          <Avatar name="김은혜" size={56} seed="grace"/>
          <div>
            <div style={{ fontWeight: 700, fontSize:'calc(16px * var(--app-fs-scale))' }}>김은혜</div>
            <div className="t-sm" style={{ color:'var(--app-ink-mute)', marginTop: 4 }}>카카오 · grace.kim@example.com</div>
          </div>
        </div>

        <div style={{ padding:'14px 18px 8px', fontSize:'calc(12px * var(--app-fs-scale))', fontWeight: 700, color:'var(--app-ink-mute)' }}>계정</div>
        <Row title="이메일 변경" sub="grace.kim@example.com"/>
        <Row title="비밀번호 변경"/>
        <Row title="연결된 SNS" sub="카카오"/>

        <div style={{ padding:'14px 18px 8px', fontSize:'calc(12px * var(--app-fs-scale))', fontWeight: 700, color:'var(--app-ink-mute)' }}>데이터</div>
        <Row title="데이터 내보내기" sub="내 활동 기록을 파일로 받기"/>
        <Row title="캐시 삭제" sub="124 MB" arrow={false}/>

        <div style={{ padding:'14px 18px 8px', fontSize:'calc(12px * var(--app-fs-scale))', fontWeight: 700, color:'var(--app-ink-mute)' }}>위험</div>
        <Row title="로그아웃" danger/>
        <Row title="회원 탈퇴" danger sub="모든 활동 내역이 삭제되며 복구할 수 없습니다"/>

        <div style={{ padding:'24px 18px 28px', textAlign:'center' }}>
          <div className="t-sm" style={{ color:'var(--app-ink-mute)' }}>가입일 2025.03.12 · 31일째 활동 중</div>
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, {
  ScreenActivity, ScreenPrayerVolunteerHistory, ScreenMyWishlist, ScreenNotifSettings,
  ScreenSupport, ScreenFAQ, ScreenInquiry,
  ScreenTerms2, ScreenPrivacy, ScreenBlocked, ScreenAccount,
});
