// 열린문 커넥트 — 중보기도 추가 화면 (FUNC-042, 046, 047, 051~055)

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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
          <div className="card" style={{ padding: 14, boxShadow: '0 1px 3px rgba(20,30,18,0.05)' }}>
            <div className="t-xs">대기</div>
            <div style={{ marginTop: 4, fontSize: 'calc(22px * var(--app-fs-scale))', fontWeight: 850 }}>1</div>
          </div>
          <div className="card" style={{ padding: 14, boxShadow: '0 1px 3px rgba(20,30,18,0.05)' }}>
            <div className="t-xs">오늘 처리</div>
            <div style={{ marginTop: 4, fontSize: 'calc(22px * var(--app-fs-scale))', fontWeight: 850 }}>2</div>
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
          <AdminPrayerMetric label="이번 주 완료" value="9/12" />
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
      <div className="phone-body" style={{ padding: '4px 18px 22px' }}>
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
            {['접수', '승인', '반려', '삭제'].map((s, i) => (
              <span key={s} className={'badge ' + (i === 0 ? 'badge-amber' : 'badge-mute')}>{s}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button className="btn btn-primary" style={{ flex: 1 }}>승인</button>
          <button className="btn btn-line" style={{ flex: 1 }}>반려</button>
          <button className="btn btn-line" style={{ width: 72, color: 'var(--app-danger)' }}>삭제</button>
        </div>
      </div>
    </Phone>
  );
}

function ScreenPrayerUrgentManage() {
  return (
    <Phone>
      <TopBar title="긴급 기도제목 관리" right={<div style={{ fontSize: 'calc(14px * var(--app-fs-scale))', color: 'var(--app-primary)', fontWeight: 800 }}>저장</div>} />
      <div className="phone-body" style={{ padding: '4px 18px 22px' }}>
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

Object.assign(window, {
  ScreenPrayerApply, ScreenPrayerApproval, ScreenPrayerMembers,
  ScreenPrayerModeration, ScreenPrayerUrgentManage, ScreenPrayerOfflineMatch,
  ScreenPrayerRequest, ScreenPrayerWrite,
});
