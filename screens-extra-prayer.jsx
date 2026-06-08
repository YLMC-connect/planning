// 열린문 커넥트 — 중보기도 추가 화면 (FUNC-042, 046, 047)

function FixedPrayerRoomGrid({ selected = '화-오후' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
      {PRAYER_ROOMS.map((room, i) => {
        const key = `${room.day}-${room.time}`;
        const on = key === selected;
        return (
          <div key={i} style={{
            padding: 11,
            borderRadius: 'var(--app-r-m)',
            border: on ? '1.5px solid var(--app-primary)' : '1px solid var(--app-line)',
            background: on ? 'var(--app-primary-soft)' : 'var(--app-surface)',
            display: 'flex',
            alignItems: 'center',
            gap: 9,
          }}>
            <PrayerDayBadge day={room.day} time={room.time} size={36} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 'calc(13px * var(--app-fs-scale))' }}>{room.day}요일 {room.time}</div>
              <div className="t-xs" style={{ marginTop: 2 }}>{on ? '선택됨' : '신청 가능'}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ScreenPrayerApply() {
  return (
    <Phone>
      <TopBar title="기도방 참여 신청" right={<div style={{ fontSize: 'calc(14px * var(--app-fs-scale))', color: 'var(--app-primary)', fontWeight: 800 }}>신청</div>} />
      <div className="phone-body" style={{ padding: '4px 18px 22px' }}>
        <div style={{
          padding: '14px 16px',
          borderRadius: 'var(--app-r-m)',
          background: 'var(--app-primary-soft)',
          color: 'var(--app-primary-deep)',
          fontSize: 'calc(13px * var(--app-fs-scale))',
          lineHeight: 1.55,
          marginBottom: 18,
        }}>
          월-토 오전/오후 12개 고정 기도방 중 하나를 신청합니다. 승인 전에는 기도제목을 볼 수 없습니다.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <div className="t-sm" style={{ marginBottom: 8, fontWeight: 700, color: 'var(--app-ink-soft)' }}>신청할 기도방</div>
            <FixedPrayerRoomGrid />
          </div>

          <div className="card" style={{ padding: 15, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>신청자 정보</div>
            <div>
              <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600 }}>이름</div>
              <input className="input" defaultValue="김은혜" />
            </div>
            <div>
              <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600 }}>연락처</div>
              <input className="input" defaultValue="010-1234-5678" />
            </div>
            <div>
              <div className="t-sm" style={{ marginBottom: 6, fontWeight: 600 }}>신청 메모</div>
              <textarea className="input" rows={3} placeholder="기도방 참여를 희망하는 이유를 적어주세요" style={{ resize: 'none', fontFamily: 'inherit' }} />
            </div>
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
            <div className="t-sm" style={{ marginTop: 8, lineHeight: 1.5 }}>팀장 또는 관리자가 승인하면 내 기도방에 표시됩니다.</div>
          </div>
        </div>
      </div>
    </Phone>
  );
}

function ScreenPrayerRequest() {
  const requests = [
    { title: '어머니 수술 후 회복', category: '치유', status: '검토중', desc: '개인정보 표현 검토 후 공개 예정', tone: 'badge-amber' },
    { title: '가족의 신앙 회복', category: '구원', status: '승인됨', desc: '중보기도요원에게 공개 중', tone: 'badge-primary' },
    { title: '새 직장 적응 감사', category: '직장·사업', status: '응답완료요청', desc: '관리자 승인 대기', tone: 'badge-mute' },
  ];
  return (
    <Phone>
      <TopBar title="내 기도제목" right={<div style={{ fontSize: 'calc(14px * var(--app-fs-scale))', color: 'var(--app-primary)', fontWeight: 800 }}>작성</div>} />
      <div className="phone-body" style={{ padding: '4px 18px 22px' }}>
        <div className="card" style={{ padding: 15, marginBottom: 14, background: 'var(--app-primary-soft)', boxShadow: 'none' }}>
          <div style={{ fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>기도제목은 승인 후 공개됩니다</div>
          <div className="t-sm" style={{ marginTop: 7, color: 'var(--app-primary-deep)', lineHeight: 1.5 }}>
            이름, 개인정보, 민감 표현을 관리자가 검토한 뒤 중보기도요원에게 보여집니다.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {requests.map((r, i) => (
            <div key={i} className="card" style={{ padding: 15, boxShadow: '0 1px 3px rgba(20,30,18,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span className="badge badge-mute">{r.category}</span>
                    <span className={`badge ${r.tone}`}>{r.status}</span>
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
    </Phone>
  );
}

function ScreenPrayerWrite({ variant = 'create' }) {
  if (variant === 'answer-request') {
    return (
      <Phone>
        <TopBar title="기도응답 완료 요청" right={<div style={{ fontSize: 'calc(14px * var(--app-fs-scale))', color: 'var(--app-primary)', fontWeight: 800 }}>요청</div>} />
        <div className="phone-body" style={{ padding: '4px 18px 22px' }}>
          <div className="card" style={{ padding: 15, marginBottom: 16 }}>
            <span className="badge badge-mute">원 기도제목</span>
            <div style={{ marginTop: 9, fontWeight: 850, fontSize: 'calc(15px * var(--app-fs-scale))' }}>새 직장 적응과 관계</div>
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
      </Phone>
    );
  }

  const categories = ['구원', '치유', '자녀', '가정', '신앙', '직장·사업', '관계', '진로·학업', '위로·장례', '기타'];
  return (
    <Phone>
      <TopBar title="기도제목 등록" right={<div style={{ fontSize: 'calc(14px * var(--app-fs-scale))', color: 'var(--app-primary)', fontWeight: 800 }}>등록</div>} />
      <div className="phone-body" style={{ padding: '4px 18px 22px' }}>
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
    </Phone>
  );
}

Object.assign(window, { ScreenPrayerApply, ScreenPrayerRequest, ScreenPrayerWrite });
